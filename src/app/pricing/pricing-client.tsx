"use client";

import * as React from "react";
import Link from "next/link";
import { Check, ShieldCheck } from "lucide-react";
import { featureComparison, type PricingPlan } from "@/data/pricing";

interface PricingClientProps {
  plans: PricingPlan[];
}

export function PricingClient({ plans }: PricingClientProps) {
  const [billingCycle, setBillingCycle] = React.useState<"monthly" | "annual">("annual");
  const [revenue, setRevenue] = React.useState<number>(50000);
  const [wastage, setWastage] = React.useState<number>(10);

  // ROI Calculator Calculations
  const averageFoodCostRatio = 0.3; // 30% average food cost
  const diynezaWastageSavingsRatio = 0.45; // DIYNEZA typically saves 45% of ingredient waste
  
  const currentMonthlyFoodCost = revenue * averageFoodCostRatio;
  const currentMonthlyWastageLoss = currentMonthlyFoodCost * (wastage / 100);
  const estimatedDiynezaMonthlySavings = currentMonthlyWastageLoss * diynezaWastageSavingsRatio;
  const estimatedDiynezaAnnualSavings = estimatedDiynezaMonthlySavings * 12;

  return (
    <main className="flex-1 bg-dark-bg text-white">
      {/* Banner/Header */}
      <section className="relative overflow-hidden pt-20 pb-16 text-center">
        <div className="absolute top-0 left-1/2 -z-10 h-[300px] w-[600px] -translate-x-1/2 bg-primary/5 blur-3xl" />
        <div className="mx-auto max-w-7xl px-6">
          <span className="font-heading text-xs font-semibold tracking-widest text-primary uppercase">
            PRICING PLANS
          </span>
          <h1 className="mt-4 font-heading text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
            Transparent, scalable pricing.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-400">
            Pick the operating stack suited for your kitchen size. No hidden transaction fees, no commissions on tableside QR checkouts.
          </p>

          {/* Billing cycle toggle */}
          <div className="mt-10 flex justify-center items-center space-x-3">
            <span className={`text-sm font-semibold ${billingCycle === "monthly" ? "text-white" : "text-zinc-500"}`}>
              Monthly Billing
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === "monthly" ? "annual" : "monthly")}
              className="relative h-6 w-11 rounded-full bg-zinc-800 transition-colors focus:outline-none cursor-pointer"
              aria-label="Toggle Billing Cycle"
            >
              <div
                className={`h-4.5 w-4.5 rounded-full bg-primary transition-transform transform ${
                  billingCycle === "annual" ? "translate-x-5.5" : "translate-x-1"
                }`}
              />
            </button>
            <div className="flex items-center space-x-1.5">
              <span className={`text-sm font-semibold ${billingCycle === "annual" ? "text-white" : "text-zinc-500"}`}>
                Annual Billing
              </span>
              <span className="rounded bg-primary/10 border border-primary/20 px-2 py-0.5 text-[10px] text-primary font-bold">
                Save 20%
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => {
            const price = billingCycle === "annual" ? plan.priceAnnual : plan.priceMonthly;
            const isEnterprise = plan.id === "enterprise" || plan.name.toLowerCase() === "enterprise";

            return (
              <div
                key={plan.id}
                className={`group relative rounded-2xl border p-8 flex flex-col justify-between transition-all duration-300 ${
                  plan.popular
                    ? "border-primary bg-zinc-950/80 shadow-primary/5 shadow-2xl"
                    : "border-zinc-800/80 bg-zinc-900/10 hover:border-zinc-700"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-[10px] font-bold text-black uppercase tracking-wider">
                    Most Popular
                  </span>
                )}

                <div>
                  <h3 className="font-heading text-lg font-bold text-zinc-300">{plan.name}</h3>
                  <p className="mt-2 text-xs text-zinc-500 min-h-[40px] leading-relaxed">
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="mt-6 flex items-baseline">
                    <span className="font-heading text-4xl font-extrabold tracking-tight text-white">
                      {isEnterprise ? "Custom" : `$${price}`}
                    </span>
                    {!isEnterprise && (
                      <span className="ml-1 text-sm font-semibold text-zinc-500">/mo</span>
                    )}
                  </div>

                  {/* Features list */}
                  <ul className="mt-8 space-y-4 text-xs text-zinc-400">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center space-x-2.5">
                        <Check className="h-4.5 w-4.5 text-primary shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA button */}
                <Link
                  href={isEnterprise ? "/contact?intent=demo" : "/contact?intent=trial"}
                  className={`mt-8 w-full inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-heading font-medium transition-all ${
                    plan.popular
                      ? "bg-primary text-black hover:bg-primary-light glow-primary"
                      : "border border-zinc-700 bg-zinc-900/60 text-white hover:bg-zinc-800 hover:border-zinc-500"
                  }`}
                >
                  {plan.ctaText}
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* ROI Savings Calculator */}
      <section className="py-20 bg-zinc-950/40 border-y border-zinc-900">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Controls */}
          <div>
            <span className="font-heading text-xs font-semibold tracking-widest text-primary uppercase">
              ROI CALCULATOR
            </span>
            <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-white sm:text-5xl leading-tight">
              Calculate your savings.
            </h2>
            <p className="mt-4 text-sm text-zinc-400">
              Adjust the sliders based on your current monthly sales and estimated raw ingredient waste to see the return on investing in DIYNEZA.
            </p>

            {/* Sliders */}
            <div className="mt-10 space-y-8">
              {/* Sales Slider */}
              <div className="space-y-3">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-zinc-300">Average Monthly Revenue</span>
                  <span className="text-primary font-heading font-bold">${revenue.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="250000"
                  step="5000"
                  value={revenue}
                  onChange={(e) => setRevenue(Number(e.target.value))}
                  className="w-full accent-primary h-1 bg-zinc-800 rounded-full cursor-pointer appearance-none"
                />
                <div className="flex justify-between text-[10px] text-zinc-600 font-semibold">
                  <span>$10,000</span>
                  <span>$250,000+</span>
                </div>
              </div>

              {/* Waste Slider */}
              <div className="space-y-3">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-zinc-300">Estimated Ingredient Waste</span>
                  <span className="text-primary font-heading font-bold">{wastage}%</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="20"
                  step="1"
                  value={wastage}
                  onChange={(e) => setWastage(Number(e.target.value))}
                  className="w-full accent-primary h-1 bg-zinc-800 rounded-full cursor-pointer appearance-none"
                />
                <div className="flex justify-between text-[10px] text-zinc-600 font-semibold">
                  <span>3% (Optimal)</span>
                  <span>20% (High Wastage)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Calculations Dashboard Widget */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl relative">
            <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-primary/5 blur-xl pointer-events-none" />
            <div className="flex justify-between items-center border-b border-zinc-900 pb-4">
              <span className="font-heading text-xs font-bold text-zinc-300">Estimated Financial Impact</span>
              <span className="rounded bg-success-custom/10 border border-success-custom/20 px-2 py-0.5 text-[9px] text-success-custom font-bold">
                Target Projections
              </span>
            </div>

            <div className="mt-6 space-y-6">
              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-500">Current Monthly Waste Loss:</span>
                <span className="font-semibold text-zinc-300">${currentMonthlyWastageLoss.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
              <div className="flex justify-between items-center text-xs border-b border-zinc-900 pb-4">
                <span className="text-zinc-500">Estimated DIYNEZA Savings Ratio:</span>
                <span className="font-semibold text-zinc-300">45% Waste Restored</span>
              </div>

              {/* Final ROI Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded border border-zinc-900 bg-zinc-900/10 p-4">
                  <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider block">Monthly Savings</span>
                  <span className="text-lg font-heading font-extrabold text-success-custom mt-1 block">
                    +${estimatedDiynezaMonthlySavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                </div>
                <div className="rounded border border-zinc-900 bg-zinc-900/10 p-4">
                  <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider block">Annual ROI Impact</span>
                  <span className="text-lg font-heading font-extrabold text-primary mt-1 block">
                    +${estimatedDiynezaAnnualSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-white text-center">
            Detailed Feature Comparison
          </h2>

          {/* Table */}
          <div className="mt-12 overflow-x-auto">
            <table className="w-full text-left text-xs text-zinc-400 border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-500 font-semibold uppercase tracking-wider">
                  <th className="py-4 px-4">Feature Description</th>
                  <th className="py-4 px-4 text-center">Starter</th>
                  <th className="py-4 px-4 text-center">Growth</th>
                  <th className="py-4 px-4 text-center">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900">
                {featureComparison.map((row, rIdx) => {
                  return (
                    <tr key={rIdx} className="hover:bg-zinc-900/10 transition-colors">
                      <td className="py-4 px-4">
                        <div className="font-semibold text-zinc-300">{row.feature}</div>
                        <span className="text-[10px] text-zinc-500 block mt-0.5">{row.category}</span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        {row.starter ? (
                          <ShieldCheck className="h-4.5 w-4.5 text-primary mx-auto" />
                        ) : (
                          <span className="text-zinc-700">—</span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-center">
                        {row.growth ? (
                          <ShieldCheck className="h-4.5 w-4.5 text-primary mx-auto" />
                        ) : (
                          <span className="text-zinc-700">—</span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-center">
                        {row.enterprise ? (
                          <ShieldCheck className="h-4.5 w-4.5 text-primary mx-auto" />
                        ) : (
                          <span className="text-zinc-700">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}
