import { Box, Typography } from "@mui/material";
import { useIntl } from "react-intl";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import AdminCourseDetailsForm from "./components/AdminCourseDetailsForm.jsx";
import { useEffect, useMemo, useState } from "react";
import handleError, { getError } from "../../utils/handleError.js";
import { editCourse, getCourseByIdForAdmin } from "../../api/course/index.js";
import { toast } from "react-toastify";
import { AUTO_CLOSE_TOAST_DURATION, LIMIT_SUGGESTION, TABLE_LIMIT, UNIVERSITY_STATUS } from "../../constants/index.js";
import { getUniversityListForAdmin } from "../../api/university/index.js";
import { omit } from "lodash";
import queryString from "query-string";
import { getDocumentListForAdmin } from "../../api/document/index.js";
import CustomTable from "../../components/CustomTable/CustomTable.jsx";
import css from "./AdminCourseDetails.module.css";
import SearchInputForm from "../../components/SearchInputForm/SearchInputForm.jsx";

const tableColumns = (intl) => [
  {
    name: "title",
    label: intl.formatMessage({
      id: "AdminCourseDetails.documentTable.titleColumn",
    }),
    render: ({ title }) => title,
  },
  {
    name: "downloadCount",
    label: intl.formatMessage({
      id: "AdminCourseDetails.documentTable.downloadCountColumn",
    }),
    render: ({ downloadCount }) => downloadCount,
  },
  {
    name: "saveCount",
    label: intl.formatMessage({
      id: "AdminCourseDetails.documentTable.saveCountColumn",
    }),
    render: ({ saveCount }) => saveCount,
  },
  {
    name: "updatedAt",
    label: intl.formatMessage({
      id: "AdminCourseDetails.documentTable.updatedAtColumn",
    }),
    render: ({ updatedAt }) => 
      intl.formatDate(updatedAt, {
        year: "numeric",
        month: "long",
        day: "2-digit",
      })
  },
  {
    name: "status",
    label: intl.formatMessage({
      id: "AdminCourseDetails.documentTable.statusColumn",
    }),
    render: ({ status }) => status,
  },
];

const AdminCourseDetails = () => {
  const { courseId } = useParams();
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
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState(null);
  const intl = useIntl();
  const [universityOptions, setUniversityOptions] = useState([])
  const [searchOptions, setSearchOptions] = useState([]);
  const [documentList, setDocumentList] = useState([]);
  const [paginationMetadata, setPaginationMetadata] = useState(null);
  const initialCourseValues = useMemo(() => {
    const {
      id,
      name,
      description,
      university,
      status,
      documentCount,
      saveCount
    } = course || {};
    return {
      id,
      name,
      status,
      description,
      universityId: university?.id,
      documentCount,
      saveCount
    }
  }, [course]);
  const isUniversityPublic = course?.university?.status === UNIVERSITY_STATUS.PUBLIC;

  const handleGetUniversityList = async (keyword) => {
    try {
      const response = await getUniversityListForAdmin(
        {
          keyword: keyword ?? "",
          limit: LIMIT_SUGGESTION
        }
      )
      setUniversityOptions(response?.results || []);
    }
    catch(err) {
      handleError(err)
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

  const handleGetDocumentList = async () => {
    try {
      const response = await getDocumentListForAdmin({
        limit: TABLE_LIMIT,
        page,
        courseId,
        keyword: keyword || "", 
      });
      if (response) {
        const { results, page, limit, totalPages, totalResults } = response;
        setDocumentList(results);
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
        intl.formatMessage({ id: "AdminCourseDetails.errorMessage" }),
        {
          autoClose: AUTO_CLOSE_TOAST_DURATION,
        }
      );
    }
  };

  const handleViewDocumentDetails = (item) => {
    return navigate(`/admin/document/${item.id}`);
  };

  const fetchCourseData = async () => {
    try {
      setLoading(true);
      const response = await getCourseByIdForAdmin(courseId);
      if (response) {
        setCourse(response);
        setUniversityOptions(response?.university ? [response?.university] : []);
      }
    }
     catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditCourse = async (values) => {
    try {
      const submittedValues = omit(values, ["id", "documentCount", "saveCount"]);
      await editCourse(courseId, submittedValues);
      await fetchCourseData();
      toast.success(
        intl.formatMessage({ id: "AdminCourseDetails.updateSuccess" }),
        {
          autoClose: AUTO_CLOSE_TOAST_DURATION,
        }
      );
    }
    catch (error) {
      handleError(error);
      toast.error(getError(error), {
        autoClose: AUTO_CLOSE_TOAST_DURATION,
      });
    }
  }

  // const handleOnInputChange = async (event, value) => {
  //   try {
  //     const response = await getDocumentListForAdmin({
  //       page: 1,
  //       limit: LIMIT_SUGGESTION,
  //       keyword: value || "",
  //     });
  //     if (response) {
  //       const { results } = response;
  //       setSearchOptions(
  //         results.length > 0
  //           ? results.map((item) => ({
  //               value: item.title,
  //             }))
  //           : []
  //       );
  //     }
  //   } catch (err) {
  //     handleError(err);
  //   }
  // };

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
    fetchCourseData();
  }, [courseId]);

  useEffect(() => {
    handleGetDocumentList();
  }, [page, keyword]);

  return (
    <Box>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "500", fontSize: "28px" }}
      >
        {intl.formatMessage({ id: "AdminCourseDetails.title" })}
      </Typography>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ fontWeight: "400", color: "var(--colorGrey400)", mb: 4 }}
      >
        {intl.formatMessage({ id: "AdminCourseDetails.subtitle" })}
      </Typography>
      {!loading && (
        <>
          <AdminCourseDetailsForm
            universityOptions={universityOptions}
            handleOnInputUniversity={handleGetUniversityList}
            initialValues={{ ...initialCourseValues }}
            onSubmit={handleEditCourse}
            isUniversityPublic={isUniversityPublic}
          />
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: "500", mt: 4, mb: 2 }}
          >
            {intl.formatMessage({ id: "AdminCourseDetails.documentListTitle" })}
          </Typography>
          <SearchInputForm
            className={css.searchInputWrapper}
            onSubmit={onSearch}
            searchPlaceholderText={intl.formatMessage({
              id: "AdminCourseDetails.searchPlaceholder",
            })}
            options={[]}
            initialValues={{
              search: keyword,
            }}
          />
          <CustomTable
            tableColumns={tableColumns(intl)}
            data={documentList}
            viewAction={handleViewDocumentDetails}
            page={page}
            onPageChange={handleOnChangePage}
            {...paginationMetadata}
          />
        </>
      )}
    </Box>
  );
}

export default AdminCourseDetails;