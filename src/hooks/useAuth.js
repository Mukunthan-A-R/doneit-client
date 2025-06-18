import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userData } from "../data/atom";
import { useEffect, useState } from "react";
import axios, { isAxiosError } from "axios";
import { API_URL } from "../services/utils";
import { toast } from "react-toastify";

export default function useAuth() {
  const [state, setState] = useRecoilState(userData);
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  function refetch() {
    setRefetchTrigger((prev) => prev + 1);
  }

  useEffect(() => {
    if (state.isLoading) return;

    if (state.user && refetchTrigger === 0) return;

    async function getProject() {
      setState({ ...state, isLoading: true, error: null });
      try {
        const { data } = await axios.get(API_URL + "/auth/me");
        setState({
          user: {
            email: data.email,
            name: data.name,
            token: data.token,
            user_id: data.user_id,
          },
          isLoading: false,
          error: null,
        });
      } catch (error) {
        if (isAxiosError(error)) {
          toast.error(error.response || error.message);
          setState({ user: null, isLoading: false, error });
        } else {
          toast.error("Something went wrong in fetching user details");
          setState({ user: null, isLoading: false, error });
        }
      }
    }

    getProject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetchTrigger]);

  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("x-auth-token");
    localStorage.removeItem("userData");
    setState(null);
    navigate("/login");
  }

  return {
    user: state,
    handleLogout,
    refetch,
    isLoading: state.isLoading || (!state.user && !state.error),
    error: state.error,
  };
}
