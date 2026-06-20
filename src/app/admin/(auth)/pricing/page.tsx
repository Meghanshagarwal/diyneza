import { createClient } from "@/utils/supabase/server";
import { PricingClient } from "./pricing-client";

export const revalidate = 0;

export default async function PricingCMSPage() {
  const supabase = await createClient();

  const { data: plans, error } = await supabase
    .from("pricing_plans")
    .select("*");

  // Custom sort to keep Starter -> Growth -> Enterprise order
  let sortedPlans = plans || [];
  if (sortedPlans.length > 0) {
    sortedPlans = [...sortedPlans].sort((a, b) => {
      if (a.name.toLowerCase() === "starter") return -1;
      if (b.name.toLowerCase() === "starter") return 1;
      if (a.name.toLowerCase() === "enterprise") return 1;
      if (b.name.toLowerCase() === "enterprise") return -1;
      return a.price_monthly - b.price_monthly;
    });
  }

  return <PricingClient initialPlans={sortedPlans} />;
}
