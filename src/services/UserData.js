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

// console.log(apiUrl);

if (!apiUrl) {
  throw new Error("API URL is not defined in the environment variables.");
}

const USER_API_URL = `${apiUrl}/api/user`;

export const fetchUserById = async (userId) => {
  try {
    const response = await axios.get(`${USER_API_URL}/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};

export const updateUserById = async (userId, userData) => {
  try {
    const response = await axios.put(`${USER_API_URL}/${userId}`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};
