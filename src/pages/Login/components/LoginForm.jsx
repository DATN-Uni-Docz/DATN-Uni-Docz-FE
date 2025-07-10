import { Typography } from "@mui/material";
import { Form } from "react-final-form";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";
import { PrimaryButton } from "../../../components/CustomButton/CustomButton";
import { required } from "../../../utils/validator";
import { TextField } from "mui-rff";
import CustomInput from "../../../components/CustomInput/CustomInput";
import css from "../Login.module.css";

const LoginFormComponent = (props) => {
  const { handleSubmit, submitting } = props;
  const intl = useIntl();

  return (
    <form onSubmit={handleSubmit} className={css.formWrapper}>
      <CustomInput
        label={intl.formatMessage({
          id: "LoginPage.emailLabel",
        })}
        id="email"
      >
        <TextField
          name="email"
          placeholder={intl.formatMessage({
            id: "LoginPage.emailPlaceholder",
          })}
          variant="outlined"
          fullWidth
          fieldProps={{
            validate: required(
              intl.formatMessage({
                id: "LoginPage.requiredField",
              })
            ),
          }}
          autoComplete="off"
        />
      </CustomInput>
      <CustomInput
        label={intl.formatMessage({
          id: "LoginPage.passwordLabel",
        })}
        id="password"
      >
        <TextField
          name="password"
          placeholder={intl.formatMessage({
            id: "LoginPage.passwordPlaceholder",
          })}
          variant="outlined"
          type="password"
          fullWidth
          fieldProps={{
            validate: required(
              intl.formatMessage({
                id: "LoginPage.requiredField",
              })
            ),
          }}
          autoComplete="off"
        />
      </CustomInput>

      <PrimaryButton type="submit" loading={submitting} fullWidth sx={{ mt: 2, py: 1 }}>
        {intl.formatMessage({ id: "LoginPage.submitButton" })}
      </PrimaryButton>
      <Typography variant="body2" sx={{ mt: 2.5, color: "text.secondary" }}>
        {intl.formatMessage({ id: "LoginPage.noAccount" })}{" "}
        <Link
          to="/signup"
          style={{ textDecoration: "none", color: "var(--primaryColor)" }}
        >
          {intl.formatMessage({ id: "LoginPage.registerLink" })}
        </Link>
      </Typography>
    </form>
  );
};

const LoginForm = (props) => {
  return <Form {...props} component={LoginFormComponent} />;
};

export default LoginForm;
