import { Form } from "react-final-form";
import { useIntl } from "react-intl";
import {
  composeValidators,
  isMatch,
  maxLength,
  minLength,
  required,
} from "../../../utils/validator";
import { TextField } from "mui-rff";
import css from "../ChangePassword.module.css";
import classNames from "classnames";
import CustomInput from "../../../components/CustomInput/CustomInput";
import ErrorMessage from "../../../components/ErrorMessage/ErrorMessage";
import { PrimaryButton } from "../../../components/CustomButton/CustomButton";

const MIN_LENGTH = 8;
const MAX_LENGTH = 30;

const ChangePasswordFormComponent = (props) => {
  const { handleSubmit, submitting, errorMessage, className } = props;
  const intl = useIntl();

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      className={classNames(css.formWrapper, className)}
    >
      <CustomInput
        id="oldPassword"
        label={intl.formatMessage({
          id: "ChangePasswordForm.oldPasswordLabel",
        })}
        hasAsterisk
      >
        <TextField
          name="oldPassword"
          placeholder={intl.formatMessage({
            id: "ChangePasswordForm.oldPasswordPlaceholder",
          })}
          variant="outlined"
          fullWidth
          type="password"
          fieldProps={{
            validate: composeValidators(
              required(
                intl.formatMessage({
                  id: "ChangePasswordForm.requiredField",
                })
              ),
              maxLength(
                intl.formatMessage(
                  {
                    id: "ChangePasswordForm.maxLength",
                  },
                  {
                    maxLength: MAX_LENGTH,
                  }
                ),
                MAX_LENGTH
              )
            ),
          }}
        />
      </CustomInput>
      <CustomInput
        id="password"
        label={intl.formatMessage({
          id: "ChangePasswordForm.passwordLabel",
        })}
        hasAsterisk
      >
        <TextField
          name="password"
          placeholder={intl.formatMessage({
            id: "ChangePasswordForm.passwordPlaceholder",
          })}
          variant="outlined"
          fullWidth
          type="password"
          fieldProps={{
            validate: composeValidators(
              required(
                intl.formatMessage({
                  id: "ChangePasswordForm.requiredField",
                })
              ),
              maxLength(
                intl.formatMessage(
                  {
                    id: "ChangePasswordForm.maxLength",
                  },
                  {
                    maxLength: MAX_LENGTH,
                  }
                ),
                MAX_LENGTH
              ),
              minLength(
                intl.formatMessage(
                  {
                    id: "ChangePasswordForm.minLengthPassword",
                  },
                  {
                    minLength: MIN_LENGTH,
                  }
                ),
                MIN_LENGTH
              )
            ),
          }}
        />
      </CustomInput>
      <CustomInput
        id="confirmPassword"
        label={intl.formatMessage({
          id: "ChangePasswordForm.confirmPasswordLabel",
        })}
        hasAsterisk
      >
        <TextField
          name="confirmPassword"
          placeholder={intl.formatMessage({
            id: "ChangePasswordForm.confirmPasswordPlaceholder",
          })}
          variant="outlined"
          type="password"
          fullWidth
          fieldProps={{
            validate: composeValidators(
              required(
                intl.formatMessage({
                  id: "ChangePasswordForm.requiredField",
                })
              ),
              isMatch(
                intl.formatMessage({
                  id: "ChangePasswordForm.passwordNotMatch",
                }),
                "",
                "password"
              )
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
        {intl.formatMessage({ id: "ChangePasswordForm.submitButton" })}
      </PrimaryButton>
    </form>
  );
};

const ChangePasswordForm = (props) => {
  return <Form component={ChangePasswordFormComponent} {...props} />;
};

export default ChangePasswordForm;
