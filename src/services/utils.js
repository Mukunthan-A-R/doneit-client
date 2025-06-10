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
