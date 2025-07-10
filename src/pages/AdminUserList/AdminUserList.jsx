import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import queryString from "query-string";
import { useEffect, useMemo, useState } from "react";
import { useIntl } from "react-intl";
import { useLocation, useNavigate } from "react-router-dom";
import handleError from "../../utils/handleError";
import { AUTO_CLOSE_TOAST_DURATION, LIMIT_SUGGESTION, TABLE_LIMIT, TIMEOUT_LOADING, USER_STATUS } from "../../constants";
import CustomTable from "../../components/CustomTable/CustomTable";
import SearchInputForm from "../../components/SearchInputForm/SearchInputForm";
import css from "./AdminUserList.module.css";
import TableSkeleton from "../../components/TableSkeleton/TableSkeleton";
import { toast } from "react-toastify";
import { getUserList } from "../../api/user";

const tableColumns = (intl) => [
  {
    name: "email",
    label: intl.formatMessage({
      id: "AdminUserList.table.emailColumn",
    }),
    render: ({ email }) => email,
  },
  {
    name: "universityName",
    label: intl.formatMessage({
      id: "AdminUserList.table.universityNameColumn",
    }),
    render: ({ university }) => university?.name || intl.formatMessage({ id: "AdminUserList.table.noUniversity" }),
  },
  {
    name: "documentCount",
    label: intl.formatMessage({
      id: "AdminUserList.table.documentCountColumn",
    }),
    render: ({ documentCount }) => documentCount || 0,
  },
  {
    name: "status",
    label: intl.formatMessage({
      id: "AdminUserList.table.statusColumn",
    }),
    render: ({ status }) => status,
  },
  {
    name: "createdAt",
    label: intl.formatMessage({
      id: "AdminUserList.table.createdAtColumn",
    }),
    render: ({ createdAt }) => intl.formatDate(createdAt, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }),
  },
];

const ALL = "ALL";

const USER_STATUS_CONFIG = {
  [ALL]: ALL,
  ...USER_STATUS
}

const AdminUserList = () => {
  const intl = useIntl();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paginationMetadata, setPaginationMetadata] = useState(null);
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
  const { keyword, page = 1, status = ALL } = queryParams;

  const onSearch = async (values) => {
    const { search } = values;
    const params = queryString.stringify({
      keyword: search,
      ...(
        status && status !== ALL && {
          status: USER_STATUS_CONFIG[status],
        }
      )
    });
    navigate({
      pathname: location.pathname,
      search: params,
    });
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

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getUserList({
        limit: TABLE_LIMIT,
        keyword: keyword || "",
        page,
        ...(status &&
          status !== ALL && {
            status: USER_STATUS_CONFIG[status],
          }),
      });
      if (response) {
        const { results, page, limit, totalPages, totalResults } = response;

        setData(results);
        setPaginationMetadata({
          page,
          limit,
          totalPages,
          totalResults,
        });
      }
    } catch (err) {
      handleError(err);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, TIMEOUT_LOADING);
    }
  };

  const handleChangeStatus = (event) => {
    const { value } = event.target;
    const params = queryString.stringify({
      status: value,
      keyword,
    });
    navigate({
      pathname: location.pathname,
      search: params,
    });
  };

  const handleViewUserDetails = (item) => {
    return navigate(`/admin/user/${item.id}`);
  }

  useEffect(() => {
    fetchData();
  }, [keyword, page, status]);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3
        }}
      >
        <Box>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: "500", fontSize: "28px" }}
          >
            {intl.formatMessage({ id: "AdminUserList.title" })}
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontWeight: "400", color: "var(--colorGrey400)"}}
          >
            {intl.formatMessage({ id: "AdminUserList.subtitle" })}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: "16px" }}>
          <FormControl>
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              label="Status"
              value={status}
              onChange={handleChangeStatus}
              sx={{ width: "160px" }}
              size="small"
            >
              {Object.entries(USER_STATUS_CONFIG).map(
                ([key, label]) => (
                  <MenuItem key={key} value={key}>
                    {label}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>
        </Box>
      </Box>
      <SearchInputForm
        className={css.searchInputWrapper}
        onSubmit={onSearch}
        searchPlaceholderText={intl.formatMessage({
          id: "AdminUserList.searchPlaceholder",
        })}
        initialValues={{
          search: keyword,
        }}
      />
      {!loading ? (
        <CustomTable
          tableColumns={tableColumns(intl)}
          data={data}
          // onSetOrder={handleSetOderBy}
          // order={order}
          // sortBy={sortBy}
          viewAction={handleViewUserDetails}
          page={page}
          onPageChange={handleOnChangePage}
          className={css.tableWrapper}
          {...paginationMetadata}
        />
      ) : (
        <TableSkeleton className={css.tableWrapper} />
      )}
    </Box>
  );
};

export default AdminUserList;
