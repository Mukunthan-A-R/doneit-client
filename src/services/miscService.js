import axios from "axios";

const TASK_API_URL = "http://localhost:3000/api/usertasks/user";

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
