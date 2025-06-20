export default function PricingPlans() {
  const plans = [
    {
      name: "Starter",
      price: "₹149",
      description: "Ideal for freelancers and solo developers.",
      features: [
        "Up to 10 Projects",
        "5 Collaborators per Project",
        "Standard Analytics",
        "Email Support",
      ],
      button: "Upgrade to Starter",
      popular: false,
    },
    {
      name: "Team",
      price: "₹249",
      description: "Perfect for startups and growing teams.",
      features: [
        "Up to 20 Projects",
        "10 Collaborators per Project",
        "Advanced Analytics",
        "9/5 support",
      ],
      button: "Go Team Plan",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "Custom solutions for large organizations.",
      features: [
        "Unlimited Projects",
        "Unlimited Collaborators",
        "Custom Integrations",
        "SLA & Onboarding",
        "Dedicated Account Manager",
        "24/7 support",
      ],
      button: "Contact Sales",
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-blue-900 text-center mb-6">
          Choose the plan that works for your team
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Simple, transparent pricing designed to help you grow. No hidden fees.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-lg shadow-lg border border-gray-200 p-6 flex flex-col justify-between hover:shadow-xl transition-all duration-300 ${
                plan.popular ? "border-blue-900 ring-2 ring-blue-900" : ""
              }`}
            >
              {plan.popular && (
                <div className="mb-2">
                  <span className="inline-block text-xs font-bold text-white bg-blue-900 px-3 py-1 rounded-full uppercase tracking-wide">
                    Most Popular
                  </span>
                </div>
              )}
              <h3 className="text-xl font-semibold text-blue-900 mb-2">
                {plan.name}
              </h3>
              <p className="text-gray-500 text-sm mb-4">{plan.description}</p>
              <div className="text-3xl font-bold text-blue-900 mb-4">
                {plan.price}
                {plan.name === "Pro" && (
                  <span className="text-base font-medium text-gray-500">
                    /month
                  </span>
                )}
              </div>
              <ul className="mb-6 space-y-2 text-sm text-gray-700">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <svg
                      className="w-4 h-4 text-blue-900 mt-1 mr-2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full py-2 px-4 text-white bg-blue-900 hover:bg-blue-800 rounded-md font-medium transition duration-300">
                {plan.button}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
