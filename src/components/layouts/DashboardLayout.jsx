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
        {/* Side bar Toggle button for desktop */}
        <button
          className="p-2 md:flex hidden bg-white absolute -right-11 hover:bg-blue-600 hover:border-blue-600 hover:text-white transition rounded-lg cursor-pointer text-blue-900 border-[1px] border-gray-200 shadow-[0_0_10px_rgba(0,0,0,0.1)] top-14"
          onClick={() => setSideBarToggle((prev) => !prev)}
        >
          {sideBarToggle ? (
            <GoSidebarCollapse size={20} />
          ) : (
            <GoSidebarExpand size={20} />
          )}
        </button>

        {/* Side bar toggle for mobile */}
        <button
          className="absolute -right-12 top-15 block transition lg:hidden bg-blue-800 text-white p-2.5 rounded shadow-md focus:outline-none z-30"
          onClick={() => setIsSidebarOpen((prev) => !prev)}
          data-isopen={isSidebarOpen}
        >
          {isSidebarOpen ? (
            <svg
              className="size-5"
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
          ) : (
            <span className="flex items-center">
              <svg
                className="size-5"
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
            </span>
          )}
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
