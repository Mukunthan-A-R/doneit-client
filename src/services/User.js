// registerUser.js
import axios from "axios";

const API_URL = "https://task-manager-server-ugiw.onrender.com/api/register";

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData);
    return response.data;
  } catch (error) {
    console.error(
      "Registration failed:",
      error.response?.data || error.message
    );
    throw error;
  }
};
