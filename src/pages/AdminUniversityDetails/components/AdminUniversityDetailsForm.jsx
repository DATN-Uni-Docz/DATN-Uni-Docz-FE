import { Form } from "react-final-form";
import { useIntl } from "react-intl";
import {
  composeValidators,
  maxLength,
  required,
} from "../../../utils/validator";
import { Select, TextField } from "mui-rff";
import css from "../AdminUniversityDetails.module.css";
import classNames from "classnames";
import CustomInput from "../../../components/CustomInput/CustomInput";
import ErrorMessage from "../../../components/ErrorMessage/ErrorMessage";
import { PrimaryButton } from "../../../components/CustomButton/CustomButton";
import { MenuItem } from "@mui/material";
import { UNIVERSITY_STATUS } from "../../../constants";

const MAX_LENGTH = 50;

const AdminUniversityDetailsFormComponent = (props) => {
  const {
    handleSubmit,
    submitting,
    errorMessage,
    className,
  } = props;
  const intl = useIntl();

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
            id: "AdminUniversityDetailsForm.idLabel",
          })}
          className={css.formSectionItem}
        >
          <TextField
            name="id"
            placeholder={intl.formatMessage({
              id: "AdminUniversityDetailsForm.idPlaceholder",
            })}
            variant="outlined"
            fullWidth
            disabled
          />
        </CustomInput>
        <CustomInput
          id="status"
          label={intl.formatMessage({
            id: "AdminUniversityDetailsForm.statusLabel",
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
            {Object.values(UNIVERSITY_STATUS).map((status) => (
              <MenuItem
                key={status}
                value={status}
                disabled={[
                  UNIVERSITY_STATUS.PENDING,
                ].includes(status)}
              >
                {status}
              </MenuItem>
            ))}
          </Select>
        </CustomInput>
      </div>
      <div className={css.formSectionWrapper}>
        <CustomInput
          id="name"
          label={intl.formatMessage({
            id: "AdminUniversityDetailsForm.nameLabel",
          })}
          className={css.formSectionItem}
        >
          <TextField
            name="name"
            placeholder={intl.formatMessage({
              id: "AdminUniversityDetailsForm.namePlaceholder",
            })}
            variant="outlined"
            fullWidth
            fieldProps={{
              validate: composeValidators(
                required(
                  intl.formatMessage({
                    id: "AdminUniversityDetailsForm.requiredField",
                  })
                ),
                maxLength(
                  intl.formatMessage(
                    {
                      id: "AdminUniversityDetailsForm.maxLength",
                    },
                    {
                      maxLength: MAX_LENGTH,
                    }
                  ),
                  100
                )
              ),
            }}
          />
        </CustomInput>
        <CustomInput
          id="nameEn"
          label={intl.formatMessage({
            id: "AdminUniversityDetailsForm.nameEnLabel",
          })}
          className={css.formSectionItem}
        >
          <TextField
            name="nameEn"
            placeholder={intl.formatMessage({
              id: "AdminUniversityDetailsForm.nameEnPlaceholder",
            })}
            variant="outlined"
            fullWidth
            fieldProps={{
              validate: composeValidators(
                required(
                  intl.formatMessage({
                    id: "AdminUniversityDetailsForm.requiredField",
                  })
                ),
                maxLength(
                  intl.formatMessage(
                    {
                      id: "AdminUniversityDetailsForm.maxLength",
                    },
                    {
                      maxLength: MAX_LENGTH,
                    }
                  ),
                  100
                )
              ),
            }}
          />
        </CustomInput>
      </div>
      <div className={css.formSectionWrapper}>
        <CustomInput
          id="universityCode"
          label={intl.formatMessage({
            id: "AdminUniversityDetailsForm.universityCodeLabel",
          })}
          className={css.formSectionItem}
        >
          <TextField
            name="universityCode"
            placeholder={intl.formatMessage({
              id: "AdminUniversityDetailsForm.universityCodePlaceholder",
            })}
            variant="outlined"
            fullWidth
            fieldProps={{
              validate: maxLength(
                intl.formatMessage(
                  {
                    id: "AdminUniversityDetailsForm.maxLength",
                  },
                  {
                    maxLength: MAX_LENGTH,
                  }
                ),
                100
              ),
            }}
          />
        </CustomInput>
        <CustomInput
          id="location"
          label={intl.formatMessage({
            id: "AdminUniversityDetailsForm.locationLabel",
          })}
          className={css.formSectionItem}
        >
          <TextField
            name="location"
            placeholder={intl.formatMessage({
              id: "AdminUniversityDetailsForm.locationPlaceholder",
            })}
            variant="outlined"
            fullWidth
            fieldProps={{
              validate: maxLength(
                intl.formatMessage(
                  {
                    id: "AdminUniversityDetailsForm.maxLength",
                  },
                  {
                    maxLength: MAX_LENGTH,
                  }
                ),
                100
              ),
            }}
          />
        </CustomInput>
      </div>
      <div className={css.formSectionWrapper}>
        <CustomInput
          id="courseCount"
          label={intl.formatMessage({
            id: "AdminUniversityDetailsForm.courseCountLabel",
          })}
          className={css.formSectionItem}
        >
          <TextField
            name="courseCount"
            placeholder={intl.formatMessage({
              id: "AdminUniversityDetailsForm.courseCountPlaceholder",
            })}
            variant="outlined"
            fullWidth
            disabled
          />
        </CustomInput>
        <CustomInput
          id="documentCount"
          label={intl.formatMessage({
            id: "AdminUniversityDetailsForm.documentCountLabel",
          })}
          className={css.formSectionItem}
        >
          <TextField
            name="documentCount"
            placeholder={intl.formatMessage({
              id: "AdminUniversityDetailsForm.documentCountPlaceholder",
            })}
            variant="outlined"
            fullWidth
            disabled
          />
        </CustomInput>
        <CustomInput
          id="studentCount"
          label={intl.formatMessage({
            id: "AdminUniversityDetailsForm.studentCountLabel",
          })}
          className={css.formSectionItem}
        >
          <TextField
            name="studentCount"
            placeholder={intl.formatMessage({
              id: "AdminUniversityDetailsForm.studentCountPlaceholder",
            })}
            variant="outlined"
            fullWidth
            disabled
          />
        </CustomInput>
      </div>
      {errorMessage && <ErrorMessage content={errorMessage} />}
      <PrimaryButton
        type="submit"
        fullWidth
        sx={{ mt: 2, py: 1.2, maxWidth: "200px", mx: "auto" }}
        loading={submitting}
      >
        {intl.formatMessage({ id: "AdminUniversityDetailsForm.submitButton" })}
      </PrimaryButton>
    </form>
  );
};

const AdminUniversityDetailsForm = (props) => {
  return (
    <Form
      component={AdminUniversityDetailsFormComponent}
      {...props}
    />
  );
};

export default AdminUniversityDetailsForm;
