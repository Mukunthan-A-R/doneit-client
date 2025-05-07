import axios from "axios";

const apiUrl = import.meta.env.VITE_DONE_IT_API_URL;
if (!apiUrl) {
  throw new Error("API URL is not defined in the environment variables.");
}

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
      error.message || "An error occurred while fetching projects."
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
    });
    return response.data;
  } catch (error) {
    console.error("Error updating project:", error);
    throw new Error(error.response ? error.response.data : error.message);
  }
};

export const deleteAllProjects = async () => {
  const token = getToken();
  const user = {
    user_id: 1, // replace with dynamic user_id if needed
  };

  try {
    const response = await axios.delete(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: user,
    });
    return response.data;
  } catch (error) {
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
    });
    console.log("Project Deleted:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
};
