import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import ChangePasswordModal from "../components/ChangePasswordModal";
import ExportProjects from "../components/ExportProjects";
import GeneralSettingsPanel from "../components/GeneralSettingsPanel";
import LogoutButton from "../components/LogoutButton";
import SettingsPage from "../components/SettingsPage";
import { userData } from "../data/atom";

const Settings = () => {
  const navigate = useNavigate();
  const currentUserData = useRecoilValue(userData);

  useEffect(() => {
    const token = localStorage.getItem("x-auth-token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="flex-1 p-6 bg-white">
      <h1 className="text-2xl font-semibold pb-4">Your Settings!</h1>
      <SettingsPage />
      <div className="flex flex-col w-full  p-6 ">
        <div className="flex-1 w-full">
          <GeneralSettingsPanel />
        </div>
        <ExportProjects />
        <ChangePasswordModal userId={currentUserData.user_id} />
        <LogoutButton />
      </div>
    </div>
  );
};

export default Settings;
