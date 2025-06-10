import axios from "axios";

// Get the base API URL from environment variables
const apiUrl = import.meta.env.VITE_DONE_IT_API_URL;

if (!apiUrl) {
  throw new Error("API URL is not defined in the environment variables.");
}

const API_URL = `${apiUrl}/api`;

let token = null;

// Get the auth token from localStorage
function getAuthToken() {
  try {
    const userDataString = localStorage.getItem("userData");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      token = userData?.token || localStorage.getItem("x-auth-token");
    }
  } catch (error) {
    console.error("Error parsing userData from localStorage:", error);
  }
}

// Fetch tasks by project ID
export const fetchTasks = async (project_id) => {
  getAuthToken(); // Ensure the token is updated
  const url = `${API_URL}/tasks/${project_id}`;
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response);
  return response.data;
};

// Update a task by ID
export const updateTask = async (taskId, taskData) => {
  getAuthToken();
  try {
    const response = await axios.put(`${API_URL}/task/${taskId}`, taskData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

// Create a new task
export const createTask = async (taskData) => {
  getAuthToken();
  try {
    const response = await axios.post(`${API_URL}/task`, taskData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

// Delete a task by ID
export const deleteTask = async (taskId) => {
  getAuthToken();
  try {
    const response = await axios.delete(`${API_URL}/task/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};
