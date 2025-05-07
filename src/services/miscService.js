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

const TASK_API_URL = `${apiUrl}/api/usertasks/user`;

export const fetchTasksByUserId = async (userId) => {
  try {
    const response = await axios.get(`${TASK_API_URL}/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error ||
        error.message ||
        "Failed to fetch user tasks"
    );
  }
};
