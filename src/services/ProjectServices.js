import axios from "axios";

const API_URL = "https://task-manager-server-ugiw.onrender.com/api/project";

export const fetchProjects = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};

export const fetchProjectById = async (projectId) => {
  try {
    const response = await axios.get(`${API_URL}/${projectId}`);
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

export const editProjectById = async (projectId, projectData) => {
  try {
    const response = await axios.put(
      `${API_URL}/${projectId}`,
      projectData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating project:", error);
    throw new Error(error.response ? error.response.data : error.message);
  }
};

export const deleteAllProjects = async () => {
  // user id
  const user = {
    user_id: 1,
  };

  try {
    const response = await axios.delete(API_URL, user);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};

export const deleteProjectById = async (projectId) => {
  try {
    const response = await axios.delete(
      `https://task-manager-server-ugiw.onrender.com/api/project/${projectId}`
    );
    console.log("Project Deleted:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting project:", error);
  }
};
