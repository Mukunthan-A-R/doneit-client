// registerUser.js
import axios from "axios";

const API_URL = "http://localhost:3000/api/register";

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

const API_URL_login = "http://localhost:3000/login";

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(API_URL_login, credentials);
    return response.data;
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
    throw error;
  }
};
