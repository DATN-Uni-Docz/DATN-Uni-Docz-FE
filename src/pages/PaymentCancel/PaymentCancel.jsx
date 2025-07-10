import { Box, Typography } from "@mui/material";
import queryString from "query-string";
import { useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { cancelSubscription } from "../../api/subscription";
import { toast } from "react-toastify";
import { useIntl } from "react-intl";
import { Cancel } from "@mui/icons-material";
import {
  PrimaryButton,
  PrimaryOutlineButton,
} from "../../components/CustomButton/CustomButton";
import memberRoutes from "../../router/memberRoutes";
import handleError from "../../utils/handleError";

const PaymentCancel = () => {
  const location = useLocation();
  const intl = useIntl();
  const { orderCode, id: paymentLinkId } = useMemo(
    () => queryString.parse(location.search),
    [location.search]
  );

  useEffect(() => {
    const cancelPayment = async () => {
      try {
        await cancelSubscription({
          orderCode,
          paymentLinkId,
        });
      } catch (error) {
        handleError(error);
        toast.error(
          intl.formatMessage({ id: "PaymentCancel.paymentCancelError" })
        );
      }
    };
    cancelPayment();
  }, [orderCode, paymentLinkId, intl]);

  if (!orderCode || !paymentLinkId) return null;

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
      <Cancel sx={{ fontSize: "100px", color: "var(--primaryColor)" }} />
      <Typography
        variant="h4"
        align="center"
        sx={{ color: "var(--primaryColor)" }}
      >
        {intl.formatMessage({ id: "PaymentCancel.title" })}
      </Typography>
      <Typography
        variant="body1"
        align="center"
        sx={{ fontSize: "18px" }}
      >
        {intl.formatMessage({ id: "PaymentCancel.subtitle" })}
      </Typography>
      <Typography variant="body1" align="center">
        {intl.formatMessage({ id: "PaymentCancel.description" })}
      </Typography>
      <Box sx={{ display: "flex", gap: "16px", mt: 2 }}>
        <PrimaryButton>
          <Link
            style={{ color: "var(--colorWhite)" }}
            to={memberRoutes.pricing}
          >
            {intl.formatMessage({ id: "PaymentCancel.backToPricing" })}
          </Link>
        </PrimaryButton>
        <PrimaryOutlineButton>
          <Link style={{ color: "var(--primaryColor)" }} to={memberRoutes.landingPage}>
            {intl.formatMessage({ id: "PaymentCancel.backToHome" })}
          </Link>
        </PrimaryOutlineButton>
      </Box>
    </Box>
  );
};

export default PaymentCancel;
