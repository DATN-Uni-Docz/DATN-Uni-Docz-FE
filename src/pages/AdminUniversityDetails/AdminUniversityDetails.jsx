import { Box, Typography } from "@mui/material";
import { useIntl } from "react-intl";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import AdminUniversityDetailsForm from "./components/AdminUniversityDetailsForm.jsx";
import { useEffect, useMemo, useState } from "react";
import handleError from "../../utils/handleError.js";
import { editUniversity, getUniversityByIdForAdmin } from "../../api/university/index.js";
import { toast } from "react-toastify";
import { AUTO_CLOSE_TOAST_DURATION, TABLE_LIMIT } from "../../constants/index.js";
import { omit } from "lodash";
import queryString from "query-string";
import { getCourseListForAdmin } from "../../api/course/index.js";
import SearchInputForm from "../../components/SearchInputForm/SearchInputForm.jsx";
import CustomTable from "../../components/CustomTable/CustomTable.jsx";
import css from "./AdminUniversityDetails.module.css";

const tableColumns = (intl) => [
  {
    name: "name",
    label: intl.formatMessage({
      id: "AdminUniversityDetails.courseTable.nameColumn",
    }),
    render: ({ name }) => name,
  },
  {
    name: "documentCount",
    label: intl.formatMessage({
      id: "AdminUniversityDetails.courseTable.documentCountColumn",
    }),
    render: ({ documentCount }) => documentCount,
  },
  {
    name: "saveCount",
    label: intl.formatMessage({
      id: "AdminUniversityDetails.courseTable.saveCountColumn",
    }),
    render: ({ saveCount }) => saveCount,
  },
  {
    name: "status",
    label: intl.formatMessage({
      id: "AdminUniversityDetails.courseTable.statusColumn",
    }),
    render: ({ status }) => status,
  },
];

const AdminUniversityDetails = () => {
  const { universityId } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = useMemo(() => {
    return queryString.parse(location.search, {
      arrayFormat: "comma",
      types: {
        page: "number",
      },
    });
  }, [location.search]);
  const { page = 1, keyword } = queryParams;
  const [courseList, setCourseList] = useState([]);
  const [paginationMetadata, setPaginationMetadata] = useState(null);
  const [university, setUniversity] = useState(null);
  const intl = useIntl();
  const initialUniversityValues = useMemo(() => {
    const {
      id,
      name,
      nameEn,
      universityCode,
      status,
      location,
      courseCount,
      documentCount,
      studentCount,
    } = university || {};
    return {
      id,
      name,
      nameEn,
      universityCode,
      status,
      location,
      courseCount,
      documentCount,
      studentCount,
    }
  }, [university]);

  const fetchUniversityData = async () => {
    try {
      setLoading(true);
      const response = await getUniversityByIdForAdmin(universityId);
      if (response) {
        setUniversity(response);
      }
    }
     catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditUniversity = async (values) => {
    try {
      const submittedValues = omit(values, ["id", "courseCount", "documentCount", "studentCount"]);
      if(!submittedValues.location) {
        submittedValues.location = '';
      }
      if(!submittedValues.universityCode) {
        submittedValues.universityCode = "";
      }
      await editUniversity(universityId, submittedValues);
      await fetchUniversityData();
      toast.success(
        intl.formatMessage({ id: "AdminUniversityDetails.updateSuccess" }),
        {
          autoClose: AUTO_CLOSE_TOAST_DURATION,
        }
      );
    }
    catch (error) {
      handleError(error);
      toast.error(intl.formatMessage({ id: "AdminUniversityDetails.updateErrorMessage" }), {
        autoClose: AUTO_CLOSE_TOAST_DURATION,
      });
    }
  }

  const handleOnChangePage = (event, value) => {
    const params = queryString.stringify(
      {
        ...queryParams,
        page: value,
      },
      {
        arrayFormat: "comma",
      }
    );
    navigate({
      pathname: location.pathname,
      search: params,
    });
  };

  const handleGetCourseList = async () => {
    try {
      const response = await getCourseListForAdmin({
        limit: TABLE_LIMIT,
        page,
        universityId,
        keyword: keyword || "", 
      });
      if (response) {
        const { results, page, limit, totalPages, totalResults } = response;
        setCourseList(results);
        setPaginationMetadata({
          page,
          limit,
          totalPages,
          totalResults,
        });
      }
    } catch (error) {
      handleError(error);
      toast.error(
        intl.formatMessage({ id: "AdminUniversityDetails.errorMessage" }),
        {
          autoClose: AUTO_CLOSE_TOAST_DURATION,
        }
      );
    }
  };

  const handleViewCourseDetails = (item) => {
    return navigate(`/admin/course/${item.id}`);
  };

  const onSearch = async (values) => {
    const { search } = values;
    const params = queryString.stringify({
      keyword: search,
    });
    navigate({
      pathname: location.pathname,
      search: params,
    });
  };

  useEffect(() => {
    fetchUniversityData();
  }, [universityId]);

  useEffect(() => {
    handleGetCourseList();
  }, [page, keyword]);

  return (
    <Box>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "500", fontSize: "28px" }}
      >
        {intl.formatMessage({ id: "AdminUniversityDetails.title" })}
      </Typography>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ fontWeight: "400", color: "var(--colorGrey400)", mb: 4 }}
      >
        {intl.formatMessage({ id: "AdminUniversityDetails.subtitle" })}
      </Typography>
      {!loading && (
        <>
          <AdminUniversityDetailsForm
            initialValues={{ ...initialUniversityValues }}
            onSubmit={handleEditUniversity}
          />
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: "500", mt: 4, mb: 2 }}
          >
            {intl.formatMessage({ id: "AdminUniversityDetails.courseListTitle" })}
          </Typography>
          <SearchInputForm
            className={css.searchInputWrapper}
            onSubmit={onSearch}
            searchPlaceholderText={intl.formatMessage({
              id: "AdminUniversityDetails.searchPlaceholder",
            })}
            options={[]}
            initialValues={{
              search: keyword,
            }}
          />
          <CustomTable
            tableColumns={tableColumns(intl)}
            data={courseList}
            viewAction={handleViewCourseDetails}
            page={page}
            onPageChange={handleOnChangePage}
            {...paginationMetadata}
          />
        </>
      )}
    </Box>
  );
}

export default AdminUniversityDetails;