import css from "./SearchInputForm.module.css";
// import { SearchIcon } from "../../icon/Icon";
import classNames from "classnames";
import { useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { Autocomplete } from "mui-rff";
import { Form } from "react-final-form";
import { History, SearchOutlined } from "@mui/icons-material";
import { string, func, array, shape } from "prop-types";
import { useIntl } from "react-intl";
import { RECENT_GROUP } from "../../../../../constants";

const SearchInputFormComponent = (props) => {
  const { options, handleSubmit, className, handleOnInputChange, ...rest } = props;
  const intl = useIntl();

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
    <form
      // onKeyDown={(e) => {
      //   return e.key !== 'Enter'
      // }}
      onSubmit={handleSubmit}
      className={classNames(css.container, className)}
    >
      <Box sx={{ position: "relative" }}>
        <SearchOutlined
          sx={{
            position: "absolute",
            left: "14px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "var(--colorGrey300)",
          }}
        />
        <Autocomplete
          name="documentSearch"
          placeholder={intl.formatMessage({
            id: "NavbarUser.SearchInputForm.placeholder",
          })}
          options={options.map((item) => item.value)}
          renderGroup={(params) => (
            <Box
              key={params.key}
              // mt={2}
              // mb={1}
              // bgcolor="#f5f5f5"
              // borderRadius={2}
              // padding={1}
            >
              {/* <Typography
              variant="h6"
              color="primary"
              display="flex"
              alignItems="center"
            > */}
              {params.group === RECENT_GROUP && (
                <History style={{ marginRight: "8px" }} />
              )}
              {/* </Typography> */}
              {params.children}
            </Box>
          )}
          // disableClearable
          freeSolo
          sx={{
            "& .MuiOutlinedInput-root": {
              padding: "4px 12px",
              borderRadius: "20px",
              pl: "36px",
            },
          }}
          onInputChange={handleOnInputChange}
        />
      </Box>
    </form>
  );
};

SearchInputFormComponent.propTypes = {
  handleSubmit: func,
  className: string,
  options: array,
}

const SearchInputForm = (props) => {
  return <Form component={SearchInputFormComponent} {...props} />;
};

export default SearchInputForm;
