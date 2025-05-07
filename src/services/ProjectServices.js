import axios from "axios";

const apiUrl = import.meta.env.VITE_DONE_IT_API_URL;
let token = null;

try {
  const userDataString = localStorage.getItem("userData");
  if (userDataString) {
    const userData = JSON.parse(userDataString);
    token = userData?.token || null;
  }
} catch (error) {
  console.error("Error parsing userData from localStorage:", error);
  // You can also implement additional error handling here
}

if (!apiUrl) {
  throw new Error("API URL is not defined in the environment variables.");
}

const API_URL = `${apiUrl}/api/project`;

export const fetchProjects = async (user_id) => {
  console.log(token);
  try {
    const response = await axios.get(`${apiUrl}/project/${user_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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
  // user id
  const user = {
    user_id: 1,
  };

  try {
    const response = await axios.delete(API_URL, user, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};

export const deleteProjectById = async (projectId) => {
  try {
    const response = await axios.delete(`${apiUrl}/api/project/${projectId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Project Deleted:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting project:", error);
  }
};
