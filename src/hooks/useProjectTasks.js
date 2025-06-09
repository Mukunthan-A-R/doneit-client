import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { fetchTasks } from "../services/TaskServices";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { CurrentProjectTasks } from "../data/atom";

export default function useProjectTasks(projectId) {
  const [state, setState] = useRecoilState(CurrentProjectTasks);
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  function refetch() {
    setRefetchTrigger((prev) => prev + 1);
  }

  useEffect(() => {
    console.log("effect running", state, projectId);
    if (!projectId) return;

    if (state.isLoading) return;

    // Always fetch on refetchTrigger change
    if (state.project_id === projectId && state.tasks && refetchTrigger === 0)
      return;

    async function getProjectTasks() {
      setState({
        ...state,
        isLoading: true,
        error: null,
        project_id: projectId,
      });
      try {
        const { data } = await fetchTasks(projectId);
        setState({
          tasks: data,
          isLoading: false,
          error: null,
          project_id: projectId,
        });
      } catch (error) {
        if (isAxiosError(error)) {
          toast.error(error.response || error.message);
          setState({
            tasks: null,
            isLoading: false,
            error,
            project_id: projectId,
          });
        } else {
          const errorMessage = "Something went wrong in fetching project tasks";
          toast.error(errorMessage);
          setState({
            tasks: null,
            isLoading: false,
            error: errorMessage,
            project_id: projectId,
          });
        }
      }
    }

    getProjectTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId, refetchTrigger]);

  return {
    tasks: state.tasks,
    isLoading: state.isLoading || (!state.tasks && !state.error),
    error: state.error,
    refetch,
  };
}
