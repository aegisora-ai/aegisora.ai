import { NextResponse } from "next/server";
import Stripe from "stripe";
import { requireUser } from "@/utils/supabase/auth-guard";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  console.error("[Aegisora Billing] STRIPE_SECRET_KEY is not configured.");
}

const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey)
  : null;

type PlanKey = "starter" | "business" | "enterprise";

interface CheckoutPayload {
  planName?: unknown;
}

const PLAN_PRICES: Record<PlanKey, string | undefined> = {
  starter: process.env.STRIPE_PRICE_STARTER,
  business: process.env.STRIPE_PRICE_BUSINESS,
  enterprise: process.env.STRIPE_PRICE_ENTERPRISE,
};

function normalizePlanName(value: unknown): PlanKey | null {
  if (typeof value !== "string") {
    return null;
  }

  const normalized = value.trim().toLowerCase();

  switch (normalized) {
    case "starter":
      return "starter";

    case "pro":
    case "business":
      return "business";

    case "global":
    case "enterprise":
      return "enterprise";

    default:
      return null;
  }
}

function getPlanPriceId(plan: PlanKey): string | null {
  const priceId = PLAN_PRICES[plan];

  if (!priceId || !priceId.startsWith("price_")) {
    return null;
  }

  return priceId;
}

function getIdempotencyKey(request: Request): string {
  const provided =
    request.headers.get("Idempotency-Key") ??
    request.headers.get("X-Idempotency-Key");

  if (
    provided &&
    provided.length >= 8 &&
    provided.length <= 255
  ) {
    return provided;
  }

  // Fallback: this prevents malformed/missing keys from breaking
  // checkout, but clients should still provide their own key when
  // retry protection is important.
  return crypto.randomUUID();
}

export async function POST(req: Request) {
  try {
    const user = await requireUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 },
      );
    }

    if (!stripe) {
      return NextResponse.json(
        { error: "Billing service is not configured" },
        { status: 503 },
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    if (!baseUrl) {
      console.error(
        "[Aegisora Billing] NEXT_PUBLIC_BASE_URL is not configured.",
      );

      return NextResponse.json(
        { error: "Billing service is not configured" },
        { status: 503 },
      );
    }

    let body: CheckoutPayload;

    try {
      body = (await req.json()) as CheckoutPayload;
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON request body" },
        { status: 400 },
      );
    }

    const plan = normalizePlanName(body.planName);

    if (!plan) {
      return NextResponse.json(
        {
          error:
            "Invalid plan. Supported plans are starter, business, and enterprise.",
        },
        { status: 400 },
      );
    }

    const priceId = getPlanPriceId(plan);

    if (!priceId) {
      console.error(
        `[Aegisora Billing] Missing Stripe price configuration for plan: ${plan}`,
      );

      return NextResponse.json(
        { error: "Selected plan is temporarily unavailable" },
        { status: 503 },
      );
    }

    const session = await stripe.checkout.sessions.create(
      {
        mode: "subscription",

        payment_method_types: ["card"],

        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],

        client_reference_id: user.id,

        customer_email: user.email ?? undefined,

        metadata: {
          user_id: user.id,
          plan,
        },

        subscription_data: {
          metadata: {
            user_id: user.id,
            plan,
          },
        },

        success_url:
          `${baseUrl}/dashboard/billing` +
          "?success=true&session_id={CHECKOUT_SESSION_ID}",

        cancel_url:
          `${baseUrl}/dashboard/billing?canceled=true`,
      },
      {
        idempotencyKey: getIdempotencyKey(req),
      },
    );

    if (!session.url) {
      console.error(
        "[Aegisora Billing] Stripe returned a checkout session without a URL.",
      );

      return NextResponse.json(
        { error: "Unable to create checkout session" },
        { status: 502 },
      );
    }

    return NextResponse.json(
      {
        url: session.url,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  } catch (error: unknown) {
    console.error(
      "[Aegisora Billing] Checkout creation failed:",
      error,
    );

    return NextResponse.json(
      { error: "Unable to create checkout session" },
      { status: 502 },
    );
  }
}
