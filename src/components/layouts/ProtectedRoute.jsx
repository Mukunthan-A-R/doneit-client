import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import ErrorHandler from "../ErrorHandler";

const ProtectedRoute = () => {
  const { isLoading, error, user } = useAuth();

  if (isLoading)
    return (
      <div className="w-full h-full flex-1 flex flex-col items-center justify-center gap-3">
        <img
          src="/SandySoft.png"
          alt="Done It"
          className="w-44 h-auto animate-fade-in"
        />
        <h1 className="text-xl animate-pulse text-blue-700 font-bold">
          Loading application...
        </h1>
      </div>
    );

  if (error && !user.requireLogin) return <ErrorHandler error={error} />;

  return user.requireLogin ? <Navigate to="/login" replace /> : <Outlet />;
};

export default ProtectedRoute;
