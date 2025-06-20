import axios from "axios";
import { API_URL as apiUrl } from "./utils";

const SUBSCRIPTION_URL = `${apiUrl}/api/subscription`;

// Helper to get token from localStorage
const getToken = () => {
  try {
    const userDataString = localStorage.getItem("userData");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      return userData?.token || localStorage.getItem("x-auth-token");
    }
  } catch (error) {
    console.error("Error parsing token from localStorage:", error);
  }
  return null;
};

// ✅ Fetch subscription for a user
export const fetchUserSubscription = async (userId) => {
  const token = getToken();
  try {
    const response = await axios.get(`${SUBSCRIPTION_URL}/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return response.data; // { success: true, data: {...} }
  } catch (error) {
    console.error("Error fetching user subscription:", error);
    throw new Error(error.response?.data?.message || error.message);
  }
};
