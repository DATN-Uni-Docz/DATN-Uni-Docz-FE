import { TextField } from "@mui/material";
import { forwardRef } from "react";

const MyTextField = forwardRef(({color, fullWidth, smallSize, style,  ...props}, ref) => {
  return (
    <TextField
        {...props}
        inputRef={ref}
        InputLabelProps={{
            sx: {
                color: color,
                '&.Mui-focused': {
                    color: color, 
                },
            },
        }}
        sx={{
            width: fullWidth ? "100%" : null,
            ...style,
            "& .MuiOutlinedInput-root": {
                "& fieldset": {
                    borderColor: color,
                },
                "&.Mui-focused fieldset": {
                    borderColor: color, 
                },
            },
            "& .MuiInputBase-input": {
                color: color,
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: color,
            },
            ...(smallSize && {
                "& .MuiInputBase-input": {
                    paddingBottom: "0.7rem",
                    paddingTop: "0.7rem",
                    color: color,
                },
                "& .MuiInputLabel-root": {
                    transform: "translate(14px, 10px) scale(1)",
                },
                "& .MuiInputLabel-shrink": {
                    transform: "translate(14px, -10px) scale(0.75)", 
                },
            }),
        }}
    />
  );
});

export default MyTextField