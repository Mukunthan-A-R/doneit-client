import axios from "axios";

const apiUrl = import.meta.env.VITE_DONE_IT_API_URL;
let token = null;
getAuthToken();

// localStorage.getItem("x-auth-token");

function getAuthToken() {
  try {
    const userDataString = localStorage.getItem("userData");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      token = userData?.token || localStorage.getItem("x-auth-token");
      // console.log(userDataString);
      // console.log(token);
    }
  } catch (error) {
    console.error("Error parsing userData from localStorage:", error);
    // You can also implement additional error handling here
  }
}

if (!apiUrl) {
  throw new Error("API URL is not defined in the environment variables.");
}

const API_URL = `${apiUrl}/api`;

export const fetchTasks = async (project_id) => {
  try {
    const url = `${apiUrl}/api/tasks/${project_id}`;
    // console.log(token);

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response.status === 404) {
      const errorData = new Error("No tasks found for this project ID");
      errorData.response = error.response.data;
      throw errorData;
    }
    throw new Error("An error occurred while fetching the tasks");
  }
};

export const updateTask = async (taskId, taskData) => {
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

export const createTask = async (taskData) => {
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

// New function to delete a task
export const deleteTask = async (taskId) => {
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
