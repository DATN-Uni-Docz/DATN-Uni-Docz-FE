import { Box, Typography } from "@mui/material";
import { useIntl } from "react-intl";
import { useParams } from "react-router-dom";
import SubscriptionDetailsForm from "./components/SubscriptionDetailsForm.jsx";
import { useEffect, useMemo, useState } from "react";
import handleError from "../../utils/handleError.js";
import { cancelSubscription, getSubscriptionByIdForMember } from "../../api/subscription/index.js";
import { AUTO_CLOSE_TOAST_DURATION, LONG_DATE_FORMAT, SUBSCRIPTION_STATUS } from "../../constants/index.js";
import { toast } from "react-toastify";
import moment from "moment";
import { PrimaryButton } from "../../components/CustomButton/CustomButton.jsx";
import useBoolean from "../../hook/useBoolean.js";
import CustomModal from "../../components/CustomModal/CustomModal.jsx";
import { convertToMoney } from "../../helper/index.js";

const SubscriptionDetails = () => {
  const { subscriptionId } = useParams();
  const [loading, setLoading] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const cancelModal = useBoolean();
  const intl = useIntl();
  const initialValues = useMemo(() => {
    const {
      id,
      amount,
      type,
      createdAt,
      updatedAt,
      startDate,
      endDate,
      orderCode,
      status,
      paymentSuccess,
    } = subscription || {};
    return {
      id,
      amount: convertToMoney(amount),
      type,
      status,
      startDate: intl.formatDate(startDate, LONG_DATE_FORMAT),
      endDate: intl.formatDate(endDate, LONG_DATE_FORMAT),
      orderCode,
      createdAt: intl.formatDate(createdAt, LONG_DATE_FORMAT),
      updatedAt: intl.formatDate(updatedAt, LONG_DATE_FORMAT),
      isValid: status === SUBSCRIPTION_STATUS.SUCCESS && moment(endDate).valueOf() > moment().valueOf() ? "ACTIVE" : "INACTIVE",
      paymentSuccess
    }
  }, [subscription, intl]);

  const fetchSubscriptionData = async () => {
    try {
      setLoading(true);
      const response = await getSubscriptionByIdForMember(subscriptionId);
      if (response) {
        setSubscription(response);
      }
    }
     catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const onCancelSubscription = async () => {
    try {
      const { orderCode, paymentLinkId } = subscription;
      await cancelSubscription({
        orderCode,
        paymentLinkId,
      });
      toast.success(intl.formatMessage({ id: "SubscriptionDetails.cancelSuccess" }), {
        autoClose: AUTO_CLOSE_TOAST_DURATION,
      });
      await fetchSubscriptionData(); 
      cancelModal.setFalse();
    }
    catch (error) {
      handleError(error);
      toast.error(intl.formatMessage({ id: "SubscriptionDetails.cancelError" }), {
        autoClose: AUTO_CLOSE_TOAST_DURATION,
      });
    }
  }

  useEffect(() => {
    fetchSubscriptionData();
  }, [subscriptionId]);

  return (
    <Box>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "500", fontSize: "28px" }}
      >
        {intl.formatMessage({ id: "SubscriptionDetails.title" })}
      </Typography>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ fontWeight: "400", color: "var(--colorGrey400)", mb: 4 }}
      >
        {intl.formatMessage({ id: "SubscriptionDetails.subtitle" })}
      </Typography>
      {!loading && (
        <>
          <SubscriptionDetailsForm
            initialValues={{ ...initialValues }}
            onSubmit={() => {}}
          />
          {![
            SUBSCRIPTION_STATUS.CANCELLED,
            SUBSCRIPTION_STATUS.AUTO_CANCELLED,
          ].includes(subscription?.status) && (
            <Box sx={{ textAlign: "center", mt: 2.5, py: 1.2 }}>
              <PrimaryButton
                fullWidth
                sx={{ maxWidth: "200px" }}
                onClick={cancelModal.setTrue}
              >
                {intl.formatMessage({
                  id: "SubscriptionDetails.cancelButton",
                })}
              </PrimaryButton>
            </Box>
          )}
        </>
      )}
      <CustomModal
        isOpen={cancelModal.value}
        handleClose={cancelModal.setFalse}
        title={intl.formatMessage({
          id: "SubscriptionDetails.cancelModalTitle",
        })}
        handleAction={onCancelSubscription}
      >
        <Typography variant="body1">
          {intl.formatMessage({
            id: "SubscriptionDetails.cancelModalContent",
          })}
        </Typography>
      </CustomModal>
    </Box>
  );
}

export default SubscriptionDetails;