import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import queryString from "query-string";
import { useEffect, useMemo, useState } from "react";
import { useIntl } from "react-intl";
import { useLocation, useNavigate } from "react-router-dom";
import handleError from "../../utils/handleError";
import { AUTO_CLOSE_TOAST_DURATION, LIMIT_SUGGESTION, TABLE_LIMIT, SUBSCRIPTION_STATUS, SUBSCRIPTION_STATUS_NAMES, TIMEOUT_LOADING } from "../../constants";
import CustomTable from "../../components/CustomTable/CustomTable";
import SearchInputForm from "../../components/SearchInputForm/SearchInputForm";
import css from "./AdminSubscriptionList.module.css";
import TableSkeleton from "../../components/TableSkeleton/TableSkeleton";
import { toast } from "react-toastify";
import { getSubscriptionAnalytics, getSubscriptionList } from "../../api/subscription";
import { AttachMoney, Check, People, TaskAlt } from "@mui/icons-material";
import SubscriptionAnalyticsItem from "./components/SubscriptionAnalyticsItem";
import SubscriptionAnalyticsForm from "./components/SubscriptionAnalyticsForm";
import moment from "moment";
import { convertToMoney } from "../../helper";

const tableColumns = (intl) => [
  {
    name: "userId",
    label: intl.formatMessage({
      id: "AdminSubscriptionList.table.userIdColumn",
    }),
    render: ({ userId }) => userId,
  },
  {
    name: "amount",
    label: intl.formatMessage({
      id: "AdminSubscriptionList.table.amountColumn",
    }),
    render: ({ amount }) => convertToMoney(amount),
  },
  {
    name: "type",
    label: intl.formatMessage({
      id: "AdminSubscriptionList.table.typeColumn",
    }),
    render: ({ type }) => type,
  },
  {
    name: "status",
    label: intl.formatMessage({
      id: "AdminSubscriptionList.table.statusColumn",
    }),
    render: ({ status }) => SUBSCRIPTION_STATUS_NAMES[status],
  },
  {
    name: "isValid",
    label: intl.formatMessage({
      id: "SubscriptionList.table.isValidColumn",
    }),
    render: ({ endDate, status }) =>
      moment(endDate)?.valueOf() > Date.now() && status === SUBSCRIPTION_STATUS.SUCCESS ? <span style={{color: "var(--primaryColor)", fontWeight: 500}}>ACTIVE</span> : "INACTIVE",
  },
  {
    name: "paymentSuccess",
    label: intl.formatMessage({
      id: "AdminSubscriptionList.table.paymentSuccessColumn",
    }),
    render: ({ paymentSuccess }) =>
      paymentSuccess ? <Check sx={{ color: "var(--primaryColor)" }} /> : null,
  },
  {
    name: "createdAt",
    label: intl.formatMessage({
      id: "AdminSubscriptionList.table.createdAtColumn",
    }),
    render: ({ createdAt }) =>
      intl.formatDate(createdAt, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
  },
];

const ALL = "ALL";

const SUBSCRIPTION_STATUS_CONFIG = {
  [ALL]: ALL,
  ...SUBSCRIPTION_STATUS_NAMES
}

const AdminSubscriptionList = () => {
  const intl = useIntl();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paginationMetadata, setPaginationMetadata] = useState(null);
  const [searchOptions, setSearchOptions] = useState([]);
  const [analyticsData, setAnalyticsData] = useState(null);
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
  const subscriptionAnalyticsInitialValues = useMemo(() => {
    return {
      revenueStartDate: moment().subtract(1, "months").toDate(),
      revenueEndDate: moment().toDate(),
      subscriptionCountStartDate: moment().subtract(1, "months").toDate(),
      subscriptionCountEndDate: moment().toDate(),
    };
  }, []);

  const getSubscriptionAnalyticsData = async (values) => {
    const { revenueStartDate, revenueEndDate, subscriptionCountStartDate, subscriptionCountEndDate } = values;
    try {
      const response = await getSubscriptionAnalytics({
        revenueStartDate,
        revenueEndDate,
        subscriptionCountStartDate,
        subscriptionCountEndDate,
      })
      if (response) {
        const {
          totalSubscriptionsToday,
          totalRevenueToday,
          totalSuccessfulSubscriptionsToday,
          totalSuccessfulSubscriptionsInRange,
          totalRevenueInRange,
        } = response;
        setAnalyticsData({
          totalSubscriptionsToday,
          totalRevenueToday,
          totalSuccessfulSubscriptionsToday,
          totalSuccessfulSubscriptionsInRange,
          totalRevenueInRange,
        });
      }
    } catch (err) {
      handleError(err);
      toast.error(intl.formatMessage({ id: "AdminSubscriptionList.analyticsError" }), {
        autoClose: AUTO_CLOSE_TOAST_DURATION,
      });
    }
  };
      
  const onSearch = async (values) => {
    const { search } = values;
    const params = queryString.stringify({
      keyword: search,
      ...(
        status && status !== ALL && {
          status: SUBSCRIPTION_STATUS[status],
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
      const response = await getSubscriptionList({
        page: 1,
        limit: LIMIT_SUGGESTION,
        ...(keyword && { userId: keyword }),
      });
      if (response) {
        const { results } = response;
        setSearchOptions(
          results.length > 0
            ? results.map((item) => ({
                value: item.userId,
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
      const response = await getSubscriptionList({
        limit: TABLE_LIMIT,
        ...(keyword && { userId: keyword }),
        page,
        ...(status &&
          status !== ALL && {
            status,
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
      } else {
        setData([]);
        setPaginationMetadata({
          page: 1,
          limit: TABLE_LIMIT,
          totalPages: 0,
          totalResults: 0,
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

  const handleViewSubscriptionDetails = (item) => {
    return navigate(`/admin/subscription/${item.id}`);
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
          mb: 3,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: "500", fontSize: "28px" }}
          >
            {intl.formatMessage({ id: "AdminSubscriptionList.title" })}
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontWeight: "400", color: "var(--colorGrey400)" }}
          >
            {intl.formatMessage({ id: "AdminSubscriptionList.subtitle" })}
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
              {Object.entries(SUBSCRIPTION_STATUS_CONFIG).map(
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
      <Box sx={{display: "flex", gap: "20px"}}>
        <SubscriptionAnalyticsItem
          title={intl.formatMessage({
            id: "AdminSubscriptionList.totalSubscriptionsToday",
          })}
          value={analyticsData?.totalSubscriptionsToday}
          description={intl.formatMessage({
            id: "AdminSubscriptionList.totalSubscriptionsTodayDescription",
          })}
          icon={
            <People sx={{ color: "var(--primaryColor)", fontSize: "32px" }} />
          }
        />
        <SubscriptionAnalyticsItem
          title={intl.formatMessage({
            id: "AdminSubscriptionList.totalSuccessfulSubscriptionsToday",
          })}
          value={analyticsData?.totalSuccessfulSubscriptionsToday}
          description={intl.formatMessage({
            id: "AdminSubscriptionList.totalSuccessfulSubscriptionsTodayDescription",
          })}
          icon={
            <TaskAlt sx={{ color: "var(--primaryColor)", fontSize: "32px" }} />
          }
        />
        <SubscriptionAnalyticsItem
          title={intl.formatMessage({
            id: "AdminSubscriptionList.totalRevenueToday",
          })}
          value={convertToMoney(analyticsData?.totalRevenueToday)}
          description={intl.formatMessage({
            id: "AdminSubscriptionList.totalRevenueTodayDescription",
          })}
          icon={
            <AttachMoney sx={{ color: "var(--primaryColor)", fontSize: "32px" }} />
          }
        />
      </Box>
      <Box>
        <SubscriptionAnalyticsForm
          onSubmit={() => {}}
          intl={intl}
          getSubscriptionAnalyticsData={getSubscriptionAnalyticsData}
          initialValues={subscriptionAnalyticsInitialValues}
          analyticsData={analyticsData}
        />
      </Box>
      <SearchInputForm
        className={css.searchInputWrapper}
        onSubmit={onSearch}
        searchPlaceholderText={intl.formatMessage({
          id: "AdminSubscriptionList.searchPlaceholder",
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
          viewAction={handleViewSubscriptionDetails}
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

export default AdminSubscriptionList;
