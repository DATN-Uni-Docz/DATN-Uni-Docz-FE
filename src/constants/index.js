
export const ADMIN = "ADMIN";
export const MEMBER = "MEMBER";

export const AUTO_CLOSE_TOAST_DURATION = 2000;

export const TABLE_LIMIT = 5;

const PDF_CONTENT_TYPE = "application/pdf";

export const ACCEPT_TYPES = [
  PDF_CONTENT_TYPE,
];

export const FILE_TYPE = {
  [PDF_CONTENT_TYPE]: "PDF",
};

export const DOCUMENT_STATUS = {
  PUBLIC: "PUBLIC",
  REJECTED: "REJECTED",
  PENDING: "PENDING",
  REPORTED: "REPORTED",
  DELETED: "DELETED",
}

export const COURSE_STATUS = {
  PUBLIC: "PUBLIC",
  REJECTED: "REJECTED",
  PENDING: "PENDING",
}

export const UNIVERSITY_STATUS = {
  PUBLIC: "PUBLIC",
  REJECTED: "REJECTED",
  PENDING: "PENDING",
}

export const RECENT_GROUP = 'RECENT_GROUP';
export const SEARCH_GROUP = 'SEARCH_GROUP';
export const LIMIT_SUGGESTION = 20;

export const LECTURE_NOTE = "LECTURE_NOTE";
export const TEXTBOOK = "TEXTBOOK";
export const ASSIGNMENT = "ASSIGNMENT";
export const EXAM = "EXAM";
export const ESSAY = "ESSAY";
export const RESEARCH_PAPER = "RESEARCH_PAPER";

export const DOCUMENT_TYPES = {
  [LECTURE_NOTE]: "Lecture Note",
  [TEXTBOOK]: "Textbook",
  [ASSIGNMENT]: "Assignment",
  [EXAM]: "Exam & Solution",
  [ESSAY]: "Essay",
  [RESEARCH_PAPER]: "Research Paper",
}

export const OTHER = "OTHER";

export const REPORT_STATUS = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
}

export const USER_STATUS = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
}

export const SUBSCRIPTION_TYPES = {
  BASIC: "BASIC",
  STANDARD: "STANDARD",
  PREMIUM: "PREMIUM",
};

export const SUBSCRIPTION_STATUS = {
  PENDING: "PENDING",
  SUCCESS: "SUCCESS",
  CANCELLED: "CANCELLED",
  AUTO_CANCELLED: "AUTO_CANCELLED",
};

export const SUBSCRIPTION_PLANS = {
  BASIC: {
    price: 20000,
    duration: 1,
    unit: "months",
  },
  STANDARD: {
    price: 50000,
    duration: 6,
    unit: "months",
  },
  PREMIUM: {
    price: 80000,
    duration: 12,
    unit: "months",
  },
};

export const LONG_DATE_FORMAT = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
}

export const SHORT_DATE_FORMAT = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
}

export const SUBSCRIPTION_STATUS_NAMES = {
  [SUBSCRIPTION_STATUS.PENDING]: "PENDING",
  [SUBSCRIPTION_STATUS.SUCCESS]: "SUCCESS",
  [SUBSCRIPTION_STATUS.CANCELLED]: "CANCELLED",
  [SUBSCRIPTION_STATUS.AUTO_CANCELLED]: "AUTO CANCELLED",
}

export const TIMEOUT_LOADING = 50;
