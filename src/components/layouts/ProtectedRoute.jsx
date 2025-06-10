import { Navigate, Outlet } from "react-router-dom";
import SessionTimeout from "../SessionTimeout";

const ProtectedRoute = () => {
  const token = localStorage.getItem("x-auth-token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      {/* <SessionTimeout /> */}
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
