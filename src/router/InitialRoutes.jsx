import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { handleGetUserInfo } from "../api/user";
import authSlice from "../redux/slice/authSlice";
import { userInfoSelector } from "../redux/selector";
import { MEMBER } from "../constants";

const InitialRoutes = () => {
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("accessToken");
  const [isLoading, setLoading] = useState(true);
  const userInfo = useSelector(userInfoSelector);
  const location = useLocation();
  
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const res = await handleGetUserInfo();
        dispatch(
          authSlice.actions.setAuthInfo({
            isAuthenticated: true,
            userInfo: res,
          })
        );

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (accessToken) {
      getUserInfo();
    } else setLoading(false);
  }, [accessToken, dispatch]);

  if (isLoading) return null;

  const shouldRedirectToOnboarding =
    userInfo &&
    userInfo.role === MEMBER &&
    (userInfo.universityId === null || userInfo.universityId === undefined);

  if (shouldRedirectToOnboarding && !location.pathname.startsWith("/onboarding")) {
    return <Navigate to="/onboarding" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default InitialRoutes;