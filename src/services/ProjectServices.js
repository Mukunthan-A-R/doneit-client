import axios from "axios";

const API_URL = "http://localhost:5000/api/project";

export const fetchProjects = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};

export const createProject = async (projectData) => {
  try {
    const response = await axios.post(API_URL, projectData);
    if (response.data.success) {
      console.log("Project created successfully:", response.data);
      return response.data;
    } else {
      console.error("Failed to create project:", response.data);
      return null;
    }
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
};
