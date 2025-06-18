export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB"); // Formats to "DD/MM/YYYY"
};

export const handleError = (error) => {
  console.log("🚀 ~ handleError ~ error:", error);
  return error
    ? typeof error === "string"
      ? error
      : error.response?.data?.message ||
        error.response?.data?.error ||
        error.error ||
        error.message
    : "Something went wrong!";
};

export const truncate = (str, max = 20) =>
  str.length > max ? str.slice(0, max) + "..." : str;

const API_URL = import.meta.env.VITE_DONE_IT_API_URL;
if (!API_URL) {
  throw new Error("Invalid ENV configuration");
}

export { API_URL };
