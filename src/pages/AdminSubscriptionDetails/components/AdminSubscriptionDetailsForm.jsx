import { Form } from "react-final-form";
import { useIntl } from "react-intl";
import { Select, TextField } from "mui-rff";
import css from "../AdminSubscriptionDetails.module.css";
import classNames from "classnames";
import CustomInput from "../../../components/CustomInput/CustomInput";
import { PrimaryButton } from "../../../components/CustomButton/CustomButton";
import { SUBSCRIPTION_STATUS, SUBSCRIPTION_STATUS_NAMES } from "../../../constants";
import { Box, MenuItem, Typography } from "@mui/material";

const AdminSubscriptionDetailsFormComponent = (props) => {
  const { handleSubmit, className, submitting, values } = props;
  const intl = useIntl();
  const { userId, paymentSuccess, validity } = values;

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      className={classNames(css.formWrapper, className)}
    >
      <Box sx={{ display: "flex", gap: "40px" }}>
        <Typography variant="h6" sx={{ marginBottom: "-10px" }}>
          {intl.formatMessage({
            id: "AdminSubscriptionDetailsForm.paymentSuccessLabel",
          })}
          <span style={{ marginLeft: "6px", color: "var(--primaryColor)" }}>
            {paymentSuccess ? "True" : "False"}
          </span>
        </Typography>
        <Typography variant="h6" sx={{ marginBottom: "-10px" }}>
          {intl.formatMessage({
            id: "AdminSubscriptionDetailsForm.validityLabel",
          })}
          <span style={{ marginLeft: "6px", color: "var(--primaryColor)" }}>
            {validity ? "Active" : "Inactive"}
          </span>
        </Typography>
      </Box>

      <div className={css.formSectionWrapper}>
        <CustomInput
          id="id"
          label={intl.formatMessage({
            id: "AdminSubscriptionDetailsForm.idLabel",
          })}
          className={css.formSectionItem}
        >
          <TextField
            name="id"
            placeholder={intl.formatMessage({
              id: "AdminSubscriptionDetailsForm.idPlaceholder",
            })}
            variant="outlined"
            fullWidth
            disabled
          />
        </CustomInput>
        <CustomInput
          id="status"
          label={intl.formatMessage({
            id: "AdminSubscriptionDetailsForm.statusLabel",
          })}
          className={css.formSectionItem}
        >
          <Select
            name="status"
            placeholder={intl.formatMessage({
              id: "AdminUniversityDetailsForm.statusPlaceholder",
            })}
            fullWidth
          >
            {Object.values(SUBSCRIPTION_STATUS).map((status) => (
              <MenuItem
                key={status}
                value={status}
                disabled={[
                  SUBSCRIPTION_STATUS.PENDING,
                  SUBSCRIPTION_STATUS.AUTO_CANCELLED,
                ].includes(status)}
              >
                {SUBSCRIPTION_STATUS_NAMES[status]}
              </MenuItem>
            ))}
          </Select>
        </CustomInput>
      </div>
      <div className={css.formSectionWrapper}>
        <CustomInput
          id="userId"
          label={intl.formatMessage({
            id: "AdminSubscriptionDetailsForm.userIdLabel",
          })}
          className={css.formSectionItem}
          href={`/admin/user/${userId}`}
        >
          <TextField
            name="userId"
            placeholder={intl.formatMessage({
              id: "AdminSubscriptionDetailsForm.userIdPlaceholder",
            })}
            variant="outlined"
            fullWidth
            disabled
          />
        </CustomInput>
        <CustomInput
          id="amount"
          label={intl.formatMessage({
            id: "AdminSubscriptionDetailsForm.amountLabel",
          })}
          className={css.formSectionItem}
        >
          <TextField
            name="amount"
            placeholder={intl.formatMessage({
              id: "AdminSubscriptionDetailsForm.amountPlaceholder",
            })}
            variant="outlined"
            fullWidth
            disabled
          />
        </CustomInput>
      </div>
      <div className={css.formSectionWrapper}>
        <CustomInput
          id="type"
          label={intl.formatMessage({
            id: "AdminSubscriptionDetailsForm.typeLabel",
          })}
          className={css.formSectionItem}
        >
          <TextField
            name="type"
            placeholder={intl.formatMessage({
              id: "AdminSubscriptionDetailsForm.typePlaceholder",
            })}
            variant="outlined"
            fullWidth
            disabled
          />
        </CustomInput>
        <CustomInput
          id="orderCode"
          label={intl.formatMessage({
            id: "AdminSubscriptionDetailsForm.orderCodeLabel",
          })}
          className={css.formSectionItem}
        >
          <TextField
            name="orderCode"
            placeholder={intl.formatMessage({
              id: "AdminSubscriptionDetailsForm.orderCodePlaceholder",
            })}
            variant="outlined"
            fullWidth
            disabled
          />
        </CustomInput>
      </div>

      <div className={css.formSectionWrapper}>
        <CustomInput
          id="startDate"
          label={intl.formatMessage({
            id: "AdminSubscriptionDetailsForm.startDateLabel",
          })}
          className={css.formSectionItem}
        >
          <TextField
            name="startDate"
            placeholder={intl.formatMessage({
              id: "AdminSubscriptionDetailsForm.startDatePlaceholder",
            })}
            variant="outlined"
            fullWidth
            disabled
          />
        </CustomInput>
        <CustomInput
          id="endDate"
          label={intl.formatMessage({
            id: "AdminSubscriptionDetailsForm.endDateLabel",
          })}
          className={css.formSectionItem}
        >
          <TextField
            name="endDate"
            placeholder={intl.formatMessage({
              id: "AdminSubscriptionDetailsForm.endDatePlaceholder",
            })}
            variant="outlined"
            fullWidth
            disabled
          />
        </CustomInput>
      </div>
      <div className={css.formSectionWrapper}>
        <CustomInput
          id="createdAt"
          label={intl.formatMessage({
            id: "AdminSubscriptionDetailsForm.createdAtLabel",
          })}
          className={css.formSectionItem}
        >
          <TextField
            name="createdAt"
            placeholder={intl.formatMessage({
              id: "AdminSubscriptionDetailsForm.createdAtPlaceholder",
            })}
            variant="outlined"
            fullWidth
            disabled
          />
        </CustomInput>
        <CustomInput
          id="updatedAt"
          label={intl.formatMessage({
            id: "AdminSubscriptionDetailsForm.updatedAtLabel",
          })}
          className={css.formSectionItem}
        >
          <TextField
            name="updatedAt"
            placeholder={intl.formatMessage({
              id: "AdminSubscriptionDetailsForm.updatedAtPlaceholder",
            })}
            variant="outlined"
            fullWidth
            disabled
          />
        </CustomInput>
      </div>
      <PrimaryButton
        type="submit"
        fullWidth
        sx={{ mt: 2, py: 1.2, maxWidth: "200px", mx: "auto" }}
        loading={submitting}
      >
        {intl.formatMessage({
          id: "AdminSubscriptionDetailsForm.submitButton",
        })}
      </PrimaryButton>
    </form>
  );
};

const AdminSubscriptionDetailsForm = (props) => {
  return <Form component={AdminSubscriptionDetailsFormComponent} {...props} />;
};

export default AdminSubscriptionDetailsForm;
