import { NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "node:crypto";

interface EarlyAccessRequest {
  email: string;
  status: "pending" | "approved";
  date: string;
}

interface RequestBody {
  email?: unknown;
  action?: unknown;
  adminSecret?: unknown;
}

declare global {
  var _earlyAccessRequests: EarlyAccessRequest[] | undefined;
}

if (!global._earlyAccessRequests) {
  global._earlyAccessRequests = [];
}

const requests = global._earlyAccessRequests;

const ADMIN_SECRET = process.env.AEGISORA_ADMIN_SECRET;

function createAdminSession(): string {
  if (!ADMIN_SECRET) {
    throw new Error("AEGISORA_ADMIN_SECRET is not configured");
  }

  return createHmac("sha256", ADMIN_SECRET)
    .update("aegisora-admin-session")
    .digest("hex");
}

function isAdminAuthenticated(request: Request): boolean {
  const expected = createAdminSession();
  const provided = request.headers
    .get("cookie")
    ?.match(/aegisora_admin=([^;]+)/)?.[1];

  if (!provided) return false;

  const a = Buffer.from(provided);
  const b = Buffer.from(expected);

  return a.length === b.length && timingSafeEqual(a, b);
}

export async function GET(request: Request) {
  try {
    if (!isAdminAuthenticated(request)) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 },
      );
    }

    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (email) {
      const found = requests.find((r) => r.email === email);

      return NextResponse.json({
        exists: !!found,
        status: found ? found.status : "none",
      });
    }

    return NextResponse.json(requests);
  } catch (error: unknown) {
    console.error("Early Access GET Error:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RequestBody;
    const { email, action, adminSecret } = body;

    // Admin login
    if (action === "login") {
      if (
        typeof adminSecret !== "string" ||
        !ADMIN_SECRET ||
        adminSecret !== ADMIN_SECRET
      ) {
        return NextResponse.json(
          { error: "Unauthorized access credentials" },
          { status: 401 },
        );
      }

      const response = NextResponse.json({ success: true });

      response.cookies.set("aegisora_admin", createAdminSession(), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 8,
      });

      return response;
    }

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 },
      );
    }

    // Admin approval
    if (action === "approve") {
      if (!isAdminAuthenticated(request)) {
        return NextResponse.json(
          { error: "Unauthorized" },
          { status: 401 },
        );
      }

      const target = requests.find((r) => r.email === email);

      if (target) {
        target.status = "approved";
      } else {
        requests.push({
          email,
          status: "approved",
          date: new Date().toISOString(),
        });
      }

      return NextResponse.json({
        success: true,
        requests,
      });
    }

    // Normal early-access request
    const existing = requests.find((r) => r.email === email);

    if (!existing) {
      requests.push({
        email,
        status: "pending",
        date: new Date().toISOString(),
      });
    }

    return NextResponse.json({
      success: true,
      status: existing ? existing.status : "pending",
    });
  } catch (error: unknown) {
    console.error("Early Access POST Error:", error);

    return NextResponse.json(
      { error: "Server error processing request" },
      { status: 500 },
    );
  }
}