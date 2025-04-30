import axios from "axios";

const USER_API_URL = "http://localhost:3000/api/user";

export const fetchUserById = async (userId) => {
  try {
    const response = await axios.get(`${USER_API_URL}/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};

export const updateUserById = async (userId, userData) => {
  try {
    const response = await axios.put(`${USER_API_URL}/${userId}`, userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};
