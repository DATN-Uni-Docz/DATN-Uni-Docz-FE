import { Form } from "react-final-form";
import css from "../../MainSearch.module.css";
import classNames from "classnames";
import CustomInput from "../../../../components/CustomInput/CustomInput";
import { Autocomplete, Checkboxes } from "mui-rff";
import { useIntl } from "react-intl";
import { DOCUMENT_TYPES } from "../../../../constants";
import { Box, Button } from "@mui/material";
import { PrimaryButton, PrimaryOutlineButton } from "../../../../components/CustomButton/CustomButton";

const documentTypeOptions = Object.entries(DOCUMENT_TYPES).map(
  ([key, value]) => ({
    label: value,
    value: key,
  })
);

const DOCUMENT_TAB = "document";

const SearchFilterFormComponent = (props) => {
  const {
    handleSubmit,
    universityOptions,
    courseOptions,
    onReset,
    intl,
    handleOnInputUniversity,
    handleOnInputCourse,
    currentTab,
    values
  } = props;
  const { universityId } = values;

  const isDocumentTab = currentTab === DOCUMENT_TAB;

  return (
    <form
      onSubmit={handleSubmit}
      className={classNames(css.searchFilterFormWrapper)}
      autoComplete="off"
    >
      <CustomInput
        id="universityId"
        label={intl.formatMessage({ id: "SearchFilterForm.universityLabel" })}
      >
        <Autocomplete
          name="universityId"
          placeholder={intl.formatMessage({
            id: "SearchFilterForm.universityPlaceholder",
          })}
          variant="outlined"
          options={universityOptions}
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option.id}
          fullWidth
          id="universityId"
          onInputChange={(event, value) => {
            handleOnInputUniversity(value);
          }}
          onChange={(event, value) => {
            if (value) {
              handleOnInputCourse({
                universityId: value.id,
              });
            }
          }}
        />
      </CustomInput>
      {isDocumentTab && (
        <>
          <CustomInput
            id="courseId"
            label={intl.formatMessage({ id: "SearchFilterForm.courseLabel" })}
          >
            <Autocomplete
              name="courseId"
              placeholder={intl.formatMessage({
                id: "SearchFilterForm.coursePlaceholder",
              })}
              variant="outlined"
              options={courseOptions}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.id}
              onInputChange={(event, value) => {
                if(universityId) {
                  handleOnInputCourse({
                    universityId,
                    keyword: value,
                  });
                }
              }}
              fullWidth
              id="courseId"
            />
          </CustomInput>
          <CustomInput
            label={intl.formatMessage({
              id: "SearchFilterForm.documentTypeLabel",
            })}
          >
            <Checkboxes name="documentType" data={documentTypeOptions} />
          </CustomInput>
        </>
      )}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <PrimaryOutlineButton type="button" onClick={onReset}>
          {intl.formatMessage({ id: "SearchFilterForm.resetButton" })}
        </PrimaryOutlineButton>
        <PrimaryButton type="submit">
          {intl.formatMessage({ id: "SearchFilterForm.applyButton" })}
        </PrimaryButton>
      </Box>
    </form>
  );
};

const SearchFilterForm = (props) => {
  return <Form component={SearchFilterFormComponent} {...props} />;
};

export default SearchFilterForm;
