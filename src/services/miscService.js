import axios from "axios";

const apiUrl = import.meta.env.VITE_DONE_IT_API_URL;

if (!apiUrl) {
  throw new Error("API URL is not defined in the environment variables.");
}

const TASK_API_URL = `${apiUrl}/api/usertasks/user`;

export const fetchTasksByUserId = async (userId) => {
  try {
    const response = await axios.get(`${TASK_API_URL}/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error ||
        error.message ||
        "Failed to fetch user tasks"
    );
  }
};
