import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  sideBarToggle as sideBarToggleAtom,
  userSubscription,
} from "../../data/atom";
import PlanExpiredModal from "../modals/PlanExpiredModal";
import ProjectToolbar from "../ProjectToolbar";
import { GoSidebarExpand, GoSidebarCollapse } from "react-icons/go";
export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const [sideBarToggle, setSideBarToggle] = useRecoilState(sideBarToggleAtom);
  const subscriptionData = useRecoilValue(userSubscription);

  function handleNavigate() {
    return setIsSidebarOpen(false);
  }

  return (
    <div className="flex flex-col lg:flex-row h-full relative overflow-x-hidden flex-1">
      {showOverlay && subscriptionData.is_active === false && (
        <PlanExpiredModal
          plan={subscriptionData.plan_name}
          endDate={subscriptionData.end_date}
          onClose={() => setShowOverlay(false)}
        />
      )}
      {/* Sidebar */}
      <div
        className={`
          bg-blue-900 p-2 pr-0 w-[16rem]
          transition-all duration-300 flex flex-col
          fixed top-0 h-full pt-20 z-40
          ${isSidebarOpen ? "left-0" : "-left-64"}
          lg:left-0 md:data-[isdesktopsidebaropen=true]:w-14 pl-0
        `}
        data-isdesktopsidebaropen={sideBarToggle}
      >
        {/* Title and Close button */}
        <div className="flex items-center justify-between px-4 mb-4">
          <h2
            className="text-white font-sans text-xl font-medium md:data-[isdesktopsidebaropen=true]:hidden"
            data-isdesktopsidebaropen={sideBarToggle}
          >
            Project Toolbar
          </h2>
          {/* Close button visible on mobile only */}
          <button
            className="lg:hidden text-white"
            onClick={() => setIsSidebarOpen(false)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        {/* Side bar Toggle button for desktop */}
        <button
          className="p-2 md:flex hidden bg-blue-900 absolute -right-10 rounded-lg cursor-pointer text-white top-14"
          onClick={() => setSideBarToggle((prev) => !prev)}
        >
          {sideBarToggle ? (
            <GoSidebarCollapse size={20} />
          ) : (
            <GoSidebarExpand size={20} />
          )}
        </button>

        <button
          className="absolute left-[105%] top-20 block data-[isopen=true]:opacity-0 transition lg:hidden bg-blue-800 text-white px-4 py-2 rounded shadow-md focus:outline-none z-30"
          onClick={() => setIsSidebarOpen(true)}
          data-isopen={isSidebarOpen}
        >
          <span className="flex items-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
            Menu
          </span>
        </button>

        <ProjectToolbar setNavigate={handleNavigate} />
      </div>

      {/* Main Content */}
      <div
        className={`
          w-full bg-white p-6 relative
          ${isSidebarOpen ? "ml-[16rem]" : "ml-0"}
          lg:data-[isdesktopsidebaropen=true]:ml-16 lg:data-[isdesktopsidebaropen=false]:ml-64 transition-all duration-300
        `}
        data-isdesktopsidebaropen={sideBarToggle}
      >
        <Outlet />
      </div>
    </div>
  );
}
