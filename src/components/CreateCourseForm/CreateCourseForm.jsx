import { Form } from "react-final-form";
import { useIntl } from "react-intl";
import {
  composeValidators,
  maxLength,
  required,
} from "../../utils/validator";
import { Autocomplete, TextField } from "mui-rff";
import css from "./CreateCourseForm.module.css";
import { PrimaryButton } from "../CustomButton/CustomButton";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import CustomInput from "../CustomInput/CustomInput";
import classNames from "classnames";

const MAX_LENGTH = 50;

const CreateCourseFormComponent = (props) => {
  const {
    handleSubmit,
    submitting,
    errorMessage,
    className,
    universityOptions,
    handleOnInputUniversity,
    hasInitialUniversity = false,
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
          id: "CreateCourseForm.nameLabel",
        })}
        hasAsterisk
      >
        <TextField
          name="name"
          placeholder={intl.formatMessage({
            id: "CreateCourseForm.namePlaceholder",
          })}
          variant="outlined"
          fullWidth
          fieldProps={{
            validate: composeValidators(
              required(
                intl.formatMessage({
                  id: "CreateCourseForm.requiredField",
                })
              ),
              maxLength(
                intl.formatMessage(
                  {
                    id: "CreateCourseForm.maxLength",
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
        id="description"
        label={intl.formatMessage({
          id: "CreateCourseForm.descriptionLabel",
        })}
        hasAsterisk
      >
        <TextField
          name="description"
          placeholder={intl.formatMessage({
            id: "CreateCourseForm.descriptionPlaceholder",
          })}
          variant="outlined"
          fullWidth
          fieldProps={{
            validate: composeValidators(
              required(
                intl.formatMessage({
                  id: "CreateCourseForm.requiredField",
                })
              ),
              maxLength(
                intl.formatMessage(
                  {
                    id: "CreateCourseForm.maxLength",
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
      <CustomInput
        id="universityId"
        label={intl.formatMessage({
          id: "CreateCourseForm.universityIdLabel",
        })}
        hasAsterisk={!hasInitialUniversity}
      >
        <Autocomplete
          name="universityId"
          placeholder={intl.formatMessage({
            id: "CreateCourseForm.universityIdPlaceholder",
          })}
          variant="outlined"
          options={universityOptions}
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option.id}
          fullWidth
          fieldProps={{
            validate: required(
              intl.formatMessage({
                id: "CreateCourseForm.requiredField",
              })
            ),
          }}
          onInputChange={(event, value) => {
            handleOnInputUniversity(value);
          }}
          disabled={hasInitialUniversity}
        />
      </CustomInput>
      {errorMessage && <ErrorMessage content={errorMessage} />}
      <PrimaryButton
        type="submit"
        fullWidth
        sx={{ mt: 2, py: 1.2, maxWidth: "200px", mx: "auto" }}
        loading={submitting}
      >
        {intl.formatMessage({ id: "CreateCourseForm.submitButton" })}
      </PrimaryButton>
    </form>
  );
};

const CreateCourseForm = (props) => {
  return (
    <Form
      component={CreateCourseFormComponent}
      {...props}
    />
  );
};

export default CreateCourseForm;
