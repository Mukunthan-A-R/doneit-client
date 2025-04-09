import axios from "axios";
const API_URL = "http://localhost:5000/api";

export const fetchTasks = async (project_id) => {
  try {
    const url = `http://localhost:5000/api/tasks/${project_id}`;
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

export const createTask = async (taskData) => {
  try {
    const response = await axios.post(`${API_URL}/task`, taskData);
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

// New function to delete a task
export const deleteTask = async (taskId) => {
  try {
    const response = await axios.delete(`${API_URL}/task/${taskId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};
