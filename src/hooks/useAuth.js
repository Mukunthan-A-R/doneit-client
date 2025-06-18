import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userData } from "../data/atom";
import { useEffect, useState } from "react";
import axios, { isAxiosError } from "axios";
import { API_URL, handleError } from "../services/utils";
import { toast } from "react-toastify";
import { loginUser, logoutUser } from "../services/User";

export default function useAuth() {
  const [state, setState] = useRecoilState(userData);
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  function refetch() {
    setRefetchTrigger((prev) => prev + 1);
  }

  useEffect(() => {
    if (state.isLoading || (state.user && refetchTrigger === 0)) return;

    async function getUser() {
      setState({ ...state, isLoading: true, error: null, requireLogin: false });
      try {
        const { data } = await axios.get(API_URL + "/auth/me", {
          withCredentials: true,
        });
        setState({
          user: {
            email: data.user.email,
            name: data.user.name,
            token: data.token,
            company: data.user.company,
            role: data.user.role,
            user_id: data.user.user_id,
          },
          isLoading: false,
          error: null,
          requireLogin: false,
        });
      } catch (error) {
        if (isAxiosError(error)) {
          toast.error(handleError(error));
          setState({ user: null, isLoading: false, error, requireLogin: true });
        } else {
          toast.error("Something went wrong in fetching user details");
          setState({
            user: null,
            isLoading: false,
            error,
            requireLogin: false,
          });
        }
      }
    }

    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetchTrigger]);

  const navigate = useNavigate();

  async function handleLogout() {
    await logoutUser();
    setState({
      error: null,
      isLoading: false,
      user: null,
      requireLogin: false,
    });
    navigate("/login");
  }

  async function login(email, password) {
    try {
      const response = await loginUser({
        email: email.toLowerCase(),
        password,
      });

      const token = response.token;

      const userPayload = {
        token,
        user_id: response.user.user_id,
        name: response.user.name,
        email: response.user.email,
        company: response.user.company,
        role: response.user.role,
        is_activated: response.user.is_activated,
      };

      setState({
        user: {
          email: userPayload.email,
          name: userPayload.name,
          token: userPayload.token,
          user_id: userPayload.user_id,
          is_activated: userPayload.is_activated,
        },
        isLoading: false,
        error: null,
        requireLogin: false,
      });

      if (!response.user.is_activated) {
        toast.warn("Please Activate your Account by verifying by email");
      }
      return { success: true, error: null };
    } catch (error) {
      console.log("🚀 ~ loginUser ~ error:", error);
      if (isAxiosError(error)) {
        toast.error(handleError(error));
        setState({ user: null, isLoading: false, error, requireLogin: true });
      } else {
        toast.error("Something went wrong in logging in");
        setState({
          user: null,
          isLoading: false,
          error,
          requireLogin: false,
        });
      }
      return { success: false, error };
    }
  }

  return {
    user: state,
    handleLogout,
    refetch,
    isLoading: state.isLoading || (!state.user && !state.error),
    error: state.error,
    login,
  };
}
