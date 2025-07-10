import { Box, Typography } from "@mui/material";
import { useIntl } from "react-intl";
import { useParams } from "react-router-dom";
import AdminSubscriptionDetailsForm from "./components/AdminSubscriptionDetailsForm.jsx";
import { useEffect, useMemo, useState } from "react";
import handleError from "../../utils/handleError.js";
import { getSubscriptionById, updateSubscription } from "../../api/subscription/index.js";
import { AUTO_CLOSE_TOAST_DURATION, LONG_DATE_FORMAT, SUBSCRIPTION_STATUS } from "../../constants/index.js";
import { toast } from "react-toastify";
import { convertToMoney } from "../../helper";
import moment from "moment";

const AdminSubscriptionDetails = () => {
  const { subscriptionId } = useParams();
  const [loading, setLoading] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const intl = useIntl();
  const initialValues = useMemo(() => {
    const {
      id,
      userId,
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
      userId,
      amount: convertToMoney(amount),
      type,
      status,
      startDate: intl.formatDate(startDate, LONG_DATE_FORMAT),
      endDate: intl.formatDate(endDate, LONG_DATE_FORMAT),
      orderCode,
      createdAt: intl.formatDate(createdAt, LONG_DATE_FORMAT),
      updatedAt: intl.formatDate(updatedAt, LONG_DATE_FORMAT),
      paymentSuccess,
      validity: moment(endDate)?.valueOf() > Date.now() && status === SUBSCRIPTION_STATUS.SUCCESS
    }
  }, [subscription, intl]);

  const fetchSubscriptionData = async () => {
    try {
      setLoading(true);
      const response = await getSubscriptionById(subscriptionId);
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

  const handleUpdateSubscriptionStatus = async (values) => {
    const {status} = values;
    try {
      const response = await updateSubscription(subscriptionId, {
        status,
      });
      if (response) {
        setSubscription(response);
        toast.success(intl.formatMessage({ id: "AdminSubscriptionDetails.updateSuccess" }), {
          autoClose: AUTO_CLOSE_TOAST_DURATION,
        });
      }
      await fetchSubscriptionData(); // Refresh subscription data after update
    } catch (error) {
      handleError(error);
      toast.error(intl.formatMessage({ id: "AdminSubscriptionDetails.errorMessage" }), {
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
        {intl.formatMessage({ id: "AdminSubscriptionDetails.title" })}
      </Typography>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ fontWeight: "400", color: "var(--colorGrey400)", mb: 4 }}
      >
        {intl.formatMessage({ id: "AdminSubscriptionDetails.subtitle" })}
      </Typography>
      {!loading && (
        <AdminSubscriptionDetailsForm
          initialValues={{ ...initialValues }}
          onSubmit={handleUpdateSubscriptionStatus}
        />
      )}
    </Box>
  );
}

export default AdminSubscriptionDetails;