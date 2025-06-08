import ProjectCardHolder from "../components/ProjectCardHolder";

import { useRecoilValue } from "recoil";
import { userData } from "../data/atom";

import ProjectCollabCardHolder from "../components/ProjectCollabCardHolder";
import UserHeaderInfo from "../components/modals/UserHeaderInfo";

const Dashboard = () => {
  const currentUserData = useRecoilValue(userData);

  return (
    <>
      <UserHeaderInfo />

      <>
        <h1 className="text-xl font-semibold pb-4 pt-2 lg:pt-0">
          Your Projects !
        </h1>
        <ProjectCardHolder user_id={currentUserData.user_id} />
      </>
      <div className="mt-8">
        <h1 className="text-xl font-semibold pb-4 pt-2 lg:pt-0">
          Your Collab Projects !
        </h1>
        <ProjectCollabCardHolder user_id={currentUserData.user_id} />
      </div>
    </>
  );
};

export default Dashboard;
