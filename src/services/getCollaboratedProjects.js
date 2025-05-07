import axios from "axios";

const apiUrl = import.meta.env.VITE_DONE_IT_API_URL;
if (!apiUrl) {
  throw new Error("API URL is not defined in the environment variables.");
}

const API_URL = `${apiUrl}/api/collab-projects`;

// ✅ Helper function to always get the latest token
const getToken = () => {
  try {
    const userDataString = localStorage.getItem("userData");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      return userData?.token || localStorage.getItem("x-auth-token");
    }
  } catch (error) {
    console.error("Error retrieving token:", error);
  }
  return null;
};

// ✅ Function to fetch all collaborated projects
export const getCollaboratedProjects = async (userId) => {
  const token = getToken();
  try {
    const response = await axios.get(`${API_URL}/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Failed to fetch collaborated projects:",
      error.response?.data || error.message
    );
    throw error;
  }
};
