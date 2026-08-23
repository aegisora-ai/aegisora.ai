import { NextResponse } from "next/server";
import Stripe from "stripe";
import { requireUser } from "@/utils/supabase/auth-guard";

// Stripe istemcisi, en güncel API sürümü ve tip zorlamasıyla başlatıldı
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2026-07-29.dahlia",
});

export async function POST(req: Request) {
  try {

    const user = await requireUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status:401 }
      );
    }
    const body = await req.json();
    const { planName } = body;

    if (!planName) {
      return NextResponse.json(
        { error: "Plan name is required for checkout session creation." },
        { status: 400 },
      );
    }

    // Enterprise SaaS Standartı: Aylık birim fiyatlar (Cents cinsinden)
    let unitAmount = 4900; // Starter: $49/mo
    if (planName.includes("Pro") || planName.includes("Business"))
      unitAmount = 19900; // Business: $199/mo
    if (planName.includes("Global") || planName.includes("Enterprise"))
      unitAmount = 49900; // Enterprise: $499/mo

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    // B2B SaaS için 'mode: subscription' olarak güncellendi (Tek seferlik payment yerine)
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Aegisora - ${planName}`,
              description:
                "Enterprise Zero-Trust AI Governance & Runtime Protection",
              tax_code: "txcd_10103000",
            },
            unit_amount: unitAmount,
            recurring: {
              interval: "month", // Aylık abonelik modeli
            },
          },
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${baseUrl}/dashboard/billing?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/dashboard/billing?canceled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    console.error("Stripe Checkout Error:", error);
    return NextResponse.json(
      { error: (error instanceof Error ? error.message : "Internal Server Error during checkout.") },
      { status: 500 },
    );
  }
}
