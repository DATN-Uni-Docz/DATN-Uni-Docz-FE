import { Box, Typography } from "@mui/material";
import { Form } from "react-final-form";
import { useIntl } from "react-intl";
import { PrimaryButton } from "../../../components/CustomButton/CustomButton";
import { composeValidators, emailFormatValid, isMatch, minLength, required, validatePassword } from "../../../utils/validator";
import { Link } from "react-router-dom";
import { TextField } from "mui-rff";
import css from "../SignUp.module.css";
import CustomInput from "../../../components/CustomInput/CustomInput";

const MIN_LENGTH = 8;

const SignUpFormComponent = (props) => {
  const { handleSubmit, submitting } = props;
  const intl = useIntl();

  return (
    <form onSubmit={handleSubmit} className={css.formWrapper}>
      <Box sx={{ display: "flex", gap: "10px" }}>
        <CustomInput
          label={intl.formatMessage({
            id: "SignUpPage.firstNameLabel",
          })}
          id="firstName"
          hasAsterisk
        >
          <TextField
            name="firstName"
            placeholder={intl.formatMessage({
              id: "SignUpPage.firstNamePlaceholder",
            })}
            variant="outlined"
            fullWidth
            fieldProps={{
              validate: required(
                intl.formatMessage({
                  id: "SignUpPage.requiredField",
                })
              ),
            }}
            autoComplete="off"
          />
        </CustomInput>

        <CustomInput
          label={intl.formatMessage({
            id: "SignUpPage.lastNameLabel",
          })}
          id="lastName"
          hasAsterisk
        >
          <TextField
            name="lastName"
            placeholder={intl.formatMessage({
              id: "SignUpPage.lastNamePlaceholder",
            })}
            variant="outlined"
            fullWidth
            fieldProps={{
              validate: required(
                intl.formatMessage({
                  id: "SignUpPage.requiredField",
                })
              ),
            }}
            autoComplete="off"
          />
        </CustomInput>
      </Box>
      <CustomInput
        label={intl.formatMessage({
          id: "SignUpPage.emailLabel",
        })}
        id="email"
        hasAsterisk
      >
        <TextField
          name="email"
          placeholder={intl.formatMessage({
            id: "SignUpPage.emailPlaceholder",
          })}
          variant="outlined"
          fullWidth
          fieldProps={{
            validate: composeValidators(
              required(
                intl.formatMessage({
                  id: "SignUpPage.requiredField",
                })
              ),
              emailFormatValid(
                intl.formatMessage({
                  id: "SignUpPage.invalidEmail",
                })
              )
            ),
          }}
          autoComplete="off"
        />
      </CustomInput>
      <CustomInput
        label={intl.formatMessage({
          id: "SignUpPage.passwordLabel",
        })}
        id="password"
        hasAsterisk
      >
        <TextField
          name="password"
          placeholder={intl.formatMessage({
            id: "SignUpPage.passwordPlaceholder",
          })}
          variant="outlined"
          type="password"
          fullWidth
          fieldProps={{
            validate: composeValidators(
              required(
                intl.formatMessage({
                  id: "SignUpPage.requiredField",
                })
              ),
              minLength(
                intl.formatMessage(
                  {
                    id: "SignUpPage.minLengthPassword",
                  },
                  {
                    minLength: MIN_LENGTH,
                  }
                ),
                MIN_LENGTH
              ),
              validatePassword(intl.formatMessage({
                id: "SignUpPage.invalidPassword",
              })
              )
            ),
          }}
          autoComplete="off"
        />
      </CustomInput>
      <CustomInput
        label={intl.formatMessage({
          id: "SignUpPage.confirmPasswordLabel",
        })}
        id="confirmPassword"
        hasAsterisk
      >
        <TextField
          name="confirmPassword"
          placeholder={intl.formatMessage({
            id: "SignUpPage.confirmPasswordPlaceholder",
          })}
          variant="outlined"
          type="password"
          fullWidth
          fieldProps={{
            validate: composeValidators(
              required(
                intl.formatMessage({
                  id: "SignUpPage.requiredField",
                })
              ),
              isMatch(
                intl.formatMessage({
                  id: "SignUpPage.passwordNotMatch",
                }),
                "",
                "password"
              )
            ),
          }}
          autoComplete="off"
        />
      </CustomInput>

      <PrimaryButton type="submit" loading={submitting} fullWidth sx={{ mt: 1, py: 1 }}>
        {intl.formatMessage({ id: "SignUpPage.submitButton" })}
      </PrimaryButton>

      <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
        {intl.formatMessage({ id: "SignUpPage.hasAccount" })}{" "}
        <Link
          to="/login"
          style={{ textDecoration: "none", color: "var(--primaryColor)" }}
        >
          {intl.formatMessage({ id: "SignUpPage.loginLink" })}
        </Link>
      </Typography>
    </form>
  );
};

const SignUpForm = (props) => {
  return <Form component={SignUpFormComponent} {...props} />;
};

export default SignUpForm;
