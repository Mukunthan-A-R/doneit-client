import axios from "axios";
import { API_URL } from "./utils";

const ApiUrl = API_URL;

if (!ApiUrl) {
  throw new Error("API URL is not defined in the environment variables.");
}

// Base URL for the API
const apiUrl = `${ApiUrl}/api/collab`;

// ✅ Helper to dynamically fetch the latest token
const getAuthHeaders = () => {
  try {
    const userDataString = localStorage.getItem("userData");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      return {
        Authorization: `Bearer ${userData?.token || ""}`,
      };
    }
  } catch (error) {
    console.error("Error parsing userData from localStorage:", error);
  }
  return {};
};

// 1. Get all assignments by project_id
export const getAssignmentsByProjectId = async (projectId) => {
  try {
    const response = await axios.get(`${apiUrl}/${projectId}`, {
      params: { project_id: projectId },
      headers: getAuthHeaders(),
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    return {
      success: false,
      status: error.response?.data?.status,
      message: error.response?.data?.message || error.message,
    };
  }
};

// 2. Create an assignment (POST request)
export const createAssignment = async (assignmentData) => {
  try {
    const response = await axios.post(apiUrl, assignmentData, {
      headers: getAuthHeaders(),
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error("Error creating assignment:", error);
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
};

// 3. Delete an assignment by ID (DELETE request)
export const deleteAssignmentById = async (assignmentId) => {
  try {
    const response = await axios.delete(`${apiUrl}/${assignmentId}`, {
      headers: getAuthHeaders(),
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting assignment:", error);
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
};
