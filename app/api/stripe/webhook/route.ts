import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey)
  : null;

function configurationError() {
  return NextResponse.json(
    { error: "Stripe webhook is not configured" },
    { status: 503 },
  );
}

export async function POST(req: Request) {
  if (!stripe || !webhookSecret) {
    console.error(
      "[Aegisora Stripe] Missing STRIPE_SECRET_KEY or STRIPE_WEBHOOK_SECRET.",
    );

    return configurationError();
  }

  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing Stripe signature" },
      { status: 400 },
    );
  }

  /*
   * Stripe signature verification must use the raw request body.
   * Do not call req.json() before this step.
   */
  const rawBody = await req.text();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      webhookSecret,
    );
  } catch (error: unknown) {
    console.error(
      "[Aegisora Stripe] Invalid webhook signature:",
      error,
    );

    return NextResponse.json(
      { error: "Invalid webhook signature" },
      { status: 400 },
    );
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session =
          event.data.object as Stripe.Checkout.Session;

        console.info(
          "[Aegisora Stripe] Checkout completed",
          {
            eventId: event.id,
            sessionId: session.id,
            customerId:
              typeof session.customer === "string"
                ? session.customer
                : null,
            subscriptionId:
              typeof session.subscription === "string"
                ? session.subscription
                : null,
            userId:
              session.metadata?.user_id ?? null,
            plan:
              session.metadata?.plan ?? null,
          },
        );

        /*
         * IMPORTANT:
         * Persist the subscription after the canonical billing
         * table/schema is confirmed.
         */
        break;
      }

      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription =
          event.data.object as Stripe.Subscription;

        console.info(
          "[Aegisora Stripe] Subscription state changed",
          {
            eventId: event.id,
            subscriptionId: subscription.id,
            customerId:
              typeof subscription.customer === "string"
                ? subscription.customer
                : null,
            status: subscription.status,
            cancelAtPeriodEnd:
              subscription.cancel_at_period_end,
            metadata: subscription.metadata,
          },
        );

        /*
         * Persist the current subscription state here after the
         * canonical billing schema is confirmed.
         */
        break;
      }

      case "customer.subscription.deleted": {
        const subscription =
          event.data.object as Stripe.Subscription;

        console.info(
          "[Aegisora Stripe] Subscription deleted",
          {
            eventId: event.id,
            subscriptionId: subscription.id,
            customerId:
              typeof subscription.customer === "string"
                ? subscription.customer
                : null,
            status: subscription.status,
            metadata: subscription.metadata,
          },
        );

        break;
      }

      case "invoice.payment_failed": {
        const invoice =
          event.data.object as Stripe.Invoice;

        console.warn(
          "[Aegisora Stripe] Invoice payment failed",
          {
            eventId: event.id,
            invoiceId: invoice.id,
            customerId:
              typeof invoice.customer === "string"
                ? invoice.customer
                : null,
          },
        );

        break;
      }

      case "invoice.paid": {
        const invoice =
          event.data.object as Stripe.Invoice;

        console.info(
          "[Aegisora Stripe] Invoice paid",
          {
            eventId: event.id,
            invoiceId: invoice.id,
            customerId:
              typeof invoice.customer === "string"
                ? invoice.customer
                : null,
          },
        );

        break;
      }

      default:
        console.info(
          "[Aegisora Stripe] Unhandled event",
          {
            eventId: event.id,
            type: event.type,
          },
        );
    }

    return NextResponse.json({
      received: true,
      event_id: event.id,
    });
  } catch (error: unknown) {
    console.error(
      "[Aegisora Stripe] Webhook processing failed:",
      error,
    );

    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 },
    );
  }
}
