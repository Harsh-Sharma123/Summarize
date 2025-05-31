import { isDev } from "./helper";

export type Plan = {
  name: string;
  id: string;
  price: number;
  description: string;
  items: string[];
  paymentLink: string;
  priceId: string;
};

export const pricingPlans: Plan[] = [
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
    paymentLink: isDev
      ? "https://buy.stripe.com/test_cNi9AVeiNfsJdBreVz4ko00"
      : "https://buy.stripe.com/test_cNi9AVeiNfsJdBreVz4ko00",
    priceId: "price_1RUXilQ2bHhTzExHR07dRJem",
  },
  {
    name: "Pro",
    price: 99,
    description: "For professionals and teams",
    items: [
      "Unlimited PDF summaries",
      "Priority processing",
      "24/7 priority support",
      "Markdown Export",
    ],
    id: "pro",
    paymentLink: isDev
      ? "https://buy.stripe.com/test_dRm6oJ2A5gwNfJzfZD4ko01"
      : "https://buy.stripe.com/test_dRm6oJ2A5gwNfJzfZD4ko01",
    priceId: "price_1RUXkXQ2bHhTzExHOWXr1SOe",
  },
];
