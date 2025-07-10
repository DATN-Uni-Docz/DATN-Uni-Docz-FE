import css from "./SearchInputForm.module.css";
import classNames from "classnames";
import { Box } from "@mui/material";
import { Autocomplete } from "mui-rff";
import { Form } from "react-final-form";
import { SearchOutlined } from "@mui/icons-material";
import { string, func, array } from "prop-types";
import { useIntl } from "react-intl";

const SearchInputFormComponent = (props) => {
  const { options = [], handleSubmit, className, handleOnInputChange, searchPlaceholderText } = props;
  const intl = useIntl();

  return (
    <form
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
            zIndex: 1,
          }}
        />
        <Autocomplete
          name="search"
          placeholder={
            searchPlaceholderText ||
            intl.formatMessage({
              id: "SearchInputForm.placeholder",
            })
          }
          options={options.map((item) => item.value)}
          // disableClearable
          freeSolo
          sx={{
            "& .MuiOutlinedInput-root": {
              padding: "8px 12px",
              borderRadius: "10px",
              pl: "40px",
              backgroundColor: "var(--colorWhite)",
              color: "var(--colorGrey800)",
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
  handleOnInputChange: func,
}

const SearchInputForm = (props) => {
  return <Form component={SearchInputFormComponent} {...props} />;
};

export default SearchInputForm;
