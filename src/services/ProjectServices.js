import axios from "axios";

const API_URL = "http://localhost:3000/api/project";

export const fetchProjects = async (user_id) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/project/${user_id}`
    );
    return response.data;
  } catch (error) {
    // If the response is 404 (no projects), return empty array
    if (error.response && error.response.status === 404) {
      return {
        success: false,
        status: 404,
        data: [],
      };
    }

    // Throw other errors (like network/server issues)
    throw new Error(
      error.message || "An error occurred while fetching projects."
    );
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
    const response = await axios.put(`${API_URL}/${projectId}`, projectData);
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
      `http://localhost:3000/api/project/${projectId}`
    );
    console.log("Project Deleted:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting project:", error);
  }
};
