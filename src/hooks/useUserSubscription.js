// hooks/useUserSubscription.js
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { fetchUserSubscription } from "../services/userSubscription";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { handleError } from "../services/utils";
import { userSubscription } from "../data/atom";

export default function useUserSubscription(user_id) {
  const [subscription, setSubscription] = useRecoilState(userSubscription);
  const [isFetching, setIsFetching] = useState(false);

  const refetch = async () => {
    if (!user_id && isFetching) return;
    setIsFetching(true);
    try {
      const result = await fetchUserSubscription(user_id);
      if (result.success) {
        setSubscription(result.data);
      }
    } catch (error) {
      const message = isAxiosError(error)
        ? handleError(error)
        : "Failed to fetch subscription";
      toast.error(message);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (!user_id) return;

    if (!subscription?.user_id || subscription?.user_id !== user_id) {
      refetch();
    }
  }, [user_id]);

  return {
    subscription,
    isLoading:
      isFetching || (!subscription?.user_id && !subscription?.plan_name),
    refetch,
  };
}
