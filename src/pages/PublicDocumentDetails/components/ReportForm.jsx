import { Form } from "react-final-form";
import CustomInput from "../../../components/CustomInput/CustomInput";
import css from "../PublicDocumentDetails.module.css";
import { Radios, TextField } from "mui-rff";
import { composeValidators, maxLength, required } from "../../../utils/validator";
import { OTHER } from "../../../constants";
import { PrimaryButton } from "../../../components/CustomButton/CustomButton";

const MAX_LENGTH_TEXT_FIELD = 50;

const ReportFormComponent = (props) => {
  const { handleSubmit, intl, values, reportTypeConfigs = [] } = props;
  const { reportType } = values;

  return (
    <form onSubmit={handleSubmit} className={css.formWrapper}>
      <Radios
        name="reportType"
        data={reportTypeConfigs.map(({ key, value }) => ({
          value: key,
          label: value,
        }))}
        fieldProps={{
          validate: required(
            intl.formatMessage({
              id: "PublicDocumentDetails.reportForm.requiredField",
            })
          ),
        }}
      />
      {reportType === OTHER && (
        <TextField
          label={intl.formatMessage({
            id: "PublicDocumentDetails.reportForm.reasonLabel",
          })}
          name="reason"
          placeholder={intl.formatMessage({
            id: "PublicDocumentDetails.reportForm.reasonPlaceholder",
          })}
          variant="outlined"
          fullWidth
          fieldProps={{
            validate: composeValidators(
              required(
                intl.formatMessage({
                  id: "PublicDocumentDetails.reportForm.requiredField",
                })
              ),
              maxLength(
                intl.formatMessage(
                  {
                    id: "PublicDocumentDetails.reportForm.maxLength",
                  },
                  {
                    maxLength: MAX_LENGTH_TEXT_FIELD,
                  }
                ),
                MAX_LENGTH_TEXT_FIELD
              )
            ),
          }}
          autoComplete="off"
          multiline
          rows={4}
        />
      )}
      <PrimaryButton type="submit" fullWidth sx={{ mt: 2, py: 1 }}>
        {intl.formatMessage({
          id: "PublicDocumentDetails.reportForm.submitButton",
        })}
      </PrimaryButton>
    </form>
  );
};

const ReportForm = (props) => {
  return <Form {...props} component={ReportFormComponent} />;
};

export default ReportForm;
