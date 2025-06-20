import ProjectCardHolder from "../components/ProjectCardHolder";
import ProjectCollabCardHolder from "../components/ProjectCollabCardHolder";
import UserHeaderInfo from "../components/modals/UserHeaderInfo";
import useUserSubscription from "../hooks/useUserSubscription";
import { useRecoilValue } from "recoil";
import { userData } from "../data/atom";

const Dashboard = () => {
  const user = useRecoilValue(userData);
  const currentUserId = user?.user?.user_id;

  if (currentUserId) {
    const { subscription } = useUserSubscription(currentUserId);
  } else {
    console.log("Cannot fetch users plan. reconnectiong ...");
  }

  return (
    <>
      <UserHeaderInfo />
      <h1 className="text-xl font-semibold pb-4 pt-2 lg:pt-0">Your Projects</h1>
      <ProjectCardHolder />
      <div className="mt-8">
        <h1 className="text-xl font-semibold pb-4 pt-2 lg:pt-0">
          Your Collab Projects
        </h1>
        <ProjectCollabCardHolder />
      </div>
    </>
  );
};

export default Dashboard;
