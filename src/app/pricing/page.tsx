import { createClient } from "@/utils/supabase/server";
import { Navbar } from "@/components/homepage/navbar";
import { Footer } from "@/components/homepage/footer";
import { PricingClient } from "./pricing-client";
import { type PricingPlan } from "@/data/pricing";

// Opt-out of static caching to make sure pricing changes are reflected immediately
export const revalidate = 0;

export default async function PricingPage() {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("pricing_plans")
    .select("*")
    .eq("visible", true);

  let plans: PricingPlan[] = [];

  if (data && !error) {
    // Map database snake_case fields to frontend camelCase fields
    plans = data.map((plan: any) => ({
      id: plan.id,
      name: plan.name,
      priceMonthly: plan.price_monthly,
      priceAnnual: plan.price_annual,
      description: plan.description,
      features: plan.features || [],
      popular: plan.popular || false,
      ctaText: plan.cta_text || "Start Free Trial",
    }));

    // Ensure they are ordered (e.g. Starter -> Growth -> Enterprise)
    // Starter: ~39, Growth: ~99, Enterprise: 0 (or by order)
    plans.sort((a, b) => {
      if (a.name.toLowerCase() === "starter") return -1;
      if (b.name.toLowerCase() === "starter") return 1;
      if (a.name.toLowerCase() === "enterprise") return 1;
      if (b.name.toLowerCase() === "enterprise") return -1;
      return a.priceMonthly - b.priceMonthly;
    });
  }

  return (
    <>
      <Navbar />
      <PricingClient plans={plans} />
      <Footer />
    </>
  );
}
