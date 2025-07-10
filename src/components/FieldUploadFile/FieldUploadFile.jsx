import { useCallback, useState } from "react";
import { arrayOf, bool, func, node, object, shape, string } from "prop-types";
import { Field } from "react-final-form";
import classNames from "classnames";
import { useDropzone } from "react-dropzone";
// import IconUpload from '../IconUpload/IconUpload';

import css from "./FieldUploadFile.module.css";
import ValidationError from "../ValidationError/ValidationError";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { Typography } from "@mui/material";
import { PrimaryOutlineButton } from "../CustomButton/CustomButton";

const MAX_FILES = 8;
const MAX_SIZE = 50 * 1024 * 1024;

const FieldUploadFileComponent = (props) => {
  const {
    rootClassName,
    className,
    customErrorText,
    id,
    label,
    input,
    meta,
    tips,
    hideErrorMessage,
    submitButtonText,
    onChange: externalOnChange,
    disabled: fieldDisabled,
    isDraggable,
    accept,
    disabled,
    multiple,
    maxFiles = MAX_FILES,
    maxSize = MAX_SIZE,
    validator,
    intl,
    ...rest
  } = props;

  if (label && !id) {
    throw new Error("id required when a label is given");
  }
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState([]);

  const onDrop = useCallback((files) => {
    setErrors(null);
    setFiles(files);
    if (externalOnChange) {
      externalOnChange(files);
    }
  }, []);

  const onDropRejected = useCallback((fileRejections) => {
    const errors = fileRejections.map((file) => file.errors).flat();
    setErrors(errors);
  }, []);

  const { getRootProps, getInputProps, isDragAccept, isDragReject } =
    useDropzone({
      accept: accept.reduce(
        (accept, currentMimeType) => ({ ...accept, [currentMimeType]: [] }),
        {}
      ),
      noDrag: !isDraggable || disabled,
      onDrop,
      onDropRejected,
      disabled,
      maxFiles,
      maxSize,
      validator,
      multiple,
    });
  const inputProps = getInputProps();
  const { invalid, error } = meta;

  const errorText = customErrorText || error || errors?.[0]?.message;

  const hasError = !!customErrorText || !!(invalid && error) || errorText;

  const fieldMeta = { touched: true, error: hasError ? errorText : null };

  const classes = classNames(rootClassName || css.root, className, {
    [css.dragAccepted]: isDragAccept,
    [css.dragRejected]: isDragReject,
  });

  return (
    <>
      <div className={classes} {...rest}>
        <div className={css.chooseFileText}>
          <UploadFileIcon
            sx={{ color: "var(--primaryColor)", fontSize: "48px" }}
            className={css.icon}
          />
          <Typography variant="h6" sx={{ mt: "20px", mb: "6px" }}>
            {label}
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "var(--colorGrey400)", mt: 0, mb: 0 }}
          >
            {tips}
          </Typography>
        </div>
        <label htmlFor={input.name} {...getRootProps()} className={css.addFile}>
          <PrimaryOutlineButton
            sx={{ backgroundColor: "var(--colorWhite)" }}
            variant="outlined"
            component="span"
          >
            {submitButtonText ||
              intl.formatMessage({ id: "FieldUploadFile.addFile" })}
          </PrimaryOutlineButton>
          {fieldDisabled ? null : <input {...input} {...inputProps} />}
        </label>
      </div>
      {hideErrorMessage ? null : (
        <ValidationError fieldMeta={fieldMeta} rootClassName={css.errorText} />
      )}
    </>
  );
};

FieldUploadFileComponent.defaultProps = {
  rootClassName: null,
  className: null,
  inputRootClass: null,
  onUnmount: null,
  customErrorText: null,
  id: null,
  label: null,
  accept: ["image/*"],
  hideErrorMessage: false,
  isDraggable: true,
  disabled: false,
};

FieldUploadFileComponent.propTypes = {
  rootClassName: string,
  className: string,
  inputRootClass: string,

  customErrorText: string,

  id: string,
  label: node,

  input: shape({
    onChange: func.isRequired,
  }).isRequired,
  meta: object.isRequired,
  accept: arrayOf(string),
  isDraggable: bool,
  disabled: bool,
};

const FieldUploadFile = (props) => {
  return <Field component={FieldUploadFileComponent} {...props} />;
};

export default FieldUploadFile;
