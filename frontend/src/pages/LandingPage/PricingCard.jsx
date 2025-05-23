import React from "react";

function PricingCard({
  title,
  description,
  price,
  billingCycle,
  features = [],
  isPopular = false,
}) {
  return (
<article className="flex flex-col justify-between flex-1 shrink p-10 rounded-xl border border-solid basis-0 bg-zinc-900 border-[color:var(--Black-15,#262626)] min-w-60 max-md:px-5">
      <div className="w-full">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="mt-3 text-base leading-6 text-neutral-400">
          {description}
        </p>
      </div>

      <div className="flex gap-0.5 justify-center items-end self-start mt-10 leading-none whitespace-nowrap">
        <span className="text-3xl font-semibold text-white">{price}</span>
        <span className="text-base font-medium text-neutral-400">
          /{billingCycle === "monthly" ? "month" : "year"}
        </span>
      </div>

      <ul className="mt-6 space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2 text-neutral-400">
            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
            {feature}
          </li>
        ))}
      </ul>

      <div className="flex gap-3 items-start mt-10 w-full text-sm font-semibold text-white">
        <button className="flex-1 shrink gap-2.5 self-stretch py-3.5 pr-5 pl-5 text-white rounded-md border border-solid basis-0 bg-neutral-900 border-[color:var(--Black-15,#262626)]">
          Start Free Trial
        </button>
        <button className="flex-1 shrink gap-2.5 self-stretch px-5 py-3.5 text-white bg-[#E50000] rounded-md basis-0">
          Choose Plan
        </button>
      </div>
    </article>
  );
}

export default PricingCard;
