import axios from "axios";
import { API_URL as apiUrl } from "./utils";

// Send a POST request to the chatbot backend
export const askAssistant = async (prompt, mode, projectId) => {
  const API_URL = `${apiUrl}/api/ai-assistant/${projectId}`;
  try {
    const response = await axios.post(
      API_URL,
      { prompt, mode },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Failed to get assistant response:",
      error.response?.data || error.message
    );
    throw error;
  }
};
