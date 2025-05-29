import axios from "axios";

const apiUrl = import.meta.env.VITE_DONE_IT_API_URL;

if (!apiUrl) {
  throw new Error("API URL is not defined in the environment variables.");
}

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
    });
    return response.data;
  } catch (error) {
    console.error(
      "Failed to fetch user by email:",
      error.response?.data || error.message
    );
    throw error;
  }
};
