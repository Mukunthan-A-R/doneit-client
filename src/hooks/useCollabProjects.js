import { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getCollaboratedProjects } from "../services/getCollaboratedProjects";
import { handleError } from "../services/utils";

export default function useCollabProject(id) {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  function refetch() {
    setRefetchTrigger((prev) => prev + 1);
  }

  useEffect(() => {
    if (!id) return;

    const fetchCollabProjects = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { data } = await getCollaboratedProjects(id);
        setProjects(data);
      } catch (error) {
        if (isAxiosError(error)) {
          toast.error(handleError(error));
          setError(error);
        } else {
          toast.error("Something went wrong while fetching collab projects");
          setError(error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchCollabProjects();
  }, [id, refetchTrigger]);

  return {
    project: projects,
    isLoading,
    error,
    refetch,
  };
}
