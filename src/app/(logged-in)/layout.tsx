import UpgradeRequired from "@/components/common/upgrade-required";
import { hasActivePlan } from "@/lib/userDetails";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const hasActiveSubscription = await hasActivePlan(
    user.emailAddresses[0].emailAddress
  );

  console.log("Active Subscription ", hasActiveSubscription);

  if (!hasActiveSubscription) {
    return <UpgradeRequired />;
  }
  return <>{children}</>;
}
