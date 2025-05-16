import { cn } from "@/lib/utils";
import { ArrowRight, CheckIcon } from "lucide-react";
import Link from "next/link";

type Plan = {
  name: string;
  id: string;
  price: number;
  description: string;
  items: string[];
  paymentLink: string;
  priceId: string;
};

const pricingPlans: Plan[] = [
  {
    name: "Basic",
    price: 49,
    description: "Perfect for occasional use",
    items: [
      "5 PDF summaries per month",
      "Standard processing speed",
      "Email support",
    ],
    id: "basic",
    paymentLink: "https://buy.stripe.com/test_3cscMQcF8548gz6cMM",
    priceId: "price_1RA9yVCTlpmJdURCo5eDA5T5",
  },
  {
    name: "Pro",
    price: 129,
    description: "For professionals and teams",
    items: [
      "Unlimited PDF summaries",
      "Priority processing",
      "24/7 priority support",
      "Markdown Export",
    ],
    id: "pro",
    paymentLink: "https://buy.stripe.com/test_28o7sw7kO7cg6Yw7st",
    priceId: "price_1RA9yVCTlpmJdURCk8Oi1pwO",
  },
];

const PricingCard = ({
  name,
  id,
  description,
  items,
  price,
  paymentLink,
  priceId,
}: Plan) => {
  return (
    <div className="relative w-full max-w-lg hover:scale-105 hover:transition-all duration-300">
      <div
        className={cn(
          "relative flex flex-col justify-between h-full gap-4 lg:gap-8 z-10 p-8 rounded-2xl border-[2px] border-gray-200/20",
          id === "pro" && "border-rose-500 gap-5 border-4"
        )}
      >
        <div className="flex justify-between items-center gap-4">
          <div>
            <p className="text-lg lg:text-xl font-bold capitalize">{name}</p>
            <p className="text-base-content/80 mt-2">{description}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <p className="text-5xl tracking-tight font-extrabold">$ {price}</p>
          <div className="flex flex-col justify-end mb-[4px]">
            <p className="text-xs uppercase font-semibold">USD</p>
            <p className="text-xs">/month</p>
          </div>
        </div>

        <div>
          {items.map((item, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <CheckIcon size={18} />
              <span>{item}</span>
            </li>
          ))}
        </div>

        <div className="space-y-2 flex justify-center w-full">
          <Link
            href={paymentLink}
            className={cn(
              "w-full rounded-full flex items-center justify-center gap-2 bg-linear-to-r from-rose-800 to-rose-500 hover:from-rose-500 hover:to-rose-800 text-white border-2 py-2",
              id === "pro"
                ? "border-rose-900"
                : "border-rose-100 from-rose-400 to-rose-500"
            )}
          >
            Buy Now <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function PricingSection() {
  return (
    <section>
      <div className="py-12 lg:py-24 px-4 sm:px-6 lg:px-8 lg:pt-12 mx-auto max-w-5xl">
        <div className="flex items-center justify-center w-full pb-12">
          <h2 className="uppercase font-bold text-xl mb-8 text-rose-500">
            Pricing
          </h2>
        </div>

        <div className="relative flex flex-col justify-center lg:flex-row items-center lg:items-stretch gap-8">
          {pricingPlans.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
}
