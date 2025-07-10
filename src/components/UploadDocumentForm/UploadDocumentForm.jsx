import {
  Box,
  Button,
  CircularProgress,
  Divider,
  MenuItem,
  Typography,
} from "@mui/material";
import { Form } from "react-final-form";
import { FormattedMessage, useIntl } from "react-intl";
import { PrimaryButton } from "../../components/CustomButton/CustomButton";
import {
  composeValidators,
  maxLength,
  required,
  validateFilesNumber,
} from "../../utils/validator";
import { Autocomplete, Select, TextField } from "mui-rff";
import css from "./UploadDocumentForm.module.css";
import classNames from "classnames";
import FieldUploadFile from "../FieldUploadFile/FieldUploadFile";
import FieldDocumentFile from "../FieldDocumentFile/FieldDocumentFile";
import arrayMutators from "final-form-arrays";
import { FieldArray } from "react-final-form-arrays";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { ACCEPT_TYPES, DOCUMENT_TYPES } from "../../constants";
import { Add } from "@mui/icons-material";
import { useImperativeHandle } from "react";
import CustomInput from "../CustomInput/CustomInput";

const MAX_LENGTH_TEXT_AREA = 500;
const MAX_LENGTH_TEXT_FIELD = 50;
const MAX_FILES = 1;

const DOCUMENTS_FIELD_NAME = "documentFile";

const UploadDocumentFormComponent = (props) => {
  const {
    handleSubmit,
    className,
    form,
    academicYearOptions = [],
    documentTypeOptions = [],
    courseOptions = [],
    universityOptions = [],
    handleOnInputCourse,
    handleOnInputUniversity,
    submitting,
    errorMessage,
    universityLoading,
    editMode = false,
    values,
    handleOpenCreateUniversityModal,
    handleOpenCreateCourseModal,
    formRef,
    isUniversityDisabled,
    isCourseDisabled,
    handleClearNewUniversity,
    handleClearNewCourse,
  } = props;
  const intl = useIntl();
  useImperativeHandle(formRef, () => form);

  const { universityId } = values;
  const onFileUploadHandler = (formApi) => (files) => {
    if (files.length <= 0) {
      return;
    }
    formApi.change(DOCUMENTS_FIELD_NAME, null);
    for (const file of files) {
      const { type, size, name } = file;
      formApi.mutators.push(DOCUMENTS_FIELD_NAME, {
        file,
        contentType: type,
        size,
        fileName: name,
        isNew: true,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      className={classNames(css.container, className)}
    >
      <Box>
        <Typography variant="h6" sx={{ color: "var(--primaryColor)" }}>
          {intl.formatMessage({
            id: "UploadDocumentForm.documentFileSection",
          })}
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "var(--colorGrey500)", mt: 1 }}
        >
          {intl.formatMessage({
            id: "UploadDocumentForm.documentFileSectionNote",
          })}
        </Typography>
      </Box>
      {!editMode && (
        <FieldUploadFile
          id="uploadDocument"
          name="uploadDocument"
          accept={ACCEPT_TYPES}
          label={intl.formatMessage({
            id: "UploadDocumentForm.uploadDocumentLabel",
          })}
          tips={intl.formatMessage({
            id: "UploadDocumentForm.uploadDocumentTips",
          })}
          submitButtonText={intl.formatMessage({
            id: "UploadDocumentForm.uploadDocumentButton",
          })}
          onChange={onFileUploadHandler(form)}
          isDraggable
          multiple={false}
          // disabled={submitInProgress}
          intl={intl}
        />
      )}

      <FieldArray
        name={DOCUMENTS_FIELD_NAME}
        validate={composeValidators(
          validateFilesNumber(
            intl.formatMessage(
              {
                id: "UploadDocumentForm.maxFilesError",
              },
              {
                maxFiles: MAX_FILES,
              }
            ),
            MAX_FILES,
            MAX_FILES
          )
        )}
      >
        {({ fields, meta }) => (
          <>
            <div className={css.filesArray}>
              {fields.map((name, index) => (
                <FieldDocumentFile
                  key={name}
                  name={name}
                  intl={intl}
                  onRemoveFile={(file) => {
                    fields.remove(index);
                  }}
                  editMode={editMode}
                />
              ))}
            </div>

            {meta.error && <span className={css.error}>{meta.error}</span>}
          </>
        )}
      </FieldArray>
      <Box sx={{ height: "2px", backgroundColor: "#dbeafe" }}></Box>

      {editMode && (
        <>
          <Typography variant="h6" sx={{ color: "var(--primaryColor)" }}>
            {intl.formatMessage({
              id: "UploadDocumentForm.documentStatusSection",
            })}
          </Typography>
          <TextField
            label={intl.formatMessage({
              id: "UploadDocumentForm.statusLabel",
            })}
            name="status"
            placeholder={intl.formatMessage({
              id: "UploadDocumentForm.statusPlaceholder",
            })}
            variant="outlined"
            fullWidth
            disabled
            sx={{
              backgroundColor: "var(--secondaryColor)",
              color: "var(--colorBlack)",
            }}
          />
          <Box sx={{ height: "2px", backgroundColor: "#dbeafe" }}></Box>
        </>
      )}

      <Typography variant="h6" sx={{ color: "var(--primaryColor)" }}>
        {intl.formatMessage({
          id: "UploadDocumentForm.documentInfoSection",
        })}
      </Typography>

      <CustomInput
        id="title"
        label={intl.formatMessage({
          id: "UploadDocumentForm.titleLabel",
        })}
        hasAsterisk
      >
        <TextField
          name="title"
          placeholder={intl.formatMessage({
            id: "UploadDocumentForm.titlePlaceholder",
          })}
          variant="outlined"
          fullWidth
          fieldProps={{
            validate: composeValidators(
              required(
                intl.formatMessage({
                  id: "UploadDocumentForm.requiredField",
                })
              ),
              maxLength(
                intl.formatMessage(
                  {
                    id: "UploadDocumentForm.maxLength",
                  },
                  {
                    maxLength: MAX_LENGTH_TEXT_FIELD,
                  }
                ),
                MAX_LENGTH_TEXT_FIELD
              )
            ),
          }}
          autoComplete="off"
        />
      </CustomInput>
      <CustomInput
        label={intl.formatMessage({
          id: "UploadDocumentForm.descriptionLabel",
        })}
        id="description"
        hasAsterisk
      >
        <TextField
          name="description"
          placeholder={intl.formatMessage({
            id: "UploadDocumentForm.descriptionPlaceholder",
          })}
          variant="outlined"
          fullWidth
          fieldProps={{
            validate: composeValidators(
              required(
                intl.formatMessage({
                  id: "UploadDocumentForm.requiredField",
                })
              ),
              maxLength(
                intl.formatMessage(
                  {
                    id: "UploadDocumentForm.maxLength",
                  },
                  {
                    maxLength: MAX_LENGTH_TEXT_AREA,
                  }
                ),
                MAX_LENGTH_TEXT_AREA
              )
            ),
          }}
          autoComplete="off"
          multiline
          rows={4}
        />
      </CustomInput>
      <Box>
        <CustomInput
          label={intl.formatMessage({
            id: "UploadDocumentForm.universityLabel",
          })}
          id="universityId"
          hasAsterisk
        >
          <Autocomplete
            name="universityId"
            placeholder={intl.formatMessage({
              id: "UploadDocumentForm.universityPlaceholder",
            })}
            variant="outlined"
            options={universityOptions}
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option.id}
            fullWidth
            fieldProps={{
              validate: required(
                intl.formatMessage({
                  id: "UploadDocumentForm.requiredField",
                })
              ),
            }}
            onInputChange={(event, value) => {
              handleOnInputUniversity(value);
              // if(isUniversityDisabled || isCourseDisabled) {
                // if (handleClearNewUniversity) {
                //   handleClearNewUniversity();
                // }
                // if (handleClearNewCourse) {
                //   handleClearNewCourse();
                // }
              // }
            }}
            onChange={(event, value) => {
              if (value) {
                handleOnInputCourse({
                  universityId: value.id,
                });
              }
            }}
            loading={universityLoading}
            noOptionsText={
              <Typography
                variant="body1"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  cursor: "pointer",
                  "&:hover": { color: "var(--primaryColor)" },
                }}
                onClick={handleOpenCreateUniversityModal}
              >
                <Add />
                <FormattedMessage id="UploadDocumentForm.createUniversity" />
              </Typography>
            }
            disabled={isUniversityDisabled}
          />
        </CustomInput>
        {isUniversityDisabled && !editMode && (
          <Button
            variant="text"
            sx={{ mt: 1, textTransform: "none", fontSize: "16px" }}
            onClick={handleClearNewUniversity}
          >
            <FormattedMessage id="UploadDocumentForm.clearNewUniversity" />
          </Button>
        )}
      </Box>
      <Box>
        <CustomInput
          label={intl.formatMessage({
            id: "UploadDocumentForm.courseLabel",
          })}
          id="courseId"
          hasAsterisk
        >
          <Autocomplete
            name="courseId"
            placeholder={intl.formatMessage({
              id: "UploadDocumentForm.coursePlaceholder",
            })}
            variant="outlined"
            options={courseOptions}
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option.id}
            fullWidth
            fieldProps={{
              validate: required(
                intl.formatMessage({
                  id: "UploadDocumentForm.requiredField",
                })
              ),
            }}
            onInputChange={(event, value) => {
              handleOnInputCourse({
                universityId,
                keyword: value,
              });
            }}
            {...(universityId && {
              noOptionsText: (
                <Typography
                  variant="body1"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    cursor: "pointer",
                    "&:hover": { color: "var(--primaryColor)" },
                  }}
                  onClick={handleOpenCreateCourseModal}
                >
                  <Add />
                  <FormattedMessage id="UploadDocumentForm.createCourse" />
                </Typography>
              ),
            })}
            disabled={isCourseDisabled}
          />
        </CustomInput>
        {isCourseDisabled && !editMode && (
          <Button
            variant="text"
            sx={{ mt: 1, textTransform: "none", fontSize: "16px" }}
            onClick={handleClearNewCourse}
          >
            <FormattedMessage id="UploadDocumentForm.clearNewCourse" />
          </Button>
        )}
      </Box>
      <CustomInput
        label={intl.formatMessage({
          id: "UploadDocumentForm.documentTypeLabel",
        })}
        id="documentType"
        hasAsterisk
      >
        <Select
          name="documentType"
          fullWidth
          placeholder={intl.formatMessage({
            id: "UploadDocumentForm.documentTypePlaceholder",
          })}
          fieldProps={{
            validate: required(
              intl.formatMessage({
                id: "UploadDocumentForm.requiredField",
              })
            ),
          }}
          displayEmpty
          renderValue={(value) => {
            if (!value) {
              return (
                <Typography color="var(--colorPlaceholder)">
                  {intl.formatMessage({
                    id: "UploadDocumentForm.documentTypePlaceholder",
                  })}
                </Typography>
              );
            }
            return <>{value}</>;
          }}
        >
          {documentTypeOptions.map((type) => (
            <MenuItem key={type} value={type}>
              {DOCUMENT_TYPES[type]}
            </MenuItem>
          ))}
        </Select>
      </CustomInput>

      <CustomInput
        id="academicYear"
        label={intl.formatMessage({
          id: "UploadDocumentForm.academicYearLabel",
        })}
        hasAsterisk
      >
        <Select
          name="academicYear"
          fullWidth
          fieldProps={{
            validate: required(
              intl.formatMessage({
                id: "UploadDocumentForm.requiredField",
              })
            ),
          }}
          displayEmpty
          renderValue={(value) => {
            if (!value) {
              return (
                <Typography color="var(--colorPlaceholder)">
                  {intl.formatMessage({
                    id: "UploadDocumentForm.academicYearPlaceholder",
                  })}
                </Typography>
              );
            }
            return <>{value}</>;
          }}
        >
          {academicYearOptions.map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </CustomInput>
      {errorMessage && <ErrorMessage content={errorMessage} />}
      <PrimaryButton
        type="submit"
        fullWidth
        sx={{ mt: 2, py: 1.2, maxWidth: "200px", mx: "auto" }}
        loading={submitting}
      >
        {intl.formatMessage({ id: "UploadDocumentForm.submitButton" })}
      </PrimaryButton>
    </form>
  );
};

const UploadDocumentForm = (props) => {
  return (
    <Form
      component={UploadDocumentFormComponent}
      mutators={{ ...arrayMutators }}
      {...props}
    />
  );
};

export default UploadDocumentForm;
