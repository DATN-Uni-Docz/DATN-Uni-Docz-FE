import { Form } from "react-final-form";
import { useIntl } from "react-intl";
import {
  composeValidators,
  maxLength,
  required,
} from "../../../utils/validator";
import { Autocomplete, Select, TextField } from "mui-rff";
import css from "../AdminDocumentDetails.module.css";
import classNames from "classnames";
import CustomInput from "../../../components/CustomInput/CustomInput";
import ErrorMessage from "../../../components/ErrorMessage/ErrorMessage";
import { PrimaryButton } from "../../../components/CustomButton/CustomButton";
import { MenuItem, Typography } from "@mui/material";
import { DOCUMENT_STATUS, DOCUMENT_TYPES } from "../../../constants";

const MAX_LENGTH = 50;
const MAX_LENGTH_TEXT_AREA = 500;

const AdminDocumentDetailsFormComponent = (props) => {
  const {
    handleSubmit,
    submitting,
    errorMessage,
    className,
    values,
    isCoursePublic,
    academicYearOptions = [],
    documentTypeOptions = [],
    courseOptions = [],
    universityOptions = [],
    handleOnInputCourse,
    handleOnInputUniversity,
  } = props;
  const intl = useIntl();
  const { universityId, courseId, userId } = values;

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
            id: "AdminDocumentDetailsForm.idLabel",
          })}
          className={css.formSectionItem}
        >
          <TextField
            name="id"
            placeholder={intl.formatMessage({
              id: "AdminDocumentDetailsForm.idPlaceholder",
            })}
            variant="outlined"
            fullWidth
            disabled
          />
        </CustomInput>
        <CustomInput
          id="status"
          label={intl.formatMessage({
            id: "AdminDocumentDetailsForm.statusLabel",
          })}
          className={css.formSectionItem}
        >
          <Select
            name="status"
            placeholder={intl.formatMessage({
              id: "AdminDocumentDetailsForm.statusPlaceholder",
            })}
            fullWidth
          >
            {Object.values(DOCUMENT_STATUS).map((status) => (
              <MenuItem
                key={status}
                value={status}
                disabled={[
                  DOCUMENT_STATUS.DELETED,
                  DOCUMENT_STATUS.REPORTED,
                  DOCUMENT_STATUS.PENDING,
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
          id="userId"
          label={intl.formatMessage({
            id: "AdminDocumentDetailsForm.userIdLabel",
          })}
          className={css.formSectionItem}
          href={`/admin/user/${userId}`}
        >
          <TextField
            name="userId"
            placeholder={intl.formatMessage({
              id: "AdminDocumentDetailsForm.userIdPlaceholder",
            })}
            variant="outlined"
            fullWidth
            disabled
          />
        </CustomInput>
        <CustomInput
          id="email"
          label={intl.formatMessage({
            id: "AdminDocumentDetailsForm.emailLabel",
          })}
          className={css.formSectionItem}
        >
          <TextField
            name="email"
            placeholder={intl.formatMessage({
              id: "AdminDocumentDetailsForm.emailPlaceholder",
            })}
            variant="outlined"
            fullWidth
            disabled
          />
        </CustomInput>
      </div>
      <div className={css.formSectionWrapper}>
        <CustomInput
          id="universityId"
          label={intl.formatMessage({
            id: "AdminDocumentDetailsForm.universityIdLabel",
          })}
          className={css.formSectionItem}
          href={`/admin/university/${universityId}`}
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
        <CustomInput
          id="courseId"
          label={intl.formatMessage({
            id: "AdminDocumentDetailsForm.courseIdLabel",
          })}
          className={css.formSectionItem}
          href={`/admin/course/${courseId}`}
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
          />
        </CustomInput>
      </div>
      <div className={css.formSectionWrapper}>
        <CustomInput
          id="documentType"
          label={intl.formatMessage({
            id: "AdminDocumentDetailsForm.documentTypeLabel",
          })}
          className={css.formSectionItem}
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
            id: "AdminDocumentDetailsForm.academicYearLabel",
          })}
          className={css.formSectionItem}
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
      </div>
      <div className={css.formSectionWrapper}>
        <CustomInput
          id="downloadCount"
          label={intl.formatMessage({
            id: "AdminDocumentDetailsForm.downloadCountLabel",
          })}
          className={css.formSectionItem}
        >
          <TextField
            name="downloadCount"
            placeholder={intl.formatMessage({
              id: "AdminDocumentDetailsForm.downloadCountPlaceholder",
            })}
            variant="outlined"
            fullWidth
            disabled
          />
        </CustomInput>
        <CustomInput
          id="saveCount"
          label={intl.formatMessage({
            id: "AdminDocumentDetailsForm.saveCountLabel",
          })}
          className={css.formSectionItem}
        >
          <TextField
            name="saveCount"
            placeholder={intl.formatMessage({
              id: "AdminDocumentDetailsForm.saveCountPlaceholder",
            })}
            variant="outlined"
            fullWidth
            disabled
          />
        </CustomInput>
      </div>
      <CustomInput
        id="title"
        label={intl.formatMessage({
          id: "AdminDocumentDetailsForm.titleLabel",
        })}
      >
        <TextField
          name="title"
          placeholder={intl.formatMessage({
            id: "AdminDocumentDetailsForm.titlePlaceholder",
          })}
          variant="outlined"
          fullWidth
          fieldProps={{
            validate: composeValidators(
              required(
                intl.formatMessage({
                  id: "AdminDocumentDetailsForm.requiredField",
                })
              ),
              maxLength(
                intl.formatMessage(
                  {
                    id: "AdminDocumentDetailsForm.maxLength",
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
        id="description"
        label={intl.formatMessage({
          id: "AdminDocumentDetailsForm.descriptionLabel",
        })}
      >
        <TextField
          name="description"
          placeholder={intl.formatMessage({
            id: "AdminDocumentDetailsForm.descriptionPlaceholder",
          })}
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          fieldProps={{
            validate: composeValidators(
              required(
                intl.formatMessage({
                  id: "AdminDocumentDetailsForm.requiredField",
                })
              ),
              maxLength(
                intl.formatMessage(
                  {
                    id: "AdminDocumentDetailsForm.maxLength",
                  },
                  {
                    maxLength: MAX_LENGTH_TEXT_AREA,
                  }
                ),
                MAX_LENGTH_TEXT_AREA
              )
            ),
          }}
        />
      </CustomInput>
      <CustomInput
        id="flaggedReason"
        label={intl.formatMessage({
          id: "AdminDocumentDetailsForm.flaggedReasonLabel",
        })}
      >
        <TextField
          name="flaggedReason"
          placeholder={intl.formatMessage({
            id: "AdminDocumentDetailsForm.flaggedReasonPlaceholder",
          })}
          variant="outlined"
          fullWidth
          disabled
        />
      </CustomInput>
      {errorMessage && <ErrorMessage content={errorMessage} />}
      {!isCoursePublic && (
        <ErrorMessage
          content={intl.formatMessage({
            id: "AdminDocumentDetailsForm.courseNotPublicNote",
          })}
        />
      )}
      <PrimaryButton
        type="submit"
        fullWidth
        sx={{ mt: 2, py: 1.2, maxWidth: "200px", mx: "auto" }}
        loading={submitting}
      >
        {intl.formatMessage({ id: "AdminDocumentDetailsForm.submitButton" })}
      </PrimaryButton>
    </form>
  );
};

const AdminDocumentDetailsForm = (props) => {
  return <Form component={AdminDocumentDetailsFormComponent} {...props} />;
};

export default AdminDocumentDetailsForm;
