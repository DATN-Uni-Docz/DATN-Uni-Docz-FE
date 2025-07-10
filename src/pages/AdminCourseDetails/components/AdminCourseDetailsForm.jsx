import { Form } from "react-final-form";
import { useIntl } from "react-intl";
import {
  composeValidators,
  maxLength,
  required,
} from "../../../utils/validator";
import { Autocomplete, Select, TextField } from "mui-rff";
import css from "../AdminCourseDetails.module.css";
import classNames from "classnames";
import CustomInput from "../../../components/CustomInput/CustomInput";
import ErrorMessage from "../../../components/ErrorMessage/ErrorMessage";
import { PrimaryButton } from "../../../components/CustomButton/CustomButton";
import { MenuItem } from "@mui/material";
import { COURSE_STATUS } from "../../../constants";

const MAX_LENGTH = 50;

const AdminCourseDetailsFormComponent = (props) => {
  const {
    handleSubmit,
    submitting,
    errorMessage,
    className,
    universityOptions = [],
    handleOnInputUniversity,
    isUniversityPublic,
    values
  } = props;
  const intl = useIntl();
  const { universityId } = values || {};

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
            id: "AdminCourseDetailsForm.idLabel",
          })}
          className={css.formSectionItem}
        >
          <TextField
            name="id"
            placeholder={intl.formatMessage({
              id: "AdminCourseDetailsForm.idPlaceholder",
            })}
            variant="outlined"
            fullWidth
            disabled
          />
        </CustomInput>
        <CustomInput
          id="status"
          label={intl.formatMessage({
            id: "AdminCourseDetailsForm.statusLabel",
          })}
          className={css.formSectionItem}
        >
          <Select
            name="status"
            placeholder={intl.formatMessage({
              id: "AdminCourseDetailsForm.statusPlaceholder",
            })}
            fullWidth
          >
            {Object.values(COURSE_STATUS).map((status) => (
              <MenuItem
                key={status}
                value={status}
                disabled={[
                  COURSE_STATUS.PENDING,
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
            id: "AdminCourseDetailsForm.nameLabel",
          })}
          className={css.formSectionItem}
        >
          <TextField
            name="name"
            placeholder={intl.formatMessage({
              id: "AdminCourseDetailsForm.namePlaceholder",
            })}
            variant="outlined"
            fullWidth
            fieldProps={{
              validate: composeValidators(
                required(
                  intl.formatMessage({
                    id: "AdminCourseDetailsForm.requiredField",
                  })
                ),
                maxLength(
                  intl.formatMessage(
                    {
                      id: "AdminCourseDetailsForm.maxLength",
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
          id="universityId"
          label={intl.formatMessage({
            id: "AdminCourseDetailsForm.universityIdLabel",
          })}
          className={css.formSectionItem}
          href={`/admin/university/${universityId}`}
        >
          <Autocomplete
            name="universityId"
            placeholder={intl.formatMessage({
              id: "AdminCourseDetailsForm.universityIdPlaceholder",
            })}
            variant="outlined"
            options={universityOptions}
            getOptionLabel={(option) => option?.name}
            getOptionValue={(option) => option?.id}
            fullWidth
            fieldProps={{
              validate: required(
                intl.formatMessage({
                  id: "AdminCourseDetailsForm.requiredField",
                })
              ),
            }}
            onInputChange={(event, value) => {
              handleOnInputUniversity(value);
            }}
          />
        </CustomInput>
      </div>
      <div className={css.formSectionWrapper}>
        <CustomInput
          id="documentCount"
          label={intl.formatMessage({
            id: "AdminCourseDetailsForm.documentCountLabel",
          })}
          className={css.formSectionItem}
        >
          <TextField
            name="documentCount"
            placeholder={intl.formatMessage({
              id: "AdminCourseDetailsForm.documentCountPlaceholder",
            })}
            variant="outlined"
            fullWidth
            disabled
          />
        </CustomInput>
        <CustomInput
          id="saveCount"
          label={intl.formatMessage({
            id: "AdminCourseDetailsForm.saveCountLabel",
          })}
          className={css.formSectionItem}
        >
          <TextField
            name="saveCount"
            placeholder={intl.formatMessage({
              id: "AdminCourseDetailsForm.saveCountPlaceholder",
            })}
            variant="outlined"
            fullWidth
            disabled
          />
        </CustomInput>
      </div>
      <CustomInput
        id="description"
        label={intl.formatMessage({
          id: "AdminCourseDetailsForm.descriptionLabel",
        })}
        className={css.formSectionItem}
      >
        <TextField
          name="description"
          placeholder={intl.formatMessage({
            id: "AdminCourseDetailsForm.descriptionPlaceholder",
          })}
          variant="outlined"
          fullWidth
          fieldProps={{
            validate: composeValidators(
              required(
                intl.formatMessage({
                  id: "AdminCourseDetailsForm.requiredField",
                })
              ),
              maxLength(
                intl.formatMessage(
                  {
                    id: "AdminCourseDetailsForm.maxLength",
                  },
                  {
                    maxLength: MAX_LENGTH,
                  }
                ),
                100
              )
            ),
          }}
          multiline
          rows={4}
        />
      </CustomInput>
      {errorMessage && <ErrorMessage content={errorMessage} />}
      {!isUniversityPublic && (
        <ErrorMessage
          content={intl.formatMessage({
            id: "AdminCourseDetailsForm.universityNotPublicNote",
          })}
        />
      )}
      <PrimaryButton
        type="submit"
        fullWidth
        sx={{ mt: 2, py: 1.2, maxWidth: "200px", mx: "auto" }}
        loading={submitting}
      >
        {intl.formatMessage({ id: "AdminCourseDetailsForm.submitButton" })}
      </PrimaryButton>
    </form>
  );
};

const AdminCourseDetailsForm = (props) => {
  return <Form component={AdminCourseDetailsFormComponent} {...props} />;
};

export default AdminCourseDetailsForm;
