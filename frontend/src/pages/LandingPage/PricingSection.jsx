"use client";
import React, { useState } from "react";
import PricingCard from "./PricingCard";

function PricingSection() {
  const [billingCycle, setBillingCycle] = useState("monthly");

  const pricingPlans = [
    {
      title: "Basic Plan",
      description:
        "Perfect for individuals who want to access our content on a single device at a time.",
      monthlyPrice: "49.99MAD",
      yearlyPrice: "499.99MAD",
      features: [
        "Watch on 1 device at a time",
        "No ads",
        "Full content access",
        "Offline viewing",
        "Cancel anytime",
      ],
      isPopular: false,
    },
    {
      title: "Standard Plan",
      description:
        "Access to a wider selection of movies and shows, including most new releases and exclusive content. ",
      monthlyPrice: "90.99MAD",
      yearlyPrice: "909.99MAD",
      features: [
        "Watch on 2 devices at a time",
        "No ads",
        "Full content access",
        "Offline viewing",
        "Cancel anytime",
      ],
      isPopular: true,
    },
    {
      title: "Premium Plan",
      description:
        "The ultimate plan for movie lovers. Enjoy the best quality and features. Suitable for families.",
      monthlyPrice: "129.99MAD",
      yearlyPrice: "1299.99MAD",
      features: [
        "Watch Party feature",
        "Ultra HD available",
        "Offline viewing",
        "Cancel anytime",
        "Create up to 5 user profiles",
        
      ],
      isPopular: false,
    },
  ];

  return (
    <section className="mt-24 w-full max-w-[1124px] max-md:mt-10 max-md:max-w-full" id="subscriptions">
      <div className="flex flex-wrap gap-10 items-end w-full max-md:max-w-full">
        <div className="flex-1 shrink basis-4 min-w-60 max-md:max-w-full">
          <h2 className="text-3xl font-bold text-white max-md:max-w-full">
            Choose the plan that's right for you
          </h2>
          <p className="mt-2.5 text-base leading-6 text-neutral-400 max-md:max-w-full">
            Join MovieSync and select from our flexible subscription options
            tailored to suit your viewing preferences. Get ready for non-stop
            entertainment!
          </p>
        </div>

        <div className="flex items-center p-2 text-sm font-medium whitespace-nowrap rounded-lg border border-solid bg-stone-950 border-[color:var(--Black-15,#262626)]">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`gap-2.5 self-stretch px-5 py-3 my-auto ${
              billingCycle === "monthly"
                ? "text-white rounded-md bg-stone-900"
                : "rounded-[100px] text-neutral-400"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle("yearly")}
            className={`gap-2.5 self-stretch px-5 py-3 my-auto ${
              billingCycle === "yearly"
                ? "text-white rounded-md bg-stone-900"
                : "rounded-[100px] text-neutral-400"
            }`}
          >
            Yearly
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-5 items-start mt-16 w-full max-md:mt-10 max-md:max-w-full">
        {pricingPlans.map((plan, index) => (
          <PricingCard
            key={index}
            title={plan.title}
            description={plan.description}
            price={
              billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice
            }
            billingCycle={billingCycle}
            features={plan.features} // Pass features to PricingCard
            isPopular={plan.isPopular} // Pass isPopular to PricingCard
          />
        ))}
      </div>
    </section>
  );
}

export default PricingSection;
