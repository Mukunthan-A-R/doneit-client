import axios from "axios";
import { API_URL as apiUrl } from "./utils";

const API_URL = `${apiUrl}/api/project-activity`;

// Helper to get auth token
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

// Fetch all activity logs for a project
export const fetchActivityLogs = async (projectId) => {
  const token = getToken();
  try {
    const response = await axios.get(`${API_URL}/${projectId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return {
      success: true,
      status: response.status,
      data: response.data, // already { success, data }
    };
  } catch (error) {
    console.error("Error fetching activity logs:", error);

    // Capture backend-provided data if exists
    return {
      success: false,
      status: error.response?.status || 500,
      data: error.response?.data || null,
      message: error.response?.data?.message || error.message,
    };
  }
};

// Create a new activity log entry
export const createActivityLog = async (activityData) => {
  // activityData should be { user_id, project_id, task_id?, action, context }
  const token = getToken();
  try {
    const response = await axios.post(API_URL, activityData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return response.data; // { success: true, data: {...} }
  } catch (error) {
    console.error("Error creating activity log:", error);
    throw new Error(error.response?.data || error.message);
  }
};
