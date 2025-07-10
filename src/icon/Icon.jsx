import { node, string, func } from "prop-types";

export const ProductIcon = ({
  width = "1.2rem",
  height = "1.2rem",
  className = "",
  onClick = () => { },
}) => (
  <svg
    className={className}
    width={width}
    height={height}
    onClick={onClick}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
  >
    <path d="M160 112c0-35.3 28.7-64 64-64s64 28.7 64 64l0 48-128 0 0-48zm-48 48l-64 0c-26.5 0-48 21.5-48 48L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-208c0-26.5-21.5-48-48-48l-64 0 0-48C336 50.1 285.9 0 224 0S112 50.1 112 112l0 48zm24 48a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm152 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z" />
  </svg>
);

export const CategoryIcon = ({
  width = "1.2rem",
  height = "1.2rem",
  className = "",
  onClick = () => { },
}) => (
  <svg
    className={className}
    width={width}
    height={height}
    onClick={onClick}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
  >
    <path d="M448 96l0 128-160 0 0-128 160 0zm0 192l0 128-160 0 0-128 160 0zM224 224L64 224 64 96l160 0 0 128zM64 288l160 0 0 128L64 416l0-128zM64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32z" />
  </svg>
);

export const OrderIcon = ({
  width = "1.2rem",
  height = "1.2rem",
  className = "",
  onClick = () => { },
}) => (
  <svg
    className={className}
    width={width}
    height={height}
    onClick={onClick}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 384 512"
  >
    <path d="M192 0c-41.8 0-77.4 26.7-90.5 64L64 64C28.7 64 0 92.7 0 128L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64l-37.5 0C269.4 26.7 233.8 0 192 0zm0 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM112 192l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16z" />
  </svg>
);

export const UserIcon = ({
  width = "1.2rem",
  height = "1.2rem",
  className = "",
  onClick = () => { },
}) => (
  <svg
    className={className}
    width={width}
    height={height}
    onClick={onClick}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
  >
    <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
  </svg>
);

export const UserRegularIcon = ({
  width = "1.2rem",
  height = "1.2rem",
  className = "",
  onClick = () => { },
}) => (
  <svg
    className={className}
    width={width}
    height={height}
    onClick={onClick}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
  >
    <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464l349.5 0c-8.9-63.3-63.3-112-129-112l-91.4 0c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3z" />
  </svg>
);

export const CartIcon = ({
  width = "1.2rem",
  height = "1.2rem",
  className = "",
  onClick = () => { },
}) => (
  <svg
    className={className}
    width={width}
    height={height}
    onClick={onClick}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 576 512"
  >
    <path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
  </svg>
);

export const ChartIcon = ({
  width = "1.2rem",
  height = "1.2rem",
  className = "",
  onClick = () => { },
}) => (
  <svg
    className={className}
    width={width}
    height={height}
    onClick={onClick}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
  >
    <path d="M160 80c0-26.5 21.5-48 48-48l32 0c26.5 0 48 21.5 48 48l0 352c0 26.5-21.5 48-48 48l-32 0c-26.5 0-48-21.5-48-48l0-352zM0 272c0-26.5 21.5-48 48-48l32 0c26.5 0 48 21.5 48 48l0 160c0 26.5-21.5 48-48 48l-32 0c-26.5 0-48-21.5-48-48L0 272zM368 96l32 0c26.5 0 48 21.5 48 48l0 288c0 26.5-21.5 48-48 48l-32 0c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48z" />
  </svg>
);

export const SearchIcon = ({
  width = "1.2rem",
  height = "1.2rem",
  className = "",
  onClick = () => { },
}) => (
  <svg
    className={className}
    width={width}
    height={height}
    onClick={onClick}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
      clipRule="evenodd"
    />
  </svg>
);

export const NotificationIcon = ({
  width = "1.2rem",
  height = "1.2rem",
  className = "",
  onClick = () => { },
}) => (
  <svg
    className={className}
    width={width}
    height={height}
    onClick={onClick}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
  >
    <path d="M224 0c-17.7 0-32 14.3-32 32l0 19.2C119 66 64 130.6 64 208l0 18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416l384 0c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8l0-18.8c0-77.4-55-142-128-156.8L256 32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3l-64 0-64 0c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z" />
  </svg>
);

export const BackIcon = ({
  width = "1.2rem",
  height = "1.2rem",
  className = "",
  onClick = () => { },
}) => (
  <svg
    className={className}
    width={width}
    height={height}
    onClick={onClick}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.7071 4.29289C12.0976 4.68342 12.0976 5.31658 11.7071 5.70711L6.41421 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H6.41421L11.7071 18.2929C12.0976 18.6834 12.0976 19.3166 11.7071 19.7071C11.3166 20.0976 10.6834 20.0976 10.2929 19.7071L3.29289 12.7071C3.10536 12.5196 3 12.2652 3 12C3 11.7348 3.10536 11.4804 3.29289 11.2929L10.2929 4.29289C10.6834 3.90237 11.3166 3.90237 11.7071 4.29289Z"
      fill="#000"
    />
  </svg>
);

export const EmailIcon = ({
  width = "1.2rem",
  height = "1.2rem",
  className = "",
  onClick = () => { },
}) => (
  <svg
    className={className}
    width={width}
    height={height}
    onClick={onClick}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
  >
    <path d="M64 112c-8.8 0-16 7.2-16 16l0 22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1l0-22.1c0-8.8-7.2-16-16-16L64 112zM48 212.2L48 384c0 8.8 7.2 16 16 16l384 0c8.8 0 16-7.2 16-16l0-171.8L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64l384 0c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64L64 448c-35.3 0-64-28.7-64-64L0 128z" />
  </svg>
);

export const PhoneIcon = ({
  width = "1.2rem",
  height = "1.2rem",
  className = "",
  onClick = () => { },
}) => (
  <svg
    className={className}
    width={width}
    height={height}
    onClick={onClick}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
  >
    <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
  </svg>
);

export const FacebookIcon = ({
  width = "1.2rem",
  height = "1.2rem",
  className = "",
  onClick = () => { },
}) => (
  <svg
    className={className}
    width={width}
    height={height}
    onClick={onClick}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
  >
    <path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z" />
  </svg>
);

export const InstagramIcon = ({
  width = "1.2rem",
  height = "1.2rem",
  className = "",
  onClick = () => { },
}) => (
  <svg
    className={className}
    width={width}
    height={height}
    onClick={onClick}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
  >
    <path d="M194.4 211.7a53.3 53.3 0 1 0 59.3 88.7 53.3 53.3 0 1 0 -59.3-88.7zm142.3-68.4c-5.2-5.2-11.5-9.3-18.4-12c-18.1-7.1-57.6-6.8-83.1-6.5c-4.1 0-7.9 .1-11.2 .1c-3.3 0-7.2 0-11.4-.1c-25.5-.3-64.8-.7-82.9 6.5c-6.9 2.7-13.1 6.8-18.4 12s-9.3 11.5-12 18.4c-7.1 18.1-6.7 57.7-6.5 83.2c0 4.1 .1 7.9 .1 11.1s0 7-.1 11.1c-.2 25.5-.6 65.1 6.5 83.2c2.7 6.9 6.8 13.1 12 18.4s11.5 9.3 18.4 12c18.1 7.1 57.6 6.8 83.1 6.5c4.1 0 7.9-.1 11.2-.1c3.3 0 7.2 0 11.4 .1c25.5 .3 64.8 .7 82.9-6.5c6.9-2.7 13.1-6.8 18.4-12s9.3-11.5 12-18.4c7.2-18 6.8-57.4 6.5-83c0-4.2-.1-8.1-.1-11.4s0-7.1 .1-11.4c.3-25.5 .7-64.9-6.5-83l0 0c-2.7-6.9-6.8-13.1-12-18.4zm-67.1 44.5A82 82 0 1 1 178.4 324.2a82 82 0 1 1 91.1-136.4zm29.2-1.3c-3.1-2.1-5.6-5.1-7.1-8.6s-1.8-7.3-1.1-11.1s2.6-7.1 5.2-9.8s6.1-4.5 9.8-5.2s7.6-.4 11.1 1.1s6.5 3.9 8.6 7s3.2 6.8 3.2 10.6c0 2.5-.5 5-1.4 7.3s-2.4 4.4-4.1 6.2s-3.9 3.2-6.2 4.2s-4.8 1.5-7.3 1.5l0 0c-3.8 0-7.5-1.1-10.6-3.2zM448 96c0-35.3-28.7-64-64-64H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96zM357 389c-18.7 18.7-41.4 24.6-67 25.9c-26.4 1.5-105.6 1.5-132 0c-25.6-1.3-48.3-7.2-67-25.9s-24.6-41.4-25.8-67c-1.5-26.4-1.5-105.6 0-132c1.3-25.6 7.1-48.3 25.8-67s41.5-24.6 67-25.8c26.4-1.5 105.6-1.5 132 0c25.6 1.3 48.3 7.1 67 25.8s24.6 41.4 25.8 67c1.5 26.3 1.5 105.4 0 131.9c-1.3 25.6-7.1 48.3-25.8 67z" />
  </svg>
);

export const TwitterIcon = ({
  width = "1.2rem",
  height = "1.2rem",
  className = "",
  onClick = () => { },
}) => (
  <svg
    className={className}
    width={width}
    height={height}
    onClick={onClick}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
  >
    <path d="M459.4 151.7c.3 4.5 .3 9.1 .3 13.6 0 138.7-105.6 298.6-298.6 298.6-59.5 0-114.7-17.2-161.1-47.1 8.4 1 16.6 1.3 25.3 1.3 49.1 0 94.2-16.6 130.3-44.8-46.1-1-84.8-31.2-98.1-72.8 6.5 1 13 1.6 19.8 1.6 9.4 0 18.8-1.3 27.6-3.6-48.1-9.7-84.1-52-84.1-103v-1.3c14 7.8 30.2 12.7 47.4 13.3-28.3-18.8-46.8-51-46.8-87.4 0-19.5 5.2-37.4 14.3-53 51.7 63.7 129.3 105.3 216.4 109.8-1.6-7.8-2.6-15.9-2.6-24 0-57.8 46.8-104.9 104.9-104.9 30.2 0 57.5 12.7 76.7 33.1 23.7-4.5 46.5-13.3 66.6-25.3-7.8 24.4-24.4 44.8-46.1 57.8 21.1-2.3 41.6-8.1 60.4-16.2-14.3 20.8-32.2 39.3-52.6 54.3z" />
  </svg>
);

export const PlusIcon = ({
  width = "1.2rem",
  height = "1.2rem",
  className = "",
  onClick = () => { },
}) => (
  <svg
    className={className}
    width={width}
    height={height}
    onClick={onClick}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
  >
    <path d="M432 256c0 13.3-10.7 24-24 24h-152v152c0 13.3-10.7 24-24 24s-24-10.7-24-24V280H56c-13.3 0-24-10.7-24-24s10.7-24 24-24h152V80c0-13.3 10.7-24 24-24s24 10.7 24 24v152h152c13.3 0 24 10.7 24 24z" />
  </svg>
);

export const MinusIcon = ({
  width = "1.2rem",
  height = "1.2rem",
  className = "",
  onClick = () => { },
}) => (
  <svg
    className={className}
    width={width}
    height={height}
    onClick={onClick}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
  >
    <path d="M432 256c0 13.3-10.7 24-24 24H40c-13.3 0-24-10.7-24-24s10.7-24 24-24h368c13.3 0 24 10.7 24 24z" />
  </svg>
);

export const AllArrowIcon = ({
  width = "1.2rem",
  height = "1.2rem",
  className = "",
  onClick = () => { },
}) => (
  <svg
    className={className}
    width={width}
    height={height}
    onClick={onClick}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
  >
    <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
  </svg>
);

export const ChevronLeftIcon = ({
  width = "1.2rem",
  height = "1.2rem",
  className = "",
  color = "currentColor",
  onClick = () => { },
}) => (
  <svg
    className={className}
    width={width}
    height={height}
    onClick={onClick}
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 320 512"
  >
    <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
  </svg>
);

export const ChevronRightIcon = ({
  width = "1.2rem",
  height = "1.2rem",
  className = "",
  color = "currentColor",
  onClick = () => { },
}) => (
  <svg
    className={className}
    width={width}
    height={height}
    onClick={onClick}
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 320 512"
  >
    <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
  </svg>
);

export const VoucherIcon = ({
  width = "1.2rem",
  height = "1.2rem",
  className = "",
  onClick = () => { },
}) => (
  <svg
    width={width}
    height={height}
    onClick={onClick}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M14.8 8L16 9.2L9.2 16L8 14.8L14.8 8ZM4 4H20C21.11 4 22 4.89 22 6V10C21.4696 10 20.9609 10.2107 20.5858 10.5858C20.2107 10.9609 20 11.4696 20 12C20 12.5304 20.2107 13.0391 20.5858 13.4142C20.9609 13.7893 21.4696 14 22 14V18C22 19.11 21.11 20 20 20H4C3.46957 20 2.96086 19.7893 2.58579 19.4142C2.21071 19.0391 2 18.5304 2 18V14C3.11 14 4 13.11 4 12C4 11.4696 3.78929 10.9609 3.41421 10.5858C3.03914 10.2107 2.53043 10 2 10V6C2 5.46957 2.21071 4.96086 2.58579 4.58579C2.96086 4.21071 3.46957 4 4 4ZM4 6V8.54C4.60768 8.8904 5.11236 9.39466 5.46325 10.0021C5.81415 10.6094 5.9989 11.2985 5.9989 12C5.9989 12.7015 5.81415 13.3906 5.46325 13.9979C5.11236 14.6053 4.60768 15.1096 4 15.46V18H20V15.46C19.3923 15.1096 18.8876 14.6053 18.5367 13.9979C18.1858 13.3906 18.0011 12.7015 18.0011 12C18.0011 11.2985 18.1858 10.6094 18.5367 10.0021C18.8876 9.39466 19.3923 8.8904 20 8.54V6H4ZM9.5 8C10.33 8 11 8.67 11 9.5C11 10.33 10.33 11 9.5 11C8.67 11 8 10.33 8 9.5C8 8.67 8.67 8 9.5 8ZM14.5 13C15.33 13 16 13.67 16 14.5C16 15.33 15.33 16 14.5 16C13.67 16 13 15.33 13 14.5C13 13.67 13.67 13 14.5 13Z"
      fill="#141718"
    />
  </svg>
);

export const DeliveringIcon = ({
  width = "1.2rem",
  height = "1.2rem",
  className = "",
  onClick = () => { },
}) => (
  <svg
    width={width}
    height={height}
    onClick={onClick}
    viewBox="0 0 640 512"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path fill="#141718" d="M112 0C85.5 0 64 21.5 64 48l0 48L16 96c-8.8 0-16 7.2-16 16s7.2 16 16 16l48 0 208 0c8.8 0 16 7.2 16 16s-7.2 16-16 16L64 160l-16 0c-8.8 0-16 7.2-16 16s7.2 16 16 16l16 0 176 0c8.8 0 16 7.2 16 16s-7.2 16-16 16L64 224l-48 0c-8.8 0-16 7.2-16 16s7.2 16 16 16l48 0 144 0c8.8 0 16 7.2 16 16s-7.2 16-16 16L64 288l0 128c0 53 43 96 96 96s96-43 96-96l128 0c0 53 43 96 96 96s96-43 96-96l32 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l0-64 0-32 0-18.7c0-17-6.7-33.3-18.7-45.3L512 114.7c-12-12-28.3-18.7-45.3-18.7L416 96l0-48c0-26.5-21.5-48-48-48L112 0zM544 237.3l0 18.7-128 0 0-96 50.7 0L544 237.3zM160 368a48 48 0 1 1 0 96 48 48 0 1 1 0-96zm272 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0z" />
  </svg>
);


export const CoinIcon = ({
  width = "1.2rem",
  height = "1.2rem",
  className = "",
  onClick = () => { },
}) => (
  <svg
    width={width}
    height={height}
    onClick={onClick}
    viewBox="0 0 512 512"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path fill="#141718" d="M512 80c0 18-14.3 34.6-38.4 48c-29.1 16.1-72.5 27.5-122.3 30.9c-3.7-1.8-7.4-3.5-11.3-5C300.6 137.4 248.2 128 192 128c-8.3 0-16.4 .2-24.5 .6l-1.1-.6C142.3 114.6 128 98 128 80c0-44.2 86-80 192-80S512 35.8 512 80zM160.7 161.1c10.2-.7 20.7-1.1 31.3-1.1c62.2 0 117.4 12.3 152.5 31.4C369.3 204.9 384 221.7 384 240c0 4-.7 7.9-2.1 11.7c-4.6 13.2-17 25.3-35 35.5c0 0 0 0 0 0c-.1 .1-.3 .1-.4 .2c0 0 0 0 0 0s0 0 0 0c-.3 .2-.6 .3-.9 .5c-35 19.4-90.8 32-153.6 32c-59.6 0-112.9-11.3-148.2-29.1c-1.9-.9-3.7-1.9-5.5-2.9C14.3 274.6 0 258 0 240c0-34.8 53.4-64.5 128-75.4c10.5-1.5 21.4-2.7 32.7-3.5zM416 240c0-21.9-10.6-39.9-24.1-53.4c28.3-4.4 54.2-11.4 76.2-20.5c16.3-6.8 31.5-15.2 43.9-25.5l0 35.4c0 19.3-16.5 37.1-43.8 50.9c-14.6 7.4-32.4 13.7-52.4 18.5c.1-1.8 .2-3.5 .2-5.3zm-32 96c0 18-14.3 34.6-38.4 48c-1.8 1-3.6 1.9-5.5 2.9C304.9 404.7 251.6 416 192 416c-62.8 0-118.6-12.6-153.6-32C14.3 370.6 0 354 0 336l0-35.4c12.5 10.3 27.6 18.7 43.9 25.5C83.4 342.6 135.8 352 192 352s108.6-9.4 148.1-25.9c7.8-3.2 15.3-6.9 22.4-10.9c6.1-3.4 11.8-7.2 17.2-11.2c1.5-1.1 2.9-2.3 4.3-3.4l0 3.4 0 5.7 0 26.3zm32 0l0-32 0-25.9c19-4.2 36.5-9.5 52.1-16c16.3-6.8 31.5-15.2 43.9-25.5l0 35.4c0 10.5-5 21-14.9 30.9c-16.3 16.3-45 29.7-81.3 38.4c.1-1.7 .2-3.5 .2-5.3zM192 448c56.2 0 108.6-9.4 148.1-25.9c16.3-6.8 31.5-15.2 43.9-25.5l0 35.4c0 44.2-86 80-192 80S0 476.2 0 432l0-35.4c12.5 10.3 27.6 18.7 43.9 25.5C83.4 438.6 135.8 448 192 448z" />
  </svg>
);

export const CircleAlert = ({
  width = "1.2rem",
  height = "1.2rem",
  className = "",
  onClick = () => {},
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    width={width}
    height={height}
    onClick={onClick}
    className={className}
  >
    <path
      fill="#74C0FC"
      d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24l0 112c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-112c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"
    />
  </svg>
);

const iconPropTypes = {
  children: node,
  className: string,
  width: string,
  height: string,
  onClick: func,
};

ProductIcon.propTypes = iconPropTypes;
CategoryIcon.propTypes = iconPropTypes;
OrderIcon.propTypes = iconPropTypes;
UserIcon.propTypes = iconPropTypes;
ChartIcon.propTypes = iconPropTypes;
SearchIcon.propTypes = iconPropTypes;
NotificationIcon.propTypes = iconPropTypes;
BackIcon.propTypes = iconPropTypes;
UserRegularIcon.propTypes = iconPropTypes;
CartIcon.propTypes = iconPropTypes;
FacebookIcon.propTypes = iconPropTypes;
InstagramIcon.propTypes = iconPropTypes;
TwitterIcon.propTypes = iconPropTypes;
PhoneIcon.propTypes = iconPropTypes;
EmailIcon.propTypes = iconPropTypes;
PlusIcon.propTypes = iconPropTypes;
MinusIcon.propTypes = iconPropTypes;
AllArrowIcon.propTypes = iconPropTypes;
ChevronLeftIcon.propTypes = iconPropTypes;
ChevronRightIcon.propTypes = iconPropTypes;
VoucherIcon.propTypes = iconPropTypes;
DeliveringIcon.propTypes = iconPropTypes;
CoinIcon.propTypes = iconPropTypes;
CircleAlert.propTypes = iconPropTypes;
