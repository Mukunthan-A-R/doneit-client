import ProjectCardHolder from "../components/ProjectCardHolder";

import ProjectCollabCardHolder from "../components/ProjectCollabCardHolder";
import UserHeaderInfo from "../components/modals/UserHeaderInfo";

const Dashboard = () => {
  return (
    <>
      <UserHeaderInfo />
      <>
        <h1 className="text-xl font-semibold pb-4 pt-2 lg:pt-0">
          Your Projects
        </h1>
        <ProjectCardHolder />
      </>
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
