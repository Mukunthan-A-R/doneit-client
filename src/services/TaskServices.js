import axios from "axios";
const API_URL = "https://task-manager-server-ugiw.onrender.com/api";

export const fetchTasks = async (project_id) => {
  try {
    const url = `https://task-manager-server-ugiw.onrender.com/api/tasks/${project_id}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error("An error occurred while fetching the tasks");
  }
};

export const updateTask = async (taskId, taskData) => {
  try {
    const response = await axios.put(`${API_URL}/task/${taskId}`, taskData);
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};
