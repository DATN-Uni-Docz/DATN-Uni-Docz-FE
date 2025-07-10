import { Form } from "react-final-form";
import { useIntl } from "react-intl";
import {
  composeValidators,
  maxLength,
  required,
} from "../../utils/validator";
import { TextField } from "mui-rff";
import css from "./CreateUniversityForm.module.css";
import { PrimaryButton } from "../CustomButton/CustomButton";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import CustomInput from "../CustomInput/CustomInput";
import classNames from "classnames";

const MAX_LENGTH = 50;

const CreateUniversityFormComponent = (props) => {
  const {
    handleSubmit,
    submitting,
    errorMessage,
    className
  } = props;
  const intl = useIntl();

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      className={classNames(css.formWrapper, className)}
    >
      <CustomInput
        id="name"
        label={intl.formatMessage({
          id: "CreateUniversityForm.nameLabel",
        })}
        hasAsterisk
      >
        <TextField
          name="name"
          placeholder={intl.formatMessage({
            id: "CreateUniversityForm.namePlaceholder",
          })}
          variant="outlined"
          fullWidth
          fieldProps={{
            validate: composeValidators(
              required(
                intl.formatMessage({
                  id: "CreateUniversityForm.requiredField",
                })
              ),
              maxLength(
                intl.formatMessage(
                  {
                    id: "CreateUniversityForm.maxLength",
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
          id: "CreateUniversityForm.nameEnLabel",
        })}
        hasAsterisk
      >
        <TextField
          name="nameEn"
          placeholder={intl.formatMessage({
            id: "CreateUniversityForm.nameEnPlaceholder",
          })}
          variant="outlined"
          fullWidth
          fieldProps={{
            validate: composeValidators(
              required(
                intl.formatMessage({
                  id: "CreateUniversityForm.requiredField",
                })
              ),
              maxLength(
                intl.formatMessage(
                  {
                    id: "CreateUniversityForm.maxLength",
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
        id="universityCode"
        label={intl.formatMessage({
          id: "CreateUniversityForm.universityCodeLabel",
        })}
      >
        <TextField
          name="universityCode"
          placeholder={intl.formatMessage({
            id: "CreateUniversityForm.universityCodePlaceholder",
          })}
          variant="outlined"
          fullWidth
          fieldProps={{
            validate: maxLength(
              intl.formatMessage(
                {
                  id: "CreateUniversityForm.maxLength",
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
          id: "CreateUniversityForm.locationLabel",
        })}
      >
        <TextField
          name="location"
          placeholder={intl.formatMessage({
            id: "CreateUniversityForm.locationPlaceholder",
          })}
          variant="outlined"
          fullWidth
          fieldProps={{
            validate: maxLength(
              intl.formatMessage(
                {
                  id: "CreateUniversityForm.maxLength",
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
      {errorMessage && <ErrorMessage content={errorMessage} />}
      <PrimaryButton
        type="submit"
        fullWidth
        sx={{ mt: 2, py: 1.2, maxWidth: "200px", mx: "auto" }}
        loading={submitting}
      >
        {intl.formatMessage({ id: "CreateUniversityForm.submitButton" })}
      </PrimaryButton>
    </form>
  );
};

const CreateUniversityForm = (props) => {
  return (
    <Form
      component={CreateUniversityFormComponent}
      {...props}
    />
  );
};

export default CreateUniversityForm;
