import { Box, Typography } from "@mui/material";
import { useIntl } from "react-intl";
import { handleChangePassword } from "../../api/personal";
import { toast } from "react-toastify";
import { AUTO_CLOSE_TOAST_DURATION } from "../../constants";
import handleError, { getError } from "../../utils/handleError";
import ChangePasswordForm from "./components/ChangePasswordForm";

const ChangePassword = () => {
  const intl = useIntl();
  
  const changePassword = async (values) => {
    try {
      const { oldPassword, password, confirmPassword } = values || {};
      await handleChangePassword(
        { oldPassword, password, confirmPassword }
      )
      toast.success(intl.formatMessage({ id: "ChangePasswordPage.updateSuccess" }), {
        autoClose: AUTO_CLOSE_TOAST_DURATION,
      });
    }
    catch (error) {
      toast.error(
        getError(error),
        {
          autoClose: AUTO_CLOSE_TOAST_DURATION,
        }
      )
      handleError(error);
    }
  }

  return (
    <Box>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "500", fontSize: "28px" }}
      >
        {intl.formatMessage({ id: "ChangePasswordPage.title" })}
      </Typography>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ fontWeight: "400", color: "var(--colorGrey400)" }}
      >
        {intl.formatMessage({ id: "ChangePasswordPage.subtitle" })}
      </Typography>
      <Box
        sx={{
          boxShadow: 1,
          borderRadius: 3,
          height: "100%",
          padding: "30px",
          backgroundColor: "var(--colorWhite)",
          marginTop: "20px",
        }}
      >
        <ChangePasswordForm
          onSubmit={changePassword}
        />
      </Box>
    </Box>
  );
}

export default ChangePassword;