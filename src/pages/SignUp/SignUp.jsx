import { handleSignUp } from "../../api/user";
import { toast } from "react-toastify";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { useIntl } from "react-intl";
import SignUpForm from "./components/SignUpForm";
import BannerPanel from "../../components/BannerPanel/BannerPanel";
import { useSelector } from "react-redux";
import { roleSelector } from "../../redux/selector";
import { ADMIN, MEMBER } from "../../constants";

const SignUp = () => {
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
      const response = await handleSignUp(values);
      if (response) {
        toast.success(intl.formatMessage({ id: "SignUpPage.successMessage" }));
        navigate("/login");
      }
    } catch (error) {
      switch (error.response.status) {
        case 400:
          toast.error("Bad request!");
          break;
        case 409:
          toast.error("Email already exists!");
          break;
        default:
          toast.error("Sign up failed!");
          break;
      }
    }
  };

  return (
    <BannerPanel>
      <Box
        sx={{
          width: "50%",
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
          {intl.formatMessage({ id: "SignUpPage.title" })}
        </Typography>

        <SignUpForm onSubmit={onSubmit} />
      </Box>
    </BannerPanel>
  );
};
export default SignUp;
