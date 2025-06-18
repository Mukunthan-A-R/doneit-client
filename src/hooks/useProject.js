import { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { CurrentProjectState } from "../data/atom";
import { fetchProjectById } from "../services/ProjectServices";
import { handleError } from "../services/utils";

export default function useProject(id) {
  const [state, setState] = useRecoilState(CurrentProjectState);
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  function refetch() {
    setRefetchTrigger((prev) => prev + 1);
  }

  useEffect(() => {
    if (!id) return;

    if (state.isLoading) return;

    if (state.id === id && state.project && refetchTrigger === 0) return;

    async function getProject() {
      setState({ ...state, isLoading: true, error: null, id });
      try {
        const { data } = await fetchProjectById(id);
        setState({ project: data, isLoading: false, error: null, id });
      } catch (error) {
        if (isAxiosError(error)) {
          toast.error(handleError(error));
          setState({ project: null, isLoading: false, error, id });
        } else {
          toast.error("Something went wrong in fetching project details");
          setState({ project: null, isLoading: false, error, id });
        }
      }
    }

    getProject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, refetchTrigger]);

  return {
    project: state.project,
    isLoading: state.isLoading || (!state.project && !state.error),
    error: state.error,
    refetch,
  };
}
