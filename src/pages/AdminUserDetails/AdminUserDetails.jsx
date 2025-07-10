import { Box, Typography } from "@mui/material";
import { useIntl } from "react-intl";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import AdminUserDetailsForm from "./components/AdminUserDetailsForm.jsx";
import { useEffect, useMemo, useState } from "react";
import handleError from "../../utils/handleError.js";
import { AUTO_CLOSE_TOAST_DURATION, LONG_DATE_FORMAT, TABLE_LIMIT } from "../../constants/index.js";
import { getUserById } from "../../api/user/index.js";
import queryString from "query-string";
import SearchInputForm from "../../components/SearchInputForm/SearchInputForm.jsx";
import CustomTable from "../../components/CustomTable/CustomTable.jsx";
import css from "./AdminUserDetails.module.css";
import { toast } from "react-toastify";
import { getDocumentListForAdmin } from "../../api/document/index.js";

const tableColumns = (intl) => [
  {
    name: "title",
    label: intl.formatMessage({
      id: "AdminUserDetails.documentTable.titleColumn",
    }),
    render: ({ title }) => title,
  },
  {
    name: "downloadCount",
    label: intl.formatMessage({
      id: "AdminUserDetails.documentTable.downloadCountColumn",
    }),
    render: ({ downloadCount }) => downloadCount,
  },
  {
    name: "saveCount",
    label: intl.formatMessage({
      id: "AdminUserDetails.documentTable.saveCountColumn",
    }),
    render: ({ saveCount }) => saveCount,
  },
  {
    name: "updatedAt",
    label: intl.formatMessage({
      id: "AdminUserDetails.documentTable.updatedAtColumn",
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
      id: "AdminUserDetails.documentTable.statusColumn",
    }),
    render: ({ status }) => status,
  },
];

const AdminUserDetails = () => {
  const { userId } = useParams();
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
  const [user, setUser] = useState(null);
  const [documentList, setDocumentList] = useState([]);
  const [paginationMetadata, setPaginationMetadata] = useState(null);
  const intl = useIntl();
  const initialUserValues = useMemo(() => {
    const {
      id,
      email,
      firstName,
      lastName,
      createdAt,
      updatedAt,
      university,
      documentCount,
      status
    } = user || {};
    return {
      id,
      email,
      firstName,
      lastName,
      createdAt: intl.formatDate(createdAt, LONG_DATE_FORMAT),
      updatedAt: intl.formatDate(updatedAt, LONG_DATE_FORMAT),
      universityId: university?.id || "No university",
      universityName: university?.name || "No university",
      documentCount: documentCount || 0,
      status: status
    }
  }, [user, intl]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await getUserById(userId);
      if (response) {
        setUser(response);
      }
    }
     catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

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
        userId,
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
        intl.formatMessage({ id: "AdminUserDetails.errorMessage" }),
        {
          autoClose: AUTO_CLOSE_TOAST_DURATION,
        }
      );
    }
  };

  const handleViewDocumentDetails = (item) => {
    return navigate(`/admin/document/${item.id}`);
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
    fetchUserData();
  }, [userId]);

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
        {intl.formatMessage({ id: "AdminUserDetails.title" })}
      </Typography>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ fontWeight: "400", color: "var(--colorGrey400)", mb: 4 }}
      >
        {intl.formatMessage({ id: "AdminUserDetails.subtitle" })}
      </Typography>
      {!loading && (
        <>
          <AdminUserDetailsForm
            initialValues={{ ...initialUserValues }}
            onSubmit={() => {}}
          />
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: "500", mt: 4, mb: 2 }}
          >
            {intl.formatMessage({ id: "AdminUserDetails.documentListTitle" })}
          </Typography>
          <SearchInputForm
            className={css.searchInputWrapper}
            onSubmit={onSearch}
            searchPlaceholderText={intl.formatMessage({
              id: "AdminUserDetails.searchPlaceholder",
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

export default AdminUserDetails;