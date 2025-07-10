import { Form } from "react-final-form";
import { useIntl } from "react-intl";
import { TextField } from "mui-rff";
import css from "../AdminUserDetails.module.css";
import classNames from "classnames";
import CustomInput from "../../../components/CustomInput/CustomInput";

const AdminUserDetailsFormComponent = (props) => {
  const { handleSubmit, className, values } = props;
  const intl = useIntl();
  const { universityId } = values;

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      className={classNames(css.formWrapper, className)}
    >
      <div className={css.formSectionWrapper}>
        <CustomInput
          id="id"
          label={intl.formatMessage({
            id: "AdminUserDetailsForm.idLabel",
          })}
          className={css.formSectionItem}
        >
          <TextField
            name="id"
            placeholder={intl.formatMessage({
              id: "AdminUserDetailsForm.idPlaceholder",
            })}
            variant="outlined"
            fullWidth
            disabled
          />
        </CustomInput>
        <CustomInput
          id="status"
          label={intl.formatMessage({
            id: "AdminUserDetailsForm.statusLabel",
          })}
          className={css.formSectionItem}
        >
          <TextField
            name="status"
            placeholder={intl.formatMessage({
              id: "AdminUserDetailsForm.statusPlaceholder",
            })}
            variant="outlined"
            fullWidth
            disabled
          />
        </CustomInput>
      </div>
      <div className={css.formSectionWrapper}>
        <CustomInput
          id="email"
          label={intl.formatMessage({
            id: "AdminUserDetailsForm.emailLabel",
          })}
          className={css.formSectionItem}
        >
          <TextField
            name="email"
            placeholder={intl.formatMessage({
              id: "AdminUserDetailsForm.emailPlaceholder",
            })}
            variant="outlined"
            fullWidth
            disabled
          />
        </CustomInput>
        <CustomInput
          id="documentCount"
          label={intl.formatMessage({
            id: "AdminUserDetailsForm.documentCountLabel",
          })}
          className={css.formSectionItem}
        >
          <TextField
            name="documentCount"
            placeholder={intl.formatMessage({
              id: "AdminUserDetailsForm.documentCountPlaceholder",
            })}
            variant="outlined"
            fullWidth
            disabled
          />
        </CustomInput>
      </div>
      <div className={css.formSectionWrapper}>
        <CustomInput
          id="firstName"
          label={intl.formatMessage({
            id: "AdminUserDetailsForm.firstNameLabel",
          })}
          className={css.formSectionItem}
        >
          <TextField
            name="firstName"
            placeholder={intl.formatMessage({
              id: "AdminUserDetailsForm.firstNamePlaceholder",
            })}
            variant="outlined"
            fullWidth
            disabled
          />
        </CustomInput>
        <CustomInput
          id="lastName"
          label={intl.formatMessage({
            id: "AdminUserDetailsForm.lastNameLabel",
          })}
          className={css.formSectionItem}
        >
          <TextField
            name="lastName"
            placeholder={intl.formatMessage({
              id: "AdminUserDetailsForm.lastNamePlaceholder",
            })}
            variant="outlined"
            fullWidth
            disabled
          />
        </CustomInput>
      </div>
      <div className={css.formSectionWrapper}>
        <CustomInput
          id="universityId"
          label={intl.formatMessage({
            id: "AdminUserDetailsForm.universityIdLabel",
          })}
          href={`/admin/university/${universityId}`}
          className={css.formSectionItem}
        >
          <TextField
            name="universityId"
            placeholder={intl.formatMessage({
              id: "AdminUserDetailsForm.universityIdPlaceholder",
            })}
            variant="outlined"
            fullWidth
            disabled
          />
        </CustomInput>
        <CustomInput
          id="universityName"
          label={intl.formatMessage({
            id: "AdminUserDetailsForm.universityNameLabel",
          })}
          className={css.formSectionItem}
        >
          <TextField
            name="universityName"
            placeholder={intl.formatMessage({
              id: "AdminUserDetailsForm.universityNamePlaceholder",
            })}
            variant="outlined"
            fullWidth
            disabled
          />
        </CustomInput>
      </div>
      <div className={css.formSectionWrapper}>
        <CustomInput
          id="updatedAt"
          label={intl.formatMessage({
            id: "AdminUserDetailsForm.updatedAtLabel",
          })}
          className={css.formSectionItem}
        >
          <TextField
            name="updatedAt"
            placeholder={intl.formatMessage({
              id: "AdminUserDetailsForm.updatedAtPlaceholder",
            })}
            variant="outlined"
            fullWidth
            disabled
          />
        </CustomInput>
        <CustomInput
          id="createdAt"
          label={intl.formatMessage({
            id: "AdminUserDetailsForm.createdAtLabel",
          })}
          className={css.formSectionItem}
        >
          <TextField
            name="createdAt"
            placeholder={intl.formatMessage({
              id: "AdminUserDetailsForm.createdAtPlaceholder",
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

const AdminUserDetailsForm = (props) => {
  return <Form component={AdminUserDetailsFormComponent} {...props} />;
};

export default AdminUserDetailsForm;
