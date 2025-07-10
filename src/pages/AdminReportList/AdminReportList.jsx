import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import queryString from "query-string";
import { useEffect, useMemo, useState } from "react";
import { useIntl } from "react-intl";
import { useLocation, useNavigate } from "react-router-dom";
import handleError from "../../utils/handleError";
import { AUTO_CLOSE_TOAST_DURATION, LIMIT_SUGGESTION, TABLE_LIMIT, REPORT_STATUS, TIMEOUT_LOADING } from "../../constants";
import CustomTable from "../../components/CustomTable/CustomTable";
import SearchInputForm from "../../components/SearchInputForm/SearchInputForm";
import css from "./AdminReportList.module.css";
import TableSkeleton from "../../components/TableSkeleton/TableSkeleton";
import { getReportList } from "../../api/report";
import { getReportedDocumentList } from "../../api/document";

const ALL = "ALL";

const REPORT_STATUS_CONFIG = {
  [ALL]: ALL,
  ...REPORT_STATUS
}

const REPORT_GROUP = 'report';
const DOCUMENT_GROUP = 'document';

const GROUP_CONFIG = {
  [DOCUMENT_GROUP]: DOCUMENT_GROUP,
  [REPORT_GROUP]: REPORT_GROUP,
}

const tableColumns = ({intl, group}) => {
  switch (group) {
    case REPORT_GROUP:
      return [
        // {
        //   name: "id",
        //   label: intl.formatMessage({
        //     id: "AdminReportList.reportGroupTable.idColumn",
        //   }),
        //   render: ({ id }) => id,
        // },
        {
          name: "reportType",
          label: intl.formatMessage({
            id: "AdminReportList.reportGroupTable.reportTypeColumn",
          }),
          render: ({ reportType }) => reportType,
        },
        {
          name: "reporterId",
          label: intl.formatMessage({
            id: "AdminReportList.reportGroupTable.reporterIdColumn",
          }),
          render: ({ reporterId }) => reporterId,
        },
        {
          name: "documentId",
          label: intl.formatMessage({
            id: "AdminReportList.reportGroupTable.documentIdColumn",
          }),
          render: ({ documentId }) => documentId,
        },
        {
          name: "status",
          label: intl.formatMessage({
            id: "AdminReportList.reportGroupTable.statusColumn",
          }),
          render: ({ status }) => status,
        },
        {
          name: "updatedAt",
          label: intl.formatMessage({
            id: "AdminReportList.reportGroupTable.updatedAtColumn",
          }),
          render: ({ updatedAt }) =>
            intl.formatDate(updatedAt, {
              year: "numeric",
              month: "long",
              day: "2-digit",
            }),
        },
      ];
    case DOCUMENT_GROUP:
      return [
        {
          name: "id",
          label: intl.formatMessage({
            id: "AdminReportList.documentGrouptable.idColumn",
          }),
          render: ({ id }) => id,
        },
        {
          name: "title",
          label: intl.formatMessage({
            id: "AdminReportList.documentGrouptable.titleColumn",
          }),
          render: ({ title }) => title,
        },
        {
          name: "reportCount",
          label: intl.formatMessage({
            id: "AdminReportList.documentGrouptable.reportCountColumn",
          }),
          render: ({ reportCount }) => reportCount,
        },
        {
          name: "status",
          label: intl.formatMessage({
            id: "AdminReportList.documentGrouptable.statusColumn",
          }),
          render: ({ status }) => status,
        },
      ]
  }
}

const AdminReportList = () => {
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
  const { keyword, page = 1, status = ALL, group: groupParam } = queryParams;
  const group = GROUP_CONFIG[groupParam] || DOCUMENT_GROUP;

  const onSearch = async (values) => {
    const { search } = values;
    const params = queryString.stringify({
      keyword: search,
      ...(
        status && status !== ALL && {
          status: REPORT_STATUS_CONFIG[status],
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
      const response = await getUniversityListForAdmin({
        page: 1,
        limit: LIMIT_SUGGESTION,
        keyword: value || "",
      });
      if (response) {
        const { results } = response;
        setSearchOptions(
          results.length > 0
            ? results.map((item) => ({
                value: item.name,
              }))
            : []
        );
      }
    } catch (err) {
      handleError(err);
    }
  };

  const fetchData = async (group) => {
    try {
      setLoading(true);
      let response = null;
      if(group === REPORT_GROUP) {
        response = await getReportList({
          limit: TABLE_LIMIT,
          page,
          ...(status &&
            status !== ALL && {
              status: REPORT_STATUS_CONFIG[status],
            }),
        })
      } else if (group === DOCUMENT_GROUP) {
        response = await getReportedDocumentList({
          limit: TABLE_LIMIT,
          page,
        })
      }
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

  const handleChangeGroup = (event) => {
    const { value } = event.target;
    const params = queryString.stringify({
      group: value,
      keyword,
    });
    navigate({
      pathname: location.pathname,
      search: params,
    });
  };

  const handleViewDetails = (group) => (item) => {
    switch (group) {
      case REPORT_GROUP:
        return navigate(`/admin/report/${item.id}`);
      case DOCUMENT_GROUP:
        return navigate(`/admin/document/${item.id}/report`);
      default:
        break;
    }
  }

  useEffect(() => {
    fetchData(group);
  }, [keyword, page, status, group]);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: "500", fontSize: "28px" }}
          >
            {intl.formatMessage({ id: "AdminReportList.title" })}
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontWeight: "400", color: "var(--colorGrey400)" }}
          >
            {intl.formatMessage({ id: "AdminReportList.subtitle" })}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: "16px" }}>
          <FormControl>
            <InputLabel id="group-label">Group by</InputLabel>
            <Select
              label="group"
              value={group}
              onChange={handleChangeGroup}
              sx={{ width: "160px" }}
              size="small"
            >
              {Object.entries(GROUP_CONFIG).map(([key, label]) => (
                <MenuItem
                  sx={{ textTransform: "uppercase" }}
                  key={key}
                  value={key}
                >
                  {label?.toUpperCase()}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              label="Status"
              value={status}
              onChange={handleChangeStatus}
              sx={{ width: "160px" }}
              size="small"
              disabled={group === DOCUMENT_GROUP}
            >
              {Object.entries(REPORT_STATUS_CONFIG).map(([key, label]) => (
                <MenuItem key={key} value={key}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
      {/* <SearchInputForm
        handleOnInputChange={handleOnInputChange}
        className={css.searchInputWrapper}
        onSubmit={onSearch}
        searchPlaceholderText={intl.formatMessage({
          id: "AdminReportList.searchPlaceholder",
        })}
        options={searchOptions}
        initialValues={{
          search: keyword,
        }}
      /> */}
      {!loading ? (
        <CustomTable
          tableColumns={tableColumns({intl, group})}
          data={data}
          // onSetOrder={handleSetOderBy}
          // order={order}
          // sortBy={sortBy}
          viewAction={handleViewDetails(group)}
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

export default AdminReportList;
