import Stripe from "stripe";
import { getDBConnection } from "./db";

export async function handleCheckoutSessionCompleted({
  session,
  stripe,
}: {
  session: Stripe.Checkout.Session;
  stripe: Stripe;
}) {
  console.log("Checkout session completed!");

  const sql = await getDBConnection();

  const customerId = session.customer as string;
  const customer = await stripe.customers.retrieve(customerId);
  const priceId = session.line_items?.data[0]?.price?.id;

  if ("email" in customer && priceId) {
    const { email, name } = customer;

    await createOrUpdateUser({
      sql,
      email: email as string,
      name: name as string,
      customer_id: customerId,
      price_id: priceId as string,
      status: "active",
    });

    await createPayment({
      sql,
      session,
      priceId: priceId as string,
      user_email: email as string,
    });
  }
}

async function createOrUpdateUser({
  sql,
  email,
  name,
  customer_id,
  price_id,
  status,
}: {
  sql: any;
  email: string;
  name: string;
  customer_id: string;
  price_id: string;
  status: string;
}) {
  try {
    const user = await sql`select * from users where email = ${email}`;
    if (user.length === 0) {
      await sql`insert into users (email, full_name, customer_id, price_id, status) values(${email}, ${name}, ${customer_id}, ${price_id}, ${status})`;
    }
  } catch (err) {
    console.log("Error in creating or updating user ", err);
  }
}

async function createPayment({
  sql,
  session,
  priceId,
  user_email,
}: {
  sql: any;
  session: Stripe.Checkout.Session;
  priceId: string;
  user_email: string;
}) {
  try {
    const { amount_total, id, status } = session;
    await sql`insert into payments (amount, status, stripe_payment_id, price_id, user_email) values(${amount_total}, ${status}, ${id}, ${priceId}, ${user_email})`;
  } catch (err) {
    console.log("Error in creating Payment ", err);
  }
}

export async function handleSubscription({
  subscriptionId,
  stripe,
}: {
  subscriptionId: string;
  stripe: any;
}) {
  console.log("Subscription Cancelled!");
  try {
    const sql = await getDBConnection();

    console.log(subscriptionId);

    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    await sql`update users set status = 'cancelled' where customer_id = ${subscription.customer}`;
  } catch (err) {
    console.log(err);
  }
}
