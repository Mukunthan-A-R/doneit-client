// src/components/common/SubscriptionStatus.jsx
import { differenceInDays, isBefore } from "date-fns";

const SubscriptionStatus = ({ subscription }) => {
  if (!subscription || !subscription.plan_name || !subscription.end_date)
    return null;

  const { plan_name, end_date } = subscription;
  const today = new Date();
  const expiry = new Date(end_date);
  const expired = isBefore(expiry, today);
  const daysLeft = differenceInDays(expiry, today);

  return (
    <div className="pt-2">
      <span className="font-semibold text-gray-700 pr-1">Plan:</span>
      <span
        className={`font-bold px-2 py-1 rounded-full 
            ${
              expired
                ? "bg-red-100 text-red-700 border border-red-300"
                : "bg-blue-100 text-blue-800 border border-blue-300"
            }`}
      >
        {plan_name}
      </span>
      <div className="text-gray-600 mt-1 font-bold">
        {expired ? (
          <span className="text-red-600">Plan Expired</span>
        ) : (
          `Time Remaining : ${daysLeft} day${daysLeft !== 1 ? "s" : ""}`
        )}
      </div>
    </div>
  );
};

export default SubscriptionStatus;
