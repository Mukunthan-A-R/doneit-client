// registerUser.js
import axios from "axios";
const apiUrl = import.meta.env.VITE_DONE_IT_API_URL;
let token = null;

try {
  const userDataString = localStorage.getItem("userData");
  if (userDataString) {
    const userData = JSON.parse(userDataString);
    token = userData?.token || null;
  }
} catch (error) {
  console.error("Error parsing userData from localStorage:", error);
  // You can also implement additional error handling here
}

if (!apiUrl) {
  throw new Error("API URL is not defined in the environment variables.");
}

const API_URL = `${apiUrl}/api/register`;

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Registration failed:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const API_URL_login = `${apiUrl}/login`;

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(API_URL_login, credentials, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
    throw error;
  }
};

// https://task-manager-server-ugiw.onrender.com
