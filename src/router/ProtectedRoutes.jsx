import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({allowRoles}) => {
  const accessToken = localStorage.getItem("accessToken");
  const userInfo = useSelector((state) => state.auth.userInfo);
  const userRole = userInfo?.role;

  if (!accessToken || !userInfo) {
    return <Navigate to="/login" replace />;
  }
  if (!allowRoles?.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;