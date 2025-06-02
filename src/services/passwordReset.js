import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_DONE_IT_API_URL;

export const requestPasswordReset = async (email) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/password-reset/request`,
      { email }
    );
    return response.data; // { message: "Password reset email sent" }
  } catch (error) {
    const errMsg =
      error.response?.data?.message ||
      error.message ||
      "Failed to request password reset";
    throw new Error(errMsg);
  }
};
