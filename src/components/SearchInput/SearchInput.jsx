import css from "./SearchInput.module.css";
import { SearchIcon } from "../../icon/Icon";
import classNames from "classnames";
import { useState } from "react";
import { TextField } from "@mui/material";

const SearchInput = ({onSearch, placeholder, inputRef, style, noIconSearch = false}) => { 
    const [value, setValue] = useState("");
    return (
    //     <div className={classNames(css.searchBar)} style={style}>
    //         <input
    //             type="text"
    //             placeholder={placeholder}
    //             ref={inputRef}
    //         />
    //         {!noIconSearch && 
    //             <SearchIcon
    //                 onClick={onSearch}
    //                 className={classNames(css.searchIcon)}
    //             />
    //         }
    //   </div>
    <TextField
        variant="outlined"
        placeholder="test"
        // label={value ? " " : "my label"}
        slotProps={{ 
            inputLabel: {
                shrink: false
            },
         }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    )
}

export default SearchInput;