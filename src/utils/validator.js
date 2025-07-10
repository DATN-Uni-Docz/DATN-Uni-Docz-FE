import { isEmpty, toPairs } from "lodash";
export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 256;
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;
const VALID = undefined;

const isNonEmptyString = (val) => {
  return typeof val === "string" && val.trim().length > 0;
};

export const validatePassword = (message) => (value) => {
  return PASSWORD_REGEX.test(value) ? VALID : message;
};

export const required = (message) => (value) => {
  if (typeof value === "undefined" || value === null) {
    return message;
  }
  if (typeof value === "string") {
    return isNonEmptyString(value) ? VALID : message;
  }
  return VALID;
};

export const requiredEnumText = (message) => (value) => {
  if (typeof value === "undefined" || value === null) {
    // undefined or null values are invalid
    return message;
  }
  const { isOther, otherValue, defaultValue } = value || {};

  return (isOther &&
    typeof otherValue === "string" &&
    isNonEmptyString(otherValue)) ||
    (!isOther && defaultValue)
    ? VALID
    : message;
};

export const requiredStringNoTrim = (message) => (value) => {
  return typeof value === "string" && value.length > 0 ? VALID : message;
};

export const requiredBoolean = (message) => (value) => {
  return typeof value === "boolean" ? VALID : message;
};

export const requiredAndNonEmptyString = (message) => (value) => {
  return isNonEmptyString(value) ? VALID : message;
};

export const requiredFieldArrayCheckbox = (message) => (value) => {
  if (!value) {
    return message;
  }

  const entries = toPairs(value);
  const hasSelectedValues = entries.filter((e) => !!e[1]).length > 0;
  return hasSelectedValues ? VALID : message;
};

export const minLength = (message, minimumLength) => (value) => {
  const hasLength = value && typeof value.length === "number";
  return hasLength && value.length >= minimumLength ? VALID : message;
};

export const maxLength = (message, maximumLength) => (value) => {
  if (!value) {
    return VALID;
  }
  const hasLength = value && typeof value.length === "number";
  return hasLength && value.length <= maximumLength ? VALID : message;
};

export const nonEmptyArray = (message) => (value) => {
  return value && Array.isArray(value) && value.length > 0 ? VALID : message;
};

export const autocompleteSearchRequired = (message) => (value) => {
  return value && value.search ? VALID : message;
};

export const bookingDateRequired = (inValidDateMessage) => (value) => {
  const dateIsValid = value && value.date instanceof Date;
  return !dateIsValid ? inValidDateMessage : VALID;
};

export const bookingDatesRequired =
  (inValidStartDateMessage, inValidEndDateMessage) => (value) => {
    const startDateIsValid = value && value.startDate instanceof Date;
    const endDateIsValid = value && value.endDate instanceof Date;

    if (!startDateIsValid) {
      return inValidStartDateMessage;
    }
    if (!endDateIsValid) {
      return inValidEndDateMessage;
    }
    return VALID;
  };

const EMAIL_RE = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const emailFormatValid = (message) => (value) => {
  return value && EMAIL_RE.test(value) ? VALID : message;
};

const parseNum = (str) => {
  const num = Number.parseInt(str, 10);
  return Number.isNaN(num) ? null : num;
};

export const numberAtLeast = (message, minNumber) => (value) => {
  const valueNum = parseNum(value);
  return typeof valueNum === "number" && valueNum >= minNumber
    ? VALID
    : message;
};

export const isMatch =
  (message, compareValue, fieldName = "") =>
  (value, allValues) => {
    if (!isEmpty(fieldName)) {
      return allValues[fieldName] === value ? VALID : message;
    }

    return compareValue === value ? VALID : message;
  };

export const composeValidators =
  (...validators) =>
  (value, allValues) =>
    validators.reduce(
      (error, validator) => error || validator(value, allValues),
      VALID
    );

export const fileMaxSize = (message, maxSize) => (value) => {
  if (!(value instanceof File)) {
    return VALID;
  }

  return value.size <= maxSize ? VALID : message;
};

export const validateFilesNumber = (message, max, min) => (values) => {
  const validDocuments =
    !values ||
    (Array.isArray(values) &&
      ((values.length <= max && values.length >= min) ||
        values.length === 0));
  return validDocuments ? VALID : message;
};