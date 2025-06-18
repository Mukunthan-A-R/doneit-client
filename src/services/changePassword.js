import axios from "axios";
import { API_URL } from "./utils";

const ApiUrl = API_URL;

if (!ApiUrl) {
  throw new Error("API URL is not defined in the environment variables.");
}

const apiUrl = `${ApiUrl}/api/user-password`;

const getAuthHeaders = () => {
  try {
    const userDataString = localStorage.getItem("userData");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      return {
        Authorization: `Bearer ${userData?.token || ""}`,
      };
    }
  } catch (error) {
    console.error("Error parsing userData from localStorage:", error);
  }
  return {};
};

export const changePassword = async (userId, currentPassword, newPassword) => {
  try {
    const response = await axios.put(
      `${apiUrl}/${userId}`,
      { currentPassword, newPassword },
      { headers: getAuthHeaders() },
    );

    return response.data;
  } catch (error) {
    console.error("Error changing password:", error);
    return {
      success: false,
      status: error.response?.data?.status,
      message: error.response?.data?.message || error.message,
    };
  }
};
