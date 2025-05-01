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

const API_URL_login = "https://task-manager-server-ugiw.onrender.com/login";

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(API_URL_login, credentials);
    return response.data;
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
    throw error;
  }
};

// https://task-manager-server-ugiw.onrender.com
