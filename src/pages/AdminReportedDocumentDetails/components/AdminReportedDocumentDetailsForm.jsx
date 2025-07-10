import { Form } from "react-final-form";
import { useIntl } from "react-intl";
import { TextField } from "mui-rff";
import css from "../AdminReportedDocumentDetails.module.css";
import classNames from "classnames";
import CustomInput from "../../../components/CustomInput/CustomInput";

const AdminReportedDocumentDetailsFormComponent = (props) => {
  const {
    handleSubmit,
    className,
    values
  } = props;
  const intl = useIntl();
  const { id } = values || {};

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      className={classNames(css.formWrapper, className)}
    >
      <CustomInput
        id="id"
        label={intl.formatMessage({
          id: "AdminReportedDocumentDetailsForm.idLabel",
        })}
        href={`/admin/document/${id}`}
      >
        <TextField
          name="id"
          placeholder={intl.formatMessage({
            id: "AdminReportedDocumentDetailsForm.idPlaceholder",
          })}
          variant="outlined"
          fullWidth
          disabled
        />
      </CustomInput>
      <CustomInput
        id="status"
        label={intl.formatMessage({
          id: "AdminReportedDocumentDetailsForm.statusLabel",
        })}
      >
        <TextField
          name="status"
          placeholder={intl.formatMessage({
            id: "AdminReportedDocumentDetailsForm.statusPlaceholder",
          })}
          variant="outlined"
          fullWidth
          disabled
        />
      </CustomInput>
      <CustomInput 
        id="title"
        label={intl.formatMessage({
          id: "AdminReportedDocumentDetailsForm.titleLabel",
        })}
      >
        <TextField
          name="title"
          placeholder={intl.formatMessage({
            id: "AdminReportedDocumentDetailsForm.titlePlaceholder",
          })}
          variant="outlined"
          fullWidth
          disabled
        />
      </CustomInput>
    </form>
  );
};

const AdminReportedDocumentDetailsForm = (props) => {
  return (
    <Form
      component={AdminReportedDocumentDetailsFormComponent}
      {...props}
    />
  );
};

export default AdminReportedDocumentDetailsForm;
