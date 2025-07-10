import { Box, Typography } from "@mui/material";
import { useIntl } from "react-intl";
import { PrimaryButton, PrimaryOutlineButton } from "../../components/CustomButton/CustomButton";
import { Link } from "react-router-dom";
import memberRoutes from "../../router/memberRoutes";
import { CheckCircle } from "@mui/icons-material";

const PaymentSuccess = () => {
  const intl = useIntl();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
        backgroundColor: "var(--secondaryColor)",
        height: 'calc(100vh - var(--navbarHeight))'
      }}
    >
      <CheckCircle sx={{ fontSize: "100px", color: "var(--primaryColor)" }} />
      <Typography
        variant="h4"
        align="center"
        sx={{ color: "var(--primaryColor)" }}
      >
        {intl.formatMessage({ id: "PaymentSuccess.title" })}
      </Typography>
      <Typography
        variant="body1"
        align="center"
        sx={{ fontSize: "18px" }}
      >
        {intl.formatMessage({ id: "PaymentSuccess.subtitle" })}
      </Typography>
      <Typography variant="body1" align="center">
        {intl.formatMessage({ id: "PaymentSuccess.description" })}
      </Typography>
      <Box sx={{ display: "flex", gap: "16px", mt: 2 }}>
        <PrimaryButton>
          <Link
            style={{ color: "var(--colorWhite)" }}
            to={memberRoutes.subscription}
          >
            {intl.formatMessage({ id: "PaymentSuccess.backToSubscriptions" })}
          </Link>
        </PrimaryButton>
        <PrimaryOutlineButton>
          <Link style={{ color: "var(--primaryColor)" }} to={memberRoutes.landingPage}>
            {intl.formatMessage({ id: "PaymentSuccess.backToHome" })}
          </Link>
        </PrimaryOutlineButton>
      </Box>
    </Box>
  );
}

export default PaymentSuccess;