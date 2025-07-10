import { handleLogin } from "../../api/user";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import authSlice from "../../redux/slice/authSlice";
import { Box, Typography } from "@mui/material";
import { ADMIN, MEMBER } from "../../constants";
import handleError from "../../utils/handleError";
import { useIntl } from "react-intl";
import LoginForm from "./components/LoginForm";
import BannerPanel from "../../components/BannerPanel/BannerPanel";
import { roleSelector } from "../../redux/selector";
import { toast } from "react-toastify";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const intl = useIntl();
  const userRole = useSelector(roleSelector);
  const accessToken = localStorage.getItem("accessToken");
  const location = useLocation();

  if (accessToken && userRole) {
    if (userRole === ADMIN)
      return <Navigate to="/admin" replace state={{ from: location }} />;
    if (userRole === MEMBER)
      return <Navigate to="/" replace state={{ from: location }} />;
  }

  const onSubmit = async (values) => {
    try {
      const { email, password } = values;
      const res = await handleLogin(email.trim(), password.trim());
      const { tokens, user } = res;
      dispatch(
        authSlice.actions.setAuthInfo({
          isAuthenticated: true,
          userInfo: user,
        })
      );
      localStorage.setItem("accessToken", tokens?.access?.token);
      localStorage.setItem("refreshToken", tokens?.refresh?.token);

      return user.role === ADMIN ? navigate("/admin") : navigate("/");
    } catch (err) {
      handleError(err);
      toast.error(
        intl.formatMessage({ id: "LoginPage.errorMessage" }
      ));
    }
  };

  return (
    <BannerPanel>
      <Box
        sx={{
          width: "30%",
          minWidth: "340px",
          maxWidth: "450px",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translateY(-50%) translateX(-50%)",
          p: 4,
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: "white",
        }}
        autoComplete="off"
      >
        <Typography variant="h5" align="center" sx={{ mb: 2 }}>
          {intl.formatMessage({ id: "LoginPage.title" })}
        </Typography>

        <LoginForm onSubmit={onSubmit} />
      </Box>
    </BannerPanel>
  );
}

export default Login;
