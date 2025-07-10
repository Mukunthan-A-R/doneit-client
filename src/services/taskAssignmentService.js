import axios from "axios";
import { API_URL as apiUrl } from "./utils";

const API_URL = `${apiUrl}/api/task-assignments`;

// Reusable config with credentials only (no token)
const credentialsConfig = {
  withCredentials: true,
};

export const assignUserToTask = async (task_id, user_id, assigned_by) => {
  try {
    const response = await axios.post(
      API_URL,
      { task_id, user_id, assigned_by },
      credentialsConfig
    );
    return response.data;
  } catch (error) {
    console.error("Error assigning user to task:", error);
    throw error;
  }
};

export const removeUserFromTask = async (task_id, user_id) => {
  try {
    const response = await axios.delete(API_URL, {
      data: { task_id, user_id },
      ...credentialsConfig,
    });
    return response.data;
  } catch (error) {
    console.error("Error removing user from task:", error);
    throw error;
  }
};

export const getAssignedUsers = async (task_id) => {
  try {
    const response = await axios.get(
      `${API_URL}/${task_id}`,
      credentialsConfig
    );
    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching assigned users:", error);
    throw error;
  }
};

export const getAllAssignmentsByProject = async (project_id) => {
  try {
    const response = await axios.get(
      `${API_URL}/project/${project_id}`,
      credentialsConfig
    );
    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching project task assignments:", error);
    throw error;
  }
};
