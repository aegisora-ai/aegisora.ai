```typescript
import { NextResponse } from "next/server";
import {
  createHmac,
  timingSafeEqual,
} from "node:crypto";

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
  // Temporary in-memory storage.
  // This should eventually be replaced with persistent storage.
  // See the migration note at the bottom of this file.
  var _earlyAccessRequests: EarlyAccessRequest[] | undefined;
}

if (!global._earlyAccessRequests) {
  global._earlyAccessRequests = [];
}

const requests = global._earlyAccessRequests;

const ADMIN_SECRET = process.env.AEGISORA_ADMIN_SECRET;

const ADMIN_COOKIE_NAME = "aegisora_admin";
const SESSION_TTL_SECONDS = 60 * 60 * 8;

const SESSION_CONTEXT = "aegisora-admin-session";

function getRequiredAdminSecret(): string {
  if (!ADMIN_SECRET) {
    throw new Error(
      "AEGISORA_ADMIN_SECRET is not configured",
    );
  }

  return ADMIN_SECRET;
}

function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

function isValidEmail(email: string): boolean {
  if (email.length < 3 || email.length > 320) {
    return false;
  }

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function createSessionToken(): string {
  const secret = getRequiredAdminSecret();

  const expiresAt =
    Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;

  const payload = `${expiresAt}:${SESSION_CONTEXT}`;

  const signature = createHmac("sha256", secret)
    .update(payload)
    .digest("hex");

  return `${expiresAt}.${signature}`;
}

function isAdminAuthenticated(request: Request): boolean {
  try {
    const secret = getRequiredAdminSecret();

    const cookieHeader = request.headers.get("cookie");

    if (!cookieHeader) {
      return false;
    }

    const match = cookieHeader.match(
      new RegExp(
        `(?:^|;\\s*)${ADMIN_COOKIE_NAME}=([^;]+)`,
      ),
    );

    const token = match?.[1];

    if (!token) {
      return false;
    }

    const [expiresAtRaw, providedSignature] =
      token.split(".");

    const expiresAt = Number(expiresAtRaw);

    if (
      !Number.isSafeInteger(expiresAt) ||
      expiresAt <= Math.floor(Date.now() / 1000)
    ) {
      return false;
    }

    if (!providedSignature) {
      return false;
    }

    const payload = `${expiresAt}:${SESSION_CONTEXT}`;

    const expectedSignature = createHmac(
      "sha256",
      secret,
    )
      .update(payload)
      .digest("hex");

    const providedBuffer = Buffer.from(
      providedSignature,
      "utf8",
    );

    const expectedBuffer = Buffer.from(
      expectedSignature,
      "utf8",
    );

    if (
      providedBuffer.length !== expectedBuffer.length
    ) {
      return false;
    }

    return timingSafeEqual(
      providedBuffer,
      expectedBuffer,
    );
  } catch (error) {
    console.error(
      "[Aegisora Admin] Session validation failed:",
      error,
    );

    return false;
  }
}

function unauthorizedResponse() {
  return NextResponse.json(
    { error: "Unauthorized" },
    { status: 401 },
  );
}

function badRequestResponse(message: string) {
  return NextResponse.json(
    { error: message },
    { status: 400 },
  );
}

function applyNoStore(
  response: NextResponse,
): NextResponse {
  response.headers.set("Cache-Control", "no-store");
  return response;
}

export async function GET(request: Request) {
  try {
    if (!isAdminAuthenticated(request)) {
      return unauthorizedResponse();
    }

    const url = new URL(request.url);
    const emailParam = url.searchParams.get("email");

    if (emailParam) {
      const email = normalizeEmail(emailParam);

      if (!isValidEmail(email)) {
        return badRequestResponse(
          "Invalid email address",
        );
      }

      const found = requests.find(
        (entry) => entry.email === email,
      );

      return applyNoStore(
        NextResponse.json({
          exists: Boolean(found),
          status: found?.status ?? "none",
        }),
      );
    }

    return applyNoStore(
      NextResponse.json({
        requests,
        count: requests.length,
      }),
    );
  } catch (error: unknown) {
    console.error(
      "[Aegisora Admin] GET error:",
      error,
    );

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RequestBody;

    const action =
      typeof body.action === "string"
        ? body.action.trim()
        : "";

    const email =
      typeof body.email === "string"
        ? normalizeEmail(body.email)
        : null;

    /*
     * Admin login
     */
    if (action === "login") {
      const providedSecret =
        typeof body.adminSecret === "string"
          ? body.adminSecret
          : null;

      const expectedSecret = getRequiredAdminSecret();

      if (!providedSecret) {
        return unauthorizedResponse();
      }

      const providedBuffer = Buffer.from(
        providedSecret,
        "utf8",
      );

      const expectedBuffer = Buffer.from(
        expectedSecret,
        "utf8",
      );

      const isValid =
        providedBuffer.length === expectedBuffer.length &&
        timingSafeEqual(
          providedBuffer,
          expectedBuffer,
        );

      if (!isValid) {
        return unauthorizedResponse();
      }

      const response = NextResponse.json({
        success: true,
        expires_in: SESSION_TTL_SECONDS,
      });

      response.cookies.set(
        ADMIN_COOKIE_NAME,
        createSessionToken(),
        {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          path: "/",
          maxAge: SESSION_TTL_SECONDS,
        },
      );

      return applyNoStore(response);
    }

    /*
     * Admin logout
     */
    if (action === "logout") {
      const response = NextResponse.json({
        success: true,
      });

      response.cookies.set(
        ADMIN_COOKIE_NAME,
        "",
        {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          path: "/",
          maxAge: 0,
        },
      );

      return applyNoStore(response);
    }

    /*
     * Everything below this point requires admin auth.
     */
    if (!isAdminAuthenticated(request)) {
      return unauthorizedResponse();
    }

    if (!email) {
      return badRequestResponse(
        "Valid email is required",
      );
    }

    if (!isValidEmail(email)) {
      return badRequestResponse(
        "Invalid email address",
      );
    }

    /*
     * Admin approval
     */
    if (action === "approve") {
      const existing = requests.find(
        (entry) => entry.email === email,
      );

      if (existing) {
        existing.status = "approved";
      } else {
        requests.push({
          email,
          status: "approved",
          date: new Date().toISOString(),
        });
      }

      return applyNoStore(
        NextResponse.json({
          success: true,
          status: "approved",
          requests,
        }),
      );
    }

    /*
     * Normal early-access request
     */
    if (action === "" || action === "request") {
      const existing = requests.find(
        (entry) => entry.email === email,
      );

      if (!existing) {
        requests.push({
          email,
          status: "pending",
          date: new Date().toISOString(),
        });
      }

      return applyNoStore(
        NextResponse.json({
          success: true,
          status:
            existing?.status ?? "pending",
        }),
      );
    }

    return badRequestResponse(
      "Unsupported action",
    );
  } catch (error: unknown) {
    console.error(
      "[Aegisora Admin] POST error:",
      error,
    );

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
```
