import { Form } from "react-final-form";
import { useIntl } from "react-intl";
import { TextField } from "mui-rff";
import css from "../SubscriptionDetails.module.css";
import classNames from "classnames";
import CustomInput from "../../../components/CustomInput/CustomInput";
import { Typography } from "@mui/material";

const SubscriptionDetailsFormComponent = (props) => {
  const { handleSubmit, className, submitting, values } = props;
  const intl = useIntl();
  const { paymentSuccess } = values;
  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      className={classNames(css.formWrapper, className)}
    >
      <Typography variant="h6" sx={{marginBottom: "-10px"}}>
        {intl.formatMessage({
          id: "AdminSubscriptionDetailsForm.paymentSuccessLabel",
        })}
        <span style={{marginLeft: "10px", color: 'var(--primaryColor)'}}>
        {paymentSuccess ? "true" : "false"}
        </span>
      </Typography>
      <div className={css.formSectionWrapper}>
        <CustomInput
          id="id"
          label={intl.formatMessage({
            id: "SubscriptionDetailsForm.idLabel",
          })}
          className={css.formSectionItem}
        >
          <TextField
            name="id"
            placeholder={intl.formatMessage({
              id: "SubscriptionDetailsForm.idPlaceholder",
            })}
            variant="outlined"
            fullWidth
            disabled
          />
        </CustomInput>
        <CustomInput
          id="status"
          label={intl.formatMessage({
            id: "SubscriptionDetailsForm.statusLabel",
          })}
          className={css.formSectionItem}
        >
          <TextField
            name="status"
            placeholder={intl.formatMessage({
              id: "SubscriptionDetailsForm.statusPlaceholder",
            })}
            variant="outlined"
            fullWidth
            disabled
          />
        </CustomInput>
      </div>
      <div className={css.formSectionWrapper}>
        <CustomInput
          id="isValid"
          label={intl.formatMessage({
            id: "SubscriptionDetailsForm.isValidLabel",
          })}
          className={css.formSectionItem}
        >
          <TextField
            name="isValid"
            placeholder={intl.formatMessage({
              id: "SubscriptionDetailsForm.isValidPlaceholder",
            })}
            variant="outlined"
            fullWidth
            disabled
          />
        </CustomInput>
        <CustomInput
          id="amount"
          label={intl.formatMessage({
            id: "SubscriptionDetailsForm.amountLabel",
          })}
          className={css.formSectionItem}
        >
          <TextField
            name="amount"
            placeholder={intl.formatMessage({
              id: "SubscriptionDetailsForm.amountPlaceholder",
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
            id: "SubscriptionDetailsForm.typeLabel",
          })}
          className={css.formSectionItem}
        >
          <TextField
            name="type"
            placeholder={intl.formatMessage({
              id: "SubscriptionDetailsForm.typePlaceholder",
            })}
            variant="outlined"
            fullWidth
            disabled
          />
        </CustomInput>
        <CustomInput
          id="orderCode"
          label={intl.formatMessage({
            id: "SubscriptionDetailsForm.orderCodeLabel",
          })}
          className={css.formSectionItem}
        >
          <TextField
            name="orderCode"
            placeholder={intl.formatMessage({
              id: "SubscriptionDetailsForm.orderCodePlaceholder",
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
            id: "SubscriptionDetailsForm.startDateLabel",
          })}
          className={css.formSectionItem}
        >
          <TextField
            name="startDate"
            placeholder={intl.formatMessage({
              id: "SubscriptionDetailsForm.startDatePlaceholder",
            })}
            variant="outlined"
            fullWidth
            disabled
          />
        </CustomInput>
        <CustomInput
          id="endDate"
          label={intl.formatMessage({
            id: "SubscriptionDetailsForm.endDateLabel",
          })}
          className={css.formSectionItem}
        >
          <TextField
            name="endDate"
            placeholder={intl.formatMessage({
              id: "SubscriptionDetailsForm.endDatePlaceholder",
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
            id: "SubscriptionDetailsForm.createdAtLabel",
          })}
          className={css.formSectionItem}
        >
          <TextField
            name="createdAt"
            placeholder={intl.formatMessage({
              id: "SubscriptionDetailsForm.createdAtPlaceholder",
            })}
            variant="outlined"
            fullWidth
            disabled
          />
        </CustomInput>
        <CustomInput
          id="updatedAt"
          label={intl.formatMessage({
            id: "SubscriptionDetailsForm.updatedAtLabel",
          })}
          className={css.formSectionItem}
        >
          <TextField
            name="updatedAt"
            placeholder={intl.formatMessage({
              id: "SubscriptionDetailsForm.updatedAtPlaceholder",
            })}
            variant="outlined"
            fullWidth
            disabled
          />
        </CustomInput>
      </div>
    </form>
  );
};

const SubscriptionDetailsForm = (props) => {
  return <Form component={SubscriptionDetailsFormComponent} {...props} />;
};

export default SubscriptionDetailsForm;
