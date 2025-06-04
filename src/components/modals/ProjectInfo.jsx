import useProject from "../../hooks/useProject";
import { formatDate } from "../../services/utils";

const ProjectInfo = ({ onClose }) => {
  const { isLoading: loading, error, project } = useProject();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="relative bg-white rounded-xl shadow-xl p-6 w-96 z-10">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 font-bold pr-2 text-xl "
        >
          &times;
        </button>
        {error && <p>Error: {error.response?.message}</p>}
        {loading && !project ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="text-3xl font-semibold">{project.name}</div>
            <div className="font-medium">{project.description}</div>
            <div>Project ID : {project.project_id}</div>
            <div>Priority : {project.priority}</div>
            <div>Status : {project.status}</div>
            <div>Project Start Date : {formatDate(project.start_date)}</div>
            <div>Project End Date : {formatDate(project.end_date)}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectInfo;
