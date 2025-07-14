import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAssignmentsByProjectId } from "../services/collaboratorUserData";
import { isAxiosError } from "axios";
import { handleError } from "../services/utils";

export default function useProjectAssignments(projectId, currentUserId) {
  const [assignments, setAssignments] = useState([]);
  const [userRole, setUserRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  const refetch = () => {
    setRefetchTrigger((prev) => prev + 1);
  };

  useEffect(() => {
    if (!projectId) return;

    const fetchAssignments = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getAssignmentsByProjectId(projectId);
        const assignmentsData = response.data;

        if (response.status === 404) {
          setAssignments([]);
          return;
        }

        setAssignments(assignmentsData);

        const currentUserAssignment = assignmentsData.find(
          (a) => a.user_id === parseInt(currentUserId)
        );

        if (currentUserAssignment) {
          setUserRole(currentUserAssignment.role);
        }
      } catch (err) {
        if (isAxiosError(err)) {
          toast.error(handleError(err));
          setError(err);
        } else {
          toast.error("Error fetching assignments");
          setError(err);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchAssignments();
  }, [projectId, refetchTrigger]);

  return {
    assignments,
    userRole,
    isLoading,
    error,
    refetch,
  };
}
