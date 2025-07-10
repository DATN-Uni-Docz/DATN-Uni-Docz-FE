import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import queryString from "query-string";
import { useEffect, useMemo, useState } from "react";
import { useIntl } from "react-intl";
import { useLocation, useNavigate } from "react-router-dom";
import handleError from "../../utils/handleError";
import { AUTO_CLOSE_TOAST_DURATION, LIMIT_SUGGESTION, TABLE_LIMIT, DOCUMENT_STATUS, TIMEOUT_LOADING } from "../../constants";
import CustomTable from "../../components/CustomTable/CustomTable";
import SearchInputForm from "../../components/SearchInputForm/SearchInputForm";
import css from "./AdminDocumentList.module.css";
import TableSkeleton from "../../components/TableSkeleton/TableSkeleton";
import { toast } from "react-toastify";
import useBoolean from "../../hook/useBoolean";
import CustomModal from "../../components/CustomModal/CustomModal";
import { PrimaryButton } from "../../components/CustomButton/CustomButton";
import AddIcon from '@mui/icons-material/Add';
import { getDocumentListForAdmin } from "../../api/document";

const tableColumns = (intl) => [
  {
    name: "title",
    label: intl.formatMessage({
      id: "AdminDocumentList.table.titleColumn",
    }),
    render: ({ title }) => title,
  },
  {
    name: "downloadCount",
    label: intl.formatMessage({
      id: "AdminDocumentList.table.downloadCountColumn",
    }),
    render: ({ downloadCount }) => downloadCount,
  },
  {
    name: "saveCount",
    label: intl.formatMessage({
      id: "AdminDocumentList.table.saveCountColumn",
    }),
    render: ({ saveCount }) => saveCount,
  },
  {
    name: "updatedAt",
    label: intl.formatMessage({
      id: "AdminDocumentList.table.updatedAtColumn",
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
      id: "AdminDocumentList.table.statusColumn",
    }),
    render: ({ status }) => status,
  },
];

const ALL = "ALL";

const DOCUMENT_STATUS_CONFIG = {
  [ALL]: ALL,
  ...DOCUMENT_STATUS
}

const AdminDocumentList = () => {
  const intl = useIntl();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paginationMetadata, setPaginationMetadata] = useState(null);
  const [searchOptions, setSearchOptions] = useState([]);
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
          status: DOCUMENT_STATUS_CONFIG[status],
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

  const handleOnInputChange = async (event, value) => {
    try {
      const response = await getDocumentListForAdmin({
        page: 1,
        limit: LIMIT_SUGGESTION,
        keyword: value || "",
      });
      if (response) {
        const { results } = response;
        setSearchOptions(
          results.length > 0
            ? results.map((item) => ({
                value: item.title,
              }))
            : []
        );
      }
    } catch (err) {
      handleError(err);
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getDocumentListForAdmin({
        limit: TABLE_LIMIT,
        keyword: keyword || "",
        page,
        ...(status &&
          status !== ALL && {
            status: DOCUMENT_STATUS_CONFIG[status],
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

  const handleViewDocumentDetails = (item) => {
    return navigate(`/admin/document/${item.id}`);
  }

  useEffect(() => {
    fetchData();
    handleOnInputChange(null, keyword);
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
            {intl.formatMessage({ id: "AdminDocumentList.title" })}
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontWeight: "400", color: "var(--colorGrey400)"}}
          >
            {intl.formatMessage({ id: "AdminDocumentList.subtitle" })}
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
              {Object.entries(DOCUMENT_STATUS_CONFIG).map(
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
          id: "AdminDocumentList.searchPlaceholder",
        })}
        options={[]}
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
          viewAction={handleViewDocumentDetails}
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

export default AdminDocumentList;
