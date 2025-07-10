import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

function Search({className}) {
    return (
        <TextField
            variant="outlined"
            placeholder="Search..."
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton>
                        <SearchIcon />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
            sx={{
                borderRadius: "20px",
                width: "250px",
                "& .MuiOutlinedInput-root": {
                    borderRadius: "20px",
                },
                "& .MuiOutlinedInput-input": {
                    padding: '8px 1rem',
                },
            }}
            className={className}
        />
    )
}

export default Search