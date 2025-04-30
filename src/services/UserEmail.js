import axios from "axios";

// Define the API URL (email will be dynamic in the path)
const API_URL = "http://localhost:3000/api/userEmail";

// Function to fetch user by email
export const getUserByEmail = async (email) => {
  try {
    const response = await axios.get(`${API_URL}/${email}`);
    return response.data;
  } catch (error) {
    console.error(
      "Failed to fetch user by email:",
      error.response?.data || error.message
    );
    throw error;
  }
};
