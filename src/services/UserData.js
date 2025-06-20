import axios from "axios";
import { API_URL } from "./utils";

const apiUrl = API_URL;

const USER_API_URL = `${apiUrl}/api/user`;

// Helper function to get token on every call
const getAuthToken = () => {
  try {
    const userDataString = localStorage.getItem("userData");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      return userData?.token || null;
    }
  } catch (error) {
    console.error("Error parsing userData from localStorage:", error);
  }
  return null;
};

export const fetchUserById = async (userId) => {
  const token = getAuthToken();
  if (!token) throw new Error("Auth token not found in localStorage.");

  try {
    const response = await axios.get(`${USER_API_URL}/${userId}`, {
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

export const updateUserById = async (userId, userData) => {
  const token = getAuthToken();
  if (!token) throw new Error("Auth token not found in localStorage.");

  try {
    const response = await axios.put(`${USER_API_URL}/${userId}`, userData, {
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
