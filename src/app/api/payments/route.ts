import {
  handleCheckoutSessionCompleted,
  handleSubscription,
} from "@/lib/payments";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const POST = async (req: NextRequest) => {
  console.log("Hello");
  const payload = await req.text();

  const sig = req.headers.get("stripe-signature");

  let event;

  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  try {
    event = stripe.webhooks.constructEvent(payload, sig!, endpointSecret!);

    switch (event.type) {
      case "checkout.session.completed":
        const sessionId = event.data.object.id;

        console.log(sessionId);

        const session = await stripe.checkout.sessions.retrieve(sessionId, {
          expand: ["line_items"],
        });

        console.log(session);

        await handleCheckoutSessionCompleted({ session, stripe });

        break;

      case "customer.subscription.deleted":
        const subscription = event.data.object;
        const subscriptionId = event.data.object.id;
        console.log(subscriptionId);

        await handleSubscription({ subscriptionId, stripe });

        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (err) {
    return NextResponse.json({ status: 400, error: "Invalid Signature" });
  }

  return NextResponse.json({
    status: "success",
    message: "Hello from Stripe API!",
  });
};
