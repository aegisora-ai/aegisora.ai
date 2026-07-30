import { NextResponse } from "next/server";
import Stripe from "stripe";

// Hata mesajında bizden istenen en güncel API versiyonunu tanımlıyoruz.
// TypeScript'in bu yeni versiyon ismine kızmaması için "as any" ile tip korumasını aşıyoruz.
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-03-31.basil" as any,
});

export async function POST(req: Request) {
  try {
    const { planName } = await req.json();

    let unitAmount = 4900;
    if (planName.includes("Pro")) unitAmount = 19900;
    if (planName.includes("Global")) unitAmount = 49900;

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: planName,
              description: "Aegisora Enterprise Zero-Trust Infrastructure",
              tax_code: "txcd_10103000",
            },
            unit_amount: unitAmount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/dashboard/billing?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/dashboard/billing?canceled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
