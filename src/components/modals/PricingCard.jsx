import React from "react";

export function PricingCard({ title, price, features, highlighted = false }) {
  return (
    <div
      className={`w-full max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow-md transition-transform duration-300 ${
        highlighted ? "scale-105 z-10 shadow-xl" : ""
      }`}
    >
      <h5 className="mb-4 text-xl font-medium text-gray-700">{title}</h5>
      <div className="flex items-baseline text-gray-900">
        <span className="text-3xl font-semibold">$</span>
        <span className="text-5xl font-extrabold tracking-tight">{price}</span>
        <span className="ml-1 text-xl font-normal text-gray-500">/month</span>
      </div>
      <ul className="my-7 space-y-5">
        {features.map(({ text, disabled }, idx) => (
          <Feature key={idx} text={text} disabled={disabled} />
        ))}
      </ul>
      <button
        type="button"
        className="inline-flex w-full justify-center rounded-lg bg-blue-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
      >
        Choose plan
      </button>
    </div>
  );
}

function Feature({ text, disabled }) {
  const iconColor = disabled ? "text-gray-400" : "text-blue-900";
  const textClass = `text-base font-normal leading-tight ${
    disabled
      ? "text-gray-400 line-through decoration-gray-400"
      : "text-gray-600"
  }`;

  return (
    <li className="flex space-x-3">
      <svg
        className={`h-5 w-5 shrink-0 ${iconColor}`}
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
      <span className={textClass}>{text}</span>
    </li>
  );
}
