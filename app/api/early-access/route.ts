import { NextResponse } from "next/server";

interface EarlyAccessRequest {
  email: string;
  status: "pending" | "approved";
  date: string;
}

declare global {
  var _earlyAccessRequests: EarlyAccessRequest[] | undefined;
}

if (!global._earlyAccessRequests) {
  global._earlyAccessRequests = [];
}

const requests = global._earlyAccessRequests;

export async function GET(request: Request) {
  try {
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
  } catch (error: any) {
    console.error("Early Access GET Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, action, adminSecret } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 },
      );
    }

    // Admin Onay İşlemi
    if (action === "approve") {
      if (adminSecret !== "Mdse.1234") {
        return NextResponse.json(
          { error: "Unauthorized access credentials" },
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
      return NextResponse.json({ success: true, requests });
    }

    // Normal Kullanıcı Erken Erişim Talebi
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
  } catch (error: any) {
    console.error("Early Access POST Error:", error);
    return NextResponse.json(
      { error: "Server error processing request" },
      { status: 500 },
    );
  }
}
