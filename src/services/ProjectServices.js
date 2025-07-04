import axios from "axios";
import { API_URL as apiUrl } from "./utils";

const API_URL = `${apiUrl}/api/project`;

// ✅ Helper function to always get the latest token
const getToken = () => {
  try {
    const userDataString = localStorage.getItem("userData");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      return userData?.token || localStorage.getItem("x-auth-token");
    }
  } catch (error) {
    console.error("Error parsing token from localStorage:", error);
  }
  return null;
};

export const fetchProjects = async (user_id) => {
  const token = getToken();
  try {
    const response = await axios.get(`${apiUrl}/project/${user_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return {
        success: false,
        status: 404,
        data: [],
      };
    }
    throw new Error(
      error.message || "An error occurred while fetching projects.",
    );
  }
};

export const fetchProjectById = async (projectId) => {
  const token = getToken();
  try {
    const response = await axios.get(`${API_URL}/${projectId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};

export const createProject = async (projectData) => {
  const token = getToken();
  try {
    const response = await axios.post(API_URL, projectData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

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
  const token = getToken();
  try {
    const response = await axios.put(`${API_URL}/${projectId}`, projectData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating project:", error);
    throw new Error(error.response ? error.response.data : error.message);
  }
};

export const deleteProjectById = async (projectId) => {
  const token = getToken();
  try {
    const response = await axios.delete(`${API_URL}/${projectId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    console.log("Project Deleted:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
};
