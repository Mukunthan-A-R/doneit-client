import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { fetchUserSubscription } from "../services/userSubscription";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { handleError } from "../services/utils";
import { userData, userSubscription } from "../data/atom";

export default function useUserSubscription() {
  const [subscription, setSubscription] = useRecoilState(userSubscription);
  const [isFetching, setIsFetching] = useState(false);

  const user = useRecoilValue(userData);
  const user_id = user?.user?.user_id;

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
