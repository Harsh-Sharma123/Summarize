import { GetuserPlan } from "@/lib/userDetails";
import { currentUser } from "@clerk/nextjs/server";
import { pricingPlans } from "../../../utils/constants";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { Crown } from "lucide-react";

export default async function PlanBadge() {
  const user = await currentUser();

  if (!user?.id) {
    return null;
  }

  const email = user?.emailAddresses?.[0].emailAddress;

  let priceId: string | null = null;

  if (email) {
    priceId = await GetuserPlan(email);
  }

  let planName = "Buy a plan";
  const plan = pricingPlans.find((plan) => plan.priceId === priceId);

  if (plan) {
    planName = plan.name;
  }
  console.log(plan);
  console.log(priceId);
  return (
    <Badge
      variant={"outline"}
      className={cn(
        "ml-2 bg-linear-to-r from-amber-100 to-amber-300 hidden lg:flex flex-row items-center",
        !priceId && "from-red-100 to-red-200 border-red-300"
      )}
    >
      <Crown
        className={cn(
          "w-3 h-3 mr-1 text-amber-400",
          !priceId && "text-red-400"
        )}
      />
      {planName}
    </Badge>
  );
}
