import { Button } from "@mui/material";
import classes from "./CustomButton.module.css";

function CustomButton({ type, children, color, isActive, ...props }) {
  return (
    <Button
      variant={isActive ? "contained" : type}
      className={isActive ? classes.isActive : undefined}
      sx={{
        color: { color },
      }}
      {...props}
    >
      {children}
    </Button>
  );
}

export default CustomButton;

const PrimaryButton = ({ children, sx, ...props }) => {
  return (
    <Button
      variant="contained"
      sx={{ backgroundColor: "var(--primaryColor)", py: 1, ...sx }}
      {...props}
    >
      {children}
    </Button>
  );
};

const SecondaryButton = ({ children, sx, ...props }) => {
  return (
    <Button
      variant="contained"
      sx={{ backgroundColor: "var(--secondaryColor)", py: 1, ...sx }}
      {...props}
    >
      {children}
    </Button>
  );
};

const PrimaryOutlineButton = ({ children, sx, ...props }) => {
  return (
    <Button variant="outlined" sx={{ color: "var(--primaryColor)", ...sx }} {...props}>
      {children}
    </Button>
  );
};

const SecondaryOutlineButton = ({ children, sx, ...props }) => {
  return (
    <Button
      variant="outlined"
      sx={{ backgroundColor: "var(--secondaryColor)", ...sx }}
      {...props}
    >
      {children}
    </Button>
  );
};

const TextButton = ({ children, sx, ...props }) => {
  return (
    <Button
      variant="text"
      sx={{
        color: "var(--colorGrey600)",
        "&:hover": {
          color: "var(--colorGrey800)",
          backgroundColor: "transparent",
        },
        ...sx,
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export {
  PrimaryButton,
  SecondaryButton,
  PrimaryOutlineButton,
  SecondaryOutlineButton,
  TextButton,
};
