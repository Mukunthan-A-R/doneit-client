import ProjectCardHolder from "../components/ProjectCardHolder";
import ProjectCollabCardHolder from "../components/ProjectCollabCardHolder";
import UserHeaderInfo from "../components/modals/UserHeaderInfo";
import useUserSubscription from "../hooks/useUserSubscription";

const Dashboard = () => {
  const { subscription } = useUserSubscription();

  return (
    <>
      <UserHeaderInfo />
      <header className="bg-blue-950 text-white py-2 px-4  shadow rounded-lg flex items-center justify-between my-4 gap-4 md:gap-0 mb-4 mt-6">
        <h1 className="text-2xl font-bold">Your Projects </h1>
      </header>
      <ProjectCardHolder />
      <div className="mt-8">
        <header className="bg-blue-950 text-white py-2 px-4  shadow rounded-lg flex items-center justify-between my-4 gap-4 md:gap-0 mb-4">
          <h1 className="text-2xl font-bold">Your Collab Projects </h1>
        </header>
        <ProjectCollabCardHolder />
      </div>
    </>
  );
};

export default Dashboard;
