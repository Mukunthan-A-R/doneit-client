import axios from "axios";
import { API_URL as apiUrl } from "./utils";

// Define the API URL (email will be dynamic in the path)
const API_URL = `${apiUrl}/api/userEmail`;

// ✅ Helper to dynamically fetch the latest token from localStorage
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

// Function to fetch user by email
export const getUserByEmail = async (email) => {
  try {
    const response = await axios.get(`${API_URL}/${email}`, {
      headers: getAuthHeaders(),
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Failed to fetch user by email:",
      error.response?.data || error.message,
    );
    throw error;
  }
};
