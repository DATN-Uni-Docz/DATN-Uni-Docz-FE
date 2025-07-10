import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { forwardRef } from "react";


const SelectCustom = forwardRef(({label, handleChange, value, menuList, style, smallSize, color="var(--admin-color)", ...props}, ref) => {
    return (
        <FormControl 
            sx={{...style}}
        >
            <InputLabel 
                id="demo-simple-select-label"
                sx={{
                    color: color,
                    "&.Mui-focused": {
                        color: color, 
                    },
                }}
            >
                {label}
            </InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                label={label}
                onChange={handleChange}
                inputRef={ref}
                {...props}
                sx={{
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                            borderColor: color,
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: color, 
                        },
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: color,
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: color,
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: color,
                    },
                    "& .MuiInputBase-input": {
                        color: color,
                    },
                    "& .MuiSelect-icon": {
                        color: color,
                    },
                    ...(smallSize && {
                        "& .MuiInputBase-input": {
                          paddingBottom: "0.7rem",
                          paddingTop: "0.7rem",
                          color: color,
                        },
                    }),
                }}
            >
                {menuList?.map((item) => (
                    <MenuItem value={item.key}>{item.value}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
});

export default SelectCustom;
