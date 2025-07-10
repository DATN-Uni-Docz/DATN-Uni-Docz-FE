import { Form, FormSpy } from "react-final-form";
import { DatePicker } from "mui-rff";
import { Box, Typography } from "@mui/material";
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { convertToMoney } from "../../../helper";
import ErrorMessage from "../../../components/ErrorMessage/ErrorMessage";

const SubscriptionAnalyticsFormComponent = (props) => {
  const {
    handleSubmit,
    intl,
    values,
    getSubscriptionAnalyticsData,
    analyticsData,
  } = props;
  const { totalSuccessfulSubscriptionsInRange, totalRevenueInRange } =
    analyticsData || {};
  const { revenueStartDate,
    revenueEndDate,
    subscriptionCountStartDate,
    subscriptionCountEndDate,
  } = values || {};

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "30px" }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box sx={{ display: "flex", gap: "30px" }}>
          <Box
            sx={{
              p: 3,
              backgroundColor: "var(--secondaryColor)",
              borderRadius: "10px",
              boxShadow: 2,
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 500, mb: 1 }}>
              {intl.formatMessage({
                id: "SubscriptionAnalyticsForm.revenue.title",
              })}
              <span style={{ color: "var(--primaryColor)" , marginLeft: "6px"}}>
                {convertToMoney(totalRevenueInRange)}
              </span>
            </Typography>
            <Typography variant="body1" sx={{ color: "var(--colorGrey500)" }}>
              {intl.formatMessage({
                id: "SubscriptionAnalyticsForm.revenue.description",
              })}
            </Typography>
            <Box
              sx={{ display: "flex", alignItems: "center", gap: "16px", mt: 3 }}
            >
              <DatePicker label="Start date" name="revenueStartDate" />
              <DatePicker label="End date" name="revenueEndDate" />
            </Box>
            {revenueStartDate > revenueEndDate && (
              <ErrorMessage content={intl.formatMessage({
                id: "SubscriptionAnalyticsForm.dateError",
              })
              }
              />
            )}
          </Box>
          <Box
            sx={{
              p: 3,
              backgroundColor: "var(--secondaryColor)",
              borderRadius: "10px",
              boxShadow: 2,
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 500, mb: 1 }}>
              {intl.formatMessage({
                id: "SubscriptionAnalyticsForm.subscriptionCount.title",
              })}
              <span style={{ color: "var(--primaryColor)" , marginLeft: "6px"}}>
                {totalSuccessfulSubscriptionsInRange}
              </span>
            </Typography>
            <Typography variant="body1" sx={{ color: "var(--colorGrey500)" }}>
              {intl.formatMessage({
                id: "SubscriptionAnalyticsForm.subscriptionCount.description",
              })}
            </Typography>
            <Box
              sx={{ display: "flex", alignItems: "center", gap: "16px", mt: 3 }}
            >
              <DatePicker
                label="Start date"
                name="subscriptionCountStartDate"
              />
              <DatePicker label="End date" name="subscriptionCountEndDate" />
            </Box>
            {subscriptionCountStartDate > subscriptionCountEndDate && (
              <ErrorMessage content={intl.formatMessage({
                id: "SubscriptionAnalyticsForm.dateError",
              })
              }
              />
            )}
          </Box>
        </Box>
        <FormSpy
          subscription={{ values: true }}
          onChange={(props) => {
            getSubscriptionAnalyticsData(props?.values);
          }}
        />
      </LocalizationProvider>
    </form>
  );
};

const SubscriptionAnalyticsForm = (props) => {
  return <Form {...props} component={SubscriptionAnalyticsFormComponent} />;
};

export default SubscriptionAnalyticsForm;
