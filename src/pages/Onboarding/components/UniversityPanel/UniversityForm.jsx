import { Box, Typography } from "@mui/material";
import { useImperativeHandle } from "react";
import { Form } from "react-final-form";
import { Autocomplete } from "mui-rff";
import { required } from "../../../../utils/validator";

const UniversityFormComponent = (props) => {
  const {
    handleSubmit,
    submitting,
    errorMessage,
    className,
    intl,
    formRef,
    form,
    universityOptions,
    handleOnInputUniversity,
  } = props;

  useImperativeHandle(formRef, () => form);

  return (
    <form onSubmit={handleSubmit} autoComplete="off" className={className}>
      <Box>
        <Autocomplete
          id="universityId"
          label={intl.formatMessage({
            id: "Onboarding.universityForm.universityIdLabel",
          })}
          name="universityId"
          placeholder={intl.formatMessage({
            id: "Onboarding.universityForm.universityIdPlaceholder",
          })}
          variant="outlined"
          options={universityOptions}
          getOptionLabel={(option) => option?.name}
          getOptionValue={(option) => option?.id}
          fullWidth
          fieldProps={{
            validate: required(
              intl.formatMessage({
                id: "Onboarding.universityForm.requiredField",
              })
            ),
          }}
          onInputChange={(event, value) => {
            handleOnInputUniversity(value);
          }}
        />
        <Typography variant="body1" sx={{color: "var(--colorGrey600)", mt: 2}}
        >
          {intl.formatMessage({
            id: "Onboarding.universityForm.universityNote",
          })}
        </Typography>
      </Box>
    </form>
  );
};

const UniversityForm = (props) => {
  return <Form {...props} component={UniversityFormComponent} />;
};

export default UniversityForm;
