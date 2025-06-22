import { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { fetchProjects } from "../services/ProjectServices";
import { handleError } from "../services/utils";

export default function useProjectsByUser(id) {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  function refetch() {
    setRefetchTrigger((prev) => prev + 1);
  }

  useEffect(() => {
    if (!id) return;

    const getProjects = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { data } = await fetchProjects(id);
        setProjects(data);
      } catch (error) {
        if (isAxiosError(error)) {
          toast.error(handleError(error));
          setError(error);
        } else {
          toast.error("Something went wrong in fetching projects");
          setError(error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    getProjects();
  }, [id, refetchTrigger]);

  return {
    project: projects,
    isLoading,
    error,
    refetch,
  };
}
