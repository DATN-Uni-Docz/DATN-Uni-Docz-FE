import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { Box, Divider, Typography } from "@mui/material";
import { useIntl } from "react-intl";
import { AccessTime, CalendarMonth, Check } from "@mui/icons-material";
import { SUBSCRIPTION_PLANS } from "../../constants";
import CustomModal from "../../components/CustomModal/CustomModal";
import useBoolean from "../../hook/useBoolean";
import css from "./Payment.module.css";
import { createPaymentLink } from "../../api/subscription";
import moment from "moment";
import { PrimaryButton } from "../../components/CustomButton/CustomButton";
import { convertToMoney } from "../../helper";

const feature1 = "Access to all basic features";
const feature2 = "Email support";
const feature3 = "24/7 customer support";
const feature4 = "Early access to new features";
const feature5 = "Advanced search filters";
const feature6 = "Ad-free experience";

const featureList = [
  feature1,
  feature2,
  feature3,
  feature4,
  feature5,
  feature6,
];

const featureOnType = {
  BASIC: [feature1, feature2, feature3],
  STANDARD: [feature1, feature2, feature3, feature4],
  PREMIUM: [feature1, feature2, feature3, feature4, feature5, feature6],
};

const SUBSCRIPTION_PLAN_NAMES = {
  basic: "BASIC",
  standard: "STANDARD",
  premium: "PREMIUM",
};

const Payment = () => {
  const { type } = useParams();
  const planType = SUBSCRIPTION_PLAN_NAMES[type];
  const { price, duration, unit } = SUBSCRIPTION_PLANS[planType] || {};
  const intl = useIntl();
  const paymentConfirmModal = useBoolean();

  const openPaymentConfirmModal = () => {
    paymentConfirmModal.setTrue();
  };

  const handleCreatePaymentLink = async () => {
    try {
      paymentConfirmModal.setFalse();
      const checkoutResponse = await createPaymentLink({
        type: planType,
      });
      window.location.href = checkoutResponse.checkoutUrl;
      // window.open(checkoutResponse.checkoutUrl, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error("Error creating payment link:", error);
      toast.error(intl.formatMessage({ id: "PaymentPage.paymentError" }));
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "var(--secondaryColor)",
        py: 4,
        minHeight: 'calc(100vh - var(--navbarHeight))'
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          py: 2,
        }}
      >
        <Typography variant="h3" sx={{ mb: 2, fontWeight: 500 }}>
          {intl.formatMessage({ id: "PaymentPage.title" })}
        </Typography>
        <Typography
          variant="body1"
          sx={{ mb: 2, fontSize: "20px", color: "var(--colorGrey400)" }}
        >
          {intl.formatMessage({ id: "PaymentPage.subtitle" })}
        </Typography>
      </Box>
      <Box
        sx={{
          padding: "30px",
          boxShadow: 2,
          maxWidth: "500px",
          backgroundColor: "var(--colorWhite)",
          borderRadius: "10px",
          mx: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 500 }}>
              {intl.formatMessage(
                { id: "PaymentPage.planTitle" },
                {
                  planType:
                    planType.charAt(0).toUpperCase() +
                    planType.slice(1).toLowerCase(),
                }
              )}
            </Typography>
            <Typography
              variant="body1"
              sx={{ mt: 1, color: "var(--colorGrey500)" }}
            >
              {intl.formatMessage(
                { id: "PaymentPage.planDuration" },
                { duration, unit }
              )}
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: "var(--primaryColor)",
              color: "var(--colorWhite)",
              py: 1,
              px: 2,
              width: "fit-content",
              borderRadius: "10px",
              textAlign: "center",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 500 }}>
              {convertToMoney(price)}
            </Typography>
            <Typography variant="body1">
              {intl.formatMessage(
                { id: "PaymentPage.pricingPerDay" },
                {
                  pricePerDay: convertToMoney(price / (duration * 30)),
                }
              )}
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ backgroundColor: "var(--primaryColor)", my: 3 }} />
        <Box sx={{ display: "flex", gap: "20px" }}>
          <Box sx={{ display: "flex" }}>
            <CalendarMonth sx={{ color: "var(--primaryColor)" }} />
            <Box sx={{ marginLeft: "10px" }}>
              <Typography variant="body1" sx={{ color: "var(--colorGrey500)" }}>
                {intl.formatMessage({
                  id: "PaymentPage.startDate",
                })}
              </Typography>
              <Typography variant="body1" sx={{ fontSize: "18px" }}>
                {intl.formatDate(new Date(), {
                  year: "numeric",
                  month: "long",
                  day: "2-digit",
                })}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex" }}>
            <AccessTime sx={{ color: "var(--primaryColor)" }} />
            <Box sx={{ marginLeft: "10px" }}>
              <Typography variant="body1" sx={{ color: "var(--colorGrey500)" }}>
                {intl.formatMessage({
                  id: "PaymentPage.endDate",
                })}
              </Typography>
              <Typography variant="body1" sx={{ fontSize: "18px" }}>
                {intl.formatDate(moment().add(duration, unit), {
                  year: "numeric",
                  month: "long",
                  day: "2-digit",
                })}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 500 }}>
            {intl.formatMessage({ id: "PaymentPage.featuresTitle" })}
          </Typography>
          <Box
            sx={{
              mt: 2,
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            {featureList.map((feature, index) =>
              featureOnType[planType]?.includes(feature) ? (
                <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
                  <Check color="primary" />
                  <Typography variant="body1" sx={{ ml: 1 }}>
                    {feature}
                  </Typography>
                </Box>
              ) : null
            )}
          </Box>
        </Box>
        <Divider sx={{ backgroundColor: "var(--primaryColor)", my: 3 }} />
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 500 }}>
            {intl.formatMessage({ id: "PaymentPage.totalPriceLabel" })}
          </Typography>
          <Typography variant="h5" sx={{ color: "var(--primaryColor)" }}>
            {convertToMoney(price)}
          </Typography>
        </Box>
        <Typography
          variant="body1"
          sx={{ mt: 1, color: "var(--colorGrey500)" }}
        >
          {intl.formatMessage({ id: "PaymentPage.note" })}
        </Typography>
        <PrimaryButton
          onClick={() => openPaymentConfirmModal(planType)}
          sx={{ mt: 3, textAlign: "center", width: "100%" }}
        >
          {intl.formatMessage({ id: "PaymentPage.makePaymentButton" })}
        </PrimaryButton>
        <CustomModal
          isOpen={paymentConfirmModal.value}
          handleClose={paymentConfirmModal.setFalse}
          title={intl.formatMessage({
            id: "PaymentPage.paymentConfirmModalTitle",
          })}
          handleAction={() => handleCreatePaymentLink(planType)}
        >
          <Typography variant="body1">
            {intl.formatMessage(
              {
                id: "PaymentPage.paymentConfirmModalContent",
              },
              {
                planName: <span className={css.active}>{planType}</span>,
              }
            )}
          </Typography>
        </CustomModal>
      </Box>
    </Box>
  );
};
export default Payment;
