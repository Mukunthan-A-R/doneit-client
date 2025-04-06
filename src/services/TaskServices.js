import axios from "axios";

export const fetchTasks = async (project_id) => {
  try {
    const url = `http://localhost:5000/api/tasks/${project_id}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error("An error occurred while fetching the tasks");
  }
};
