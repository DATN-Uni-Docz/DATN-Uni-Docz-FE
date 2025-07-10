import { voucherType, voucherStatus } from "./status"

export const TARGET = {
    MALE: "MEN",
    FEMALE: "WOMEN",
}

export const TARGET_OPTIONS = [
    {
        key: "all",
        value: "All",
    },
    {
        key: "MEN",
        value: "Men",
    },
    {
        key: "WOMEN",
        value: "Women",
    },
]

export const SIZE = {
    [TARGET.MALE]: {
        values: Array.from({ length: 45 - 39 + 1 }, (_, i) => i + 39),
        range: "39-45",
    },
    [TARGET.FEMALE]: {
        values: Array.from({ length: 43 - 34 + 1 }, (_, i) => i + 34),
        range: "34-43",
    },
}

export const INITIALPROFILE = {
    id: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    gender: "none",
    dateOfBirth: null,
    email: "",
}

export const TYPE_LIST = [
    {
        key: "none",
        value: "Select type"
    },
    {
        key: voucherType.PRICE,
        value: "Price"
    },
    {
        key: voucherType.PERCENTAGE,
        value: "Percentage",
    },
]

export const VOUCHER_TYPE_LIST = [
    {
        key: "all",
        value: "All"
    },
    {
        key: voucherType.PRICE,
        value: "Price"
    },
    {
        key: voucherType.PERCENTAGE,
        value: "Percentage",
    },
]

export const VOUCHER_STATUS_LIST = [
    {
        key: "all",
        value: "All",
    },
    {
        key: voucherStatus.UPCOMING,
        value: "Upcoming",
    },
    {
        key: voucherStatus.ACTIVE,
        value: "Active",
    },
    {
        key: voucherStatus.UNAVAILABLE,
        value: "Unavailable",
    },
    {
        key: voucherStatus.EXPIRED,
        value: "Expired",
    },
    {
        key: voucherStatus.DELETED,
        value: "Deleted",
    },
]

export const TOP_NUMBER_LIST = [
    {
        key: 5,
        value: 5,
    },
    {
        key: 10,
        value: 10,
    },
    {
        key: 20,
        value: 20,
    },
    {
        key: 50,
        value: 50,
    },
]

export const ORDER_SORT_LIST = [
    {
        key: "ASC",
        value: "Ascending",
    },
    {
        key: "DESC",
        value: "Descending",
    },
]

export const RATING_OPTIONS = [
    {
        key: "all",
        value: "All",
    },
    {
        key: 5,
        value: "5 stars",
    },
    {
        key: 4,
        value: "4 stars",
    },
    {
        key: 3,
        value: "3 stars",
    },
    {
        key: 2,
        value: "2 stars",
    },
    {
        key: 1,
        value: "1 stars",
    },
]

export const MAX_FILE_SIZE_IN_MB = 2;