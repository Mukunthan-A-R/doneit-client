import axios from "axios";
import { API_URL } from "./utils";

const API_BASE_URL = API_URL;

export const requestPasswordReset = async (email) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/password-reset/request`,
      { email },
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

export const confirmPasswordReset = async (token, newPassword) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/password-reset/confirm`,
      { token, newPassword },
    );

    console.log("response");
    console.log(response);

    return response.data;
  } catch (error) {
    const errMsg =
      error.response?.data?.message ||
      error.message ||
      "Failed to reset password";
    throw new Error(errMsg);
  }
};
