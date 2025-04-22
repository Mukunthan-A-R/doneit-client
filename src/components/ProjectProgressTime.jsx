// Function to calculate progress percentage based on time
const projectProgressTime = (startDate, endDate) => {
  const totalDuration = endDate - startDate; // Total project duration
  const currentDate = new Date(); // Current date/time
  const elapsedTime = currentDate - startDate; // Elapsed time

  // Calculate the progress as a percentage and ensure it's capped at 100%
  return Math.min((elapsedTime / totalDuration) * 100, 100);
};

const ProjectProgressTime = ({ project }) => {
  const startDate = new Date(project.start_date);
  const endDate = new Date(project.end_date);

  // Get the progress percentage using the helper function
  const progressPercentage = projectProgressTime(startDate, endDate);

  return (
    <div className="mt-2 w-full bg-gray-200 rounded-full h-2 relative">
      <div
        className="bg-blue-700 h-2 rounded-full"
        style={{ width: `${progressPercentage}%` }}
      ></div>
      <div
        className="bg-white h-2 rounded-full"
        style={{
          width: `${100 - progressPercentage}%`,
          borderRadius: "inherit",
        }}
      ></div>
    </div>
  );
};

export default ProjectProgressTime;
