import { useParams } from "react-router-dom";
import ChatBotUI from "../components/ChatBotUI";
import useProjectTasks from "../hooks/useProjectTasks";
import ErrorHandler from "../components/ErrorHandler";

export default function ChatBotPage() {
  const { projectId } = useParams();
  const { error, isLoading } = useProjectTasks(projectId);

  if (isLoading)
    return (
      <div className="text-center py-10 text-gray-500 animate-pulse">
        Loading project access...
      </div>
    );

  if (error) return <ErrorHandler error={error} />;

  return (
    <div>
      <ChatBotUI projectId={projectId} />
    </div>
  );
}
