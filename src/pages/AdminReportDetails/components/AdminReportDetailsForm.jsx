import { Form } from "react-final-form";
import { useIntl } from "react-intl";
import { Select, TextField } from "mui-rff";
import css from "../AdminReportDetails.module.css";
import classNames from "classnames";
import CustomInput from "../../../components/CustomInput/CustomInput";
import { MenuItem } from "@mui/material";
import { REPORT_STATUS } from "../../../constants";

const AdminReportDetailsFormComponent = (props) => {
  const {
    handleSubmit,
    className,
    values
  } = props;
  const intl = useIntl();
  const { reporterId, documentId } = values || {};

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      className={classNames(css.formWrapper, className)}
    >
      <CustomInput
        id="id"
        label={intl.formatMessage({
          id: "AdminReportDetailsForm.idLabel",
        })}
      >
        <TextField
          name="id"
          placeholder={intl.formatMessage({
            id: "AdminReportDetailsForm.idPlaceholder",
          })}
          variant="outlined"
          fullWidth
          disabled
        />
      </CustomInput>
      <CustomInput
        id="status"
        label={intl.formatMessage({
          id: "AdminReportDetailsForm.statusLabel",
        })}
      >
        <Select
          name="status"
          placeholder={intl.formatMessage({
            id: "AdminReportDetailsForm.statusPlaceholder",
          })}
          fullWidth
          disabled
        >
          {Object.values(REPORT_STATUS)
            .map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
        </Select>
      </CustomInput>
      <CustomInput 
        id="reportType"
        label={intl.formatMessage({
          id: "AdminReportDetailsForm.reportTypeLabel",
        })}
      >
        <TextField
          name="reportType"
          placeholder={intl.formatMessage({
            id: "AdminReportDetailsForm.reportTypePlaceholder",
          })}
          variant="outlined"
          fullWidth
          disabled
        />
      </CustomInput>
      <CustomInput
        id="documentId"
        label={intl.formatMessage({
          id: "AdminReportDetailsForm.documentIdLabel",
        })}
        href={`/admin/document/${documentId}`}
      >
        <TextField
          name="documentId"
          placeholder={intl.formatMessage({
            id: "AdminReportDetailsForm.documentIdPlaceholder",
          })}
          variant="outlined"
          fullWidth
          disabled
        />
      </CustomInput>
      <CustomInput
        id="reporterId"
        label={intl.formatMessage({
          id: "AdminReportDetailsForm.reporterIdLabel",
        })}
        href={`/admin/user/${reporterId}`}
      >
        <TextField
          name="reporterId"
          placeholder={intl.formatMessage({
            id: "AdminReportDetailsForm.reporterIdPlaceholder",
          })}
          variant="outlined"
          fullWidth
          disabled
        />  
      </CustomInput>
      <CustomInput
        id="content"
        label={intl.formatMessage({
          id: "AdminReportDetailsForm.contentLabel",
        })}
      >
        <TextField
          name="content"
          placeholder={intl.formatMessage({
            id: "AdminReportDetailsForm.contentPlaceholder",
          })}
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          disabled
        />  
      </CustomInput>
      <CustomInput
        id="createdAt"
        label={intl.formatMessage({
          id: "AdminReportDetailsForm.createdAtLabel",
        })}
      >
        <TextField
          name="createdAt"
          placeholder={intl.formatMessage({
            id: "AdminReportDetailsForm.createdAtPlaceholder",
          })}
          variant="outlined"
          fullWidth
          disabled
        />
      </CustomInput>
      <CustomInput
        id="updatedAt"
        label={intl.formatMessage({
          id: "AdminReportDetailsForm.updatedAtLabel",
        })}
      >
        <TextField
          name="updatedAt"
          placeholder={intl.formatMessage({
            id: "AdminReportDetailsForm.updatedAtPlaceholder",
          })}
          variant="outlined"
          fullWidth
          disabled
        />
      </CustomInput>
    </form>
  );
};

const AdminReportDetailsForm = (props) => {
  return (
    <Form
      component={AdminReportDetailsFormComponent}
      {...props}
    />
  );
};

export default AdminReportDetailsForm;
