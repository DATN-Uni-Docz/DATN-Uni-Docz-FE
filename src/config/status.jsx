export const ACTIVE = 'ACTIVE'
export const INACTIVE = 'INACTIVE'
export const DELETED = 'DELETED'

export const PAYING = 'PAYING'
export const PENDING = 'PENDING'
export const PACKAGING = "PACKAGING";
export const DELIVERING = "DELIVERING";
export const COMPLETED = "COMPLETED";
export const CANCELLED = "CANCELLED";
export const PAYMENT_FAILED = "PAYMENT_FAILED";

export const PENDING_REQUEST = 'PENDING';
export const ACCEPTED = 'ACCEPTED';
export const REJECTED = 'REJECTED';

export const voucherType = {
  PERCENTAGE: 'PERCENTAGE',
  PRICE: 'PRICE',
}

export const voucherStatus = {
  UPCOMING: 'UPCOMING',
  ACTIVE: 'ACTIVE',
  DELETED: 'DELETED',
  EXPIRED: 'EXPIRED',
  UNAVAILABLE: 'UNAVAILABLE',
}

export const STATUS_STYLES = {
    [PENDING]: {
      backgroundColor: "#57A1DA",
      color: "white",
    },
    [PACKAGING]: {
      backgroundColor: "#faa564",
      color: "black",
    },
    [DELIVERING]: {
      backgroundColor: "#64befa",
      color: "black",
    },
    [COMPLETED]: {
      backgroundColor: "green",
      color: "white",
    },
    [CANCELLED]: {
      backgroundColor: "red",
      color: "white",
    },
    [ACTIVE]: {
      backgroundColor: "green",
      color: "white",
    },
    [REJECTED]: {
        backgroundColor: "#EE7782",
        color: "white",
    },
    [ACCEPTED]: {
        backgroundColor: "#36B08F",
        color: "white",
    },
    [voucherStatus.EXPIRED]:  {
      backgroundColor: "#B7B6B6",
      color: "white",
    },
    [voucherStatus.UPCOMING]: {
      backgroundColor: "#64befa",
      color: "white",
    },
    [voucherStatus.DELETED]: {
      backgroundColor: "#EE7782",
      color: "white",
    },
    [voucherStatus.ACTIVE]: {
      backgroundColor: "green",
      color: "white",
    },
    [voucherStatus.UNAVAILABLE]: {
      backgroundColor: "#000000",
      color: "white",
    },
    // Add more statuses and their styles as needed
};

export const statisticsUnit = {
  YEAR: "year",
  QUARTER: "quarter",
  MONTH: "month",
  WEEK: "week",
};