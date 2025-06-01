import { User } from "@clerk/nextjs/server";
import { pricingPlans } from "../../utils/constants";
import { getDBConnection } from "./db";
import { getUserFilesUploadedCount } from "./summaries";

export async function GetuserPlan(email: string) {
  const sql = await getDBConnection();

  const query =
    await sql`select price_id from users where email = ${email} and status = 'active'`;

  // console.log("User Plan ", query);

  return query?.[0]?.price_id || null;
}

export async function hasReachedUploadLimit(userId: string) {
  const uploadCount = await getUserFilesUploadedCount(userId);

  const priceId = await GetuserPlan(userId);
  const isPro =
    pricingPlans.find((plan) => plan.priceId === priceId)?.id === "pro";

  const uploadLimit: number = isPro ? 1000 : 5;
  // console.log(uploadCount?.count);

  return { hasReachedLimit: uploadCount?.count >= uploadLimit, uploadLimit };
}

export async function hasActivePlan(email: string) {
  const sql = await getDBConnection();
  const query =
    await sql`select price_id, status from users where email = ${email} and status = 'active' and price_id is not null  `;
  return query && query.length > 0;
}

export async function getSubscriptionStatus(user: User) {
  const hasSubscription = await hasActivePlan(
    user.emailAddresses[0].emailAddress
  );

  return hasSubscription;
}
