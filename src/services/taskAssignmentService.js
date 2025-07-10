import axios from "axios";
import { API_URL as apiUrl } from "./utils";

const API_URL = `${apiUrl}/api/task-assignments`;

let token = null;

function getAuthToken() {
  try {
    const userDataString = localStorage.getItem("userData");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      token = userData?.token || localStorage.getItem("x-auth-token");
    }
  } catch (error) {
    console.error("Error parsing userData from localStorage:", error);
  }
}

const authHeaders = () => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
  withCredentials: true,
});

export const assignUserToTask = async (task_id, user_id, assigned_by) => {
  getAuthToken();
  try {
    const response = await axios.post(
      API_URL,
      { task_id, user_id, assigned_by },
      authHeaders()
    );
    return response.data;
  } catch (error) {
    console.error("Error assigning user to task:", error);
    throw error;
  }
};

export const removeUserFromTask = async (task_id, user_id) => {
  getAuthToken();
  try {
    const response = await axios.delete(API_URL, {
      data: { task_id, user_id },
      ...authHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error removing user from task:", error);
    throw error;
  }
};

export const getAssignedUsers = async (task_id) => {
  getAuthToken();
  try {
    const response = await axios.get(`${API_URL}/${task_id}`, authHeaders());
    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching assigned users:", error);
    throw error;
  }
};

export const getAllAssignmentsByProject = async (project_id) => {
  getAuthToken();
  try {
    const response = await axios.get(
      `${API_URL}/project/${project_id}`,
      authHeaders()
    );
    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching project task assignments:", error);
    throw error;
  }
};
