import axios from "axios";
const apiUrl = import.meta.env.VITE_DONE_IT_API_URL;

console.log(apiUrl);

if (!apiUrl) {
  throw new Error("API URL is not defined in the environment variables.");
}

const USER_API_URL = `${apiUrl}/api/user`;

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
