import { NextResponse } from "next/server";

declare global {
  var _earlyAccessRequests: {
    email: string;
    status: "pending" | "approved";
    date: string;
  }[];
}

if (!global._earlyAccessRequests) {
  global._earlyAccessRequests = [];
}

const requests = global._earlyAccessRequests;

export async function GET(request: Request) {
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
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, action, adminSecret } = body;

    // Admin Onay İşlemi
    if (action === "approve") {
      // Şifre güncellendi: Mdse.1234
      if (adminSecret !== "Mdse.1234") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

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
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
