import axios from "axios";
import { API_URL } from "./utils";

const apiUrl = API_URL;

const USER_API_URL = `${apiUrl}/api/user`;

export const fetchUserById = async (userId) => {
  try {
    const response = await axios.get(`${USER_API_URL}/${userId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};

export const updateUserById = async (userId, userData) => {
  try {
    const response = await axios.put(`${USER_API_URL}/${userId}`, userData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};
