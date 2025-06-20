// src/components/common/TrialExpiredOverlay.jsx
import { format } from "date-fns";
import { useRecoilValue } from "recoil";
import { userSubscription } from "../../data/atom";

const TrialExpiredOverlay = () => {
  const sub = useRecoilValue(userSubscription);
  const plan = sub?.plan_name || "Free";
  const endDate = sub?.end_date
    ? format(new Date(sub.end_date), "MMMM d, yyyy")
    : "Unknown";

  return (
    <div className="fixed inset-0 bg-white/30 z-50 flex items-center justify-center px-4">
      <div className="bg-white border border-gray-300 shadow-xl rounded-xl p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-3">
          Trial Expired
        </h2>

        <p className="text-gray-700 text-sm mb-4">
          Your trial for the <strong>{plan}</strong> plan expired on{" "}
          <strong>{endDate}</strong>.
        </p>

        <p className="text-gray-600 text-sm mb-6">
          To continue accessing project management features, please upgrade to a
          paid plan.
        </p>

        <a
          href="/settings"
          className="inline-block bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
        >
          Upgrade Plan
        </a>
      </div>
    </div>
  );
};

export default TrialExpiredOverlay;
