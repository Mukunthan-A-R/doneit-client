import axios from "axios";
import { API_URL } from "./utils";

const CONTACT_API_URL = `${API_URL}/api/contact`;

// Auth token fetcher
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

// Submit contact form
export const submitContactMessage = async (formData) => {
  const token = getAuthToken();
  if (!token) throw new Error("Auth token not found.");

  try {
    const response = await axios.post(CONTACT_API_URL, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
