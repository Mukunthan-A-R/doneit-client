import ChangePasswordModal from "../components/ChangePasswordModal";
import ExportProjects from "../components/ExportProjects";
import GeneralSettingsPanel from "../components/GeneralSettingsPanel";
import LogoutButton from "../components/LogoutButton";
import SettingsPage from "../components/SettingsPage";

const Settings = () => {
  return (
    <div className="flex-1 space-y-2 bg-white">
      <h1 className="text-2xl font-semibold">Your Settings!</h1>
      <SettingsPage />
      <div className="flex flex-col w-full  ">
        <div className="flex-1 w-full">
          <GeneralSettingsPanel />
        </div>
        <ExportProjects />
        <ChangePasswordModal />
        <LogoutButton />
      </div>
    </div>
  );
};

export default Settings;
