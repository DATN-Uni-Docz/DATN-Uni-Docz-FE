import { Form } from "react-final-form";
import { useIntl } from "react-intl";
import { composeValidators, maxLength, required } from "../../../utils/validator";
import { Autocomplete, TextField } from "mui-rff";
import css from "../Profile.module.css";
import classNames from "classnames";
import CustomInput from "../../../components/CustomInput/CustomInput";
import ErrorMessage from "../../../components/ErrorMessage/ErrorMessage";
import { PrimaryButton } from "../../../components/CustomButton/CustomButton";

const MAX_LENGTH = 50;

const ProfileFormComponent = (props) => {
  const {
    handleSubmit,
    submitting,
    errorMessage,
    className,
    universityOptions,
    handleOnInputUniversity
  } = props;
  const intl = useIntl();

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      className={classNames(css.formWrapper, className)}
    >
      <CustomInput
        id="email"
        label={intl.formatMessage({
          id: "ProfileForm.emailLabel",
        })}
        hasAsterisk
      >
        <TextField
          name="email"
          placeholder={intl.formatMessage({
            id: "ProfileForm.emailPlaceholder",
          })}
          variant="outlined"
          fullWidth
          disabled
        />
      </CustomInput>
      <CustomInput
        id="firstName"
        label={intl.formatMessage({
          id: "ProfileForm.firstNameLabel",
        })}
        hasAsterisk
      >
        <TextField
          name="firstName"
          placeholder={intl.formatMessage({
            id: "ProfileForm.firstNamePlaceholder",
          })}
          variant="outlined"
          fullWidth
          fieldProps={{
            validate: composeValidators(
              required(
                intl.formatMessage({
                  id: "ProfileForm.requiredField",
                })
              ),
              maxLength(
                intl.formatMessage(
                  {
                    id: "ProfileForm.maxLength",
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
        id="lastName"
        label={intl.formatMessage({
          id: "ProfileForm.lastNameLabel",
        })}
        hasAsterisk
      >
        <TextField
          name="lastName"
          placeholder={intl.formatMessage({
            id: "ProfileForm.lastNamePlaceholder",
          })}
          variant="outlined"
          fullWidth
          fieldProps={{
            validate: composeValidators(
              required(
                intl.formatMessage({
                  id: "ProfileForm.requiredField",
                })
              ),
              maxLength(
                intl.formatMessage(
                  {
                    id: "ProfileForm.maxLength",
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
          id: "ProfileForm.universityIdLabel",
        })}
        hasAsterisk
      >
        <Autocomplete
          name="universityId"
          placeholder={intl.formatMessage({
            id: "ProfileForm.universityIdPlaceholder",
          })}
          variant="outlined"
          options={universityOptions}
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option.id}
          fullWidth
          fieldProps={{
            validate: required(
              intl.formatMessage({
                id: "ProfileForm.requiredField",
              })
            ),
          }}
          onInputChange={(event, value) => {
            handleOnInputUniversity(value);
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
        {intl.formatMessage({ id: "ProfileForm.submitButton" })}
      </PrimaryButton>
    </form>
  );
};

const ProfileForm = (props) => {
  return <Form component={ProfileFormComponent} {...props} />;
};

export default ProfileForm;
