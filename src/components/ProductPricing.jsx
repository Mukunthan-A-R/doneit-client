import React from "react";
import { PricingCard } from "./modals/PricingCard";

const ProductPricing = () => {
  const plans = [
    {
      title: "Basic Plan",
      price: "19",
      highlighted: false,
      features: [
        { text: "1 team member" },
        { text: "5GB Cloud storage" },
        { text: "Community support" },
        { text: "API Access", disabled: true },
        { text: "Phone support", disabled: true },
      ],
    },
    {
      title: "Standard Plan",
      price: "49",
      highlighted: true,
      features: [
        { text: "2 team members" },
        { text: "20GB Cloud storage" },
        { text: "Integration help" },
        { text: "Sketch Files", disabled: true },
        { text: "24x7 Support", disabled: true },
      ],
    },
    {
      title: "Pro Plan",
      price: "99",
      highlighted: false,
      features: [
        { text: "5 team members" },
        { text: "100GB Cloud storage" },
        { text: "Priority integration" },
        { text: "Complete documentation" },
        { text: "24×7 phone & email support" },
      ],
    },
  ];

  return (
    <div className="bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-center gap-8 md:flex-row md:items-end">
        {plans.map((plan, idx) => (
          <PricingCard
            key={idx}
            title={plan.title}
            price={plan.price}
            features={plan.features}
            highlighted={plan.highlighted}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductPricing;
