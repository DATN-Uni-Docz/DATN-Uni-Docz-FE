import { CloseOutlined, TuneOutlined } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import SearchFilterForm from "../SearchFilterForm/SearchFilterForm";
import useSearchForm from "../../../../hook/useSearchForm";
import { useNavigate } from "react-router-dom";
import queryString from "query-string";

const SearchFilterPanel = (props) => {
  const { intl, onClose, currentTab, queryParams } = props;
  const { keyword, tab } = queryParams || {};
  const navigate = useNavigate();
  const {
    options: { courseList, universityList },
    handleGetCourseList,
    handleGetUniversityList,
    universityLoading,
    courseLoading,
    initialValues
  } = useSearchForm();

  const onSubmit = (values) => {
    const { courseId, universityId, documentType } = values || {};
    const submitValues = {
      ...(courseId && { courseId }),
      ...(universityId && { universityId }),
      ...(documentType && { documentType }),
      keyword,
      tab,
      page: 1,
    };
    navigate({
      pathname: "/s",
      search: queryString.stringify(submitValues, { arrayFormat: "comma" }),
    });
    onClose();
  };

  const handleReset = () => {
    navigate({
      pathname: "/s",
      search: queryString.stringify({
        keyword,
        tab
      }),
    });
    onClose();
  }

  return (
    <Box sx={{ width: "360px", py: 3, px: 3 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 4,
        }}
      >
        <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <TuneOutlined />
          <Typography variant="h6" sx={{ fontWeight: "500", fontSize: "20px" }}>
            {intl.formatMessage({ id: "MainSearch.filterPanel.title" })}
          </Typography>
        </Box>
        <CloseOutlined
          sx={{
            cursor: "pointer",
          }}
          onClick={onClose}
        />
      </Box>
      <SearchFilterForm
        intl={intl}
        onSubmit={onSubmit}
        courseOptions={courseList}
        universityOptions={universityList}
        handleOnInputUniversity={handleGetUniversityList}
        handleOnInputCourse={handleGetCourseList}
        initialValues={initialValues}
        currentTab={currentTab}
        onReset={handleReset}
      />
    </Box>
  );
};

export default SearchFilterPanel;
