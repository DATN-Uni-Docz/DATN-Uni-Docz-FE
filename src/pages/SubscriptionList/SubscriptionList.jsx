import { Box, Skeleton, Tab, Tabs, Typography } from "@mui/material";
import { useIntl } from "react-intl";
import { SHORT_DATE_FORMAT, SUBSCRIPTION_STATUS, SUBSCRIPTION_STATUS_NAMES, TABLE_LIMIT, TIMEOUT_LOADING } from "../../constants";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import handleError from "../../utils/handleError";
import TableSkeleton from "../../components/TableSkeleton/TableSkeleton";
import css from "./SubscriptionList.module.css";
import CustomTable from "../../components/CustomTable/CustomTable";
import { getPersonalSubscriptionAnalysis, getPersonalSubscriptions } from "../../api/personal";
import moment from "moment";
import { Check } from "@mui/icons-material";
import { convertToMoney } from "../../helper";

const tableColumns = (intl) => [
  {
    name: "id",
    label: intl.formatMessage({
      id: "SubscriptionList.table.idColumn",
    }),
    render: ({ id }) => id,
  },
  {
    name: "amount",
    label: intl.formatMessage({
      id: "SubscriptionList.table.amountColumn",
    }),
    render: ({ amount }) => convertToMoney(amount),
  },
  {
    name: "type",
    label: intl.formatMessage({
      id: "SubscriptionList.table.typeColumn",
    }),
    render: ({ type }) => type,
  },
  {
    name: "status",
    label: intl.formatMessage({
      id: "SubscriptionList.table.statusColumn",
    }),
    render: ({ status }) => SUBSCRIPTION_STATUS_NAMES[status],
  },
  {
    name: "startDate",
    label: intl.formatMessage({
      id: "SubscriptionList.table.startDateColumn",
    }),
    render: ({ startDate }) =>
      intl.formatDate(startDate, SHORT_DATE_FORMAT),
  },
  {
    name: "endDate",
    label: intl.formatMessage({
      id: "SubscriptionList.table.endDateColumn",
    }),
    render: ({ endDate }) =>
      intl.formatDate(endDate, SHORT_DATE_FORMAT),
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
      id: "SubscriptionList.table.paymentSuccessColumn",
    }),
    render: ({ paymentSuccess }) => paymentSuccess && <Check sx={{ color: "var(--primaryColor)" }} />,
  },
];

const ALL = "ALL";

const SUBSCRIPTION_STATUS_CONFIG = {
  [ALL]: ALL,
  ...SUBSCRIPTION_STATUS
}

const TAB_LIST = {
  [ALL]: {
    id: ALL,
    label: "All",
  },
  ...Object.entries(SUBSCRIPTION_STATUS_NAMES).reduce((acc, [key, value]) => {
    acc[key] = {
      id: key,
      label: value,
    };
    return acc;
  }
  , {}),
}

const tabProps = (key) => {
  return {
    id: `subscription-tab-${key}`,
    "aria-controls": `subscription-tabpanel-${key}`,
    value: key,
  };
};

const CardItem = (props) => {
  const {icon, label, value} = props;
  return (
    <Box sx={{ p: 3, boxShadow: 2, minWidth: "300px" }}>
      <Typography variant="body1" sx={{ mb: 2, color: "var(--colorGrey400)" }}>
        {label}
      </Typography>
      <Typography variant="h6" sx={{ fontWeight: 500 }}>
        {value}
      </Typography>
    </Box>
  );
}

const SubscriptionList = () => {
  const intl = useIntl();
  const [data, setData] = useState([]);
  const [analysisData, setAnalysisData] = useState(null);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);
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
  const { tab, page = 1 } = queryParams;
  const tabParam = (tab && TAB_LIST[tab]?.id) || ALL;
  const [currentTab, setCurrentTab] = useState(tabParam);

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
      const response = await getPersonalSubscriptions({
        limit: TABLE_LIMIT,
        page,
        ...(currentTab &&
          currentTab !== ALL && {
            status: SUBSCRIPTION_STATUS_CONFIG[currentTab],
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

  const fetchSubscriptionAnalysis = async () => {
    try {
      setLoadingAnalysis(true);
      const response = await getPersonalSubscriptionAnalysis();
      if (response) {
        const { totalAmount, totalSubscriptions, successfulSubscriptions } = response;
        setAnalysisData({
          totalAmount: convertToMoney(totalAmount) || 0,
          totalSubscriptions,
          successfulSubscriptions,
        });
      }
    } catch (err) {
      handleError(err);
    }
    finally {
      setTimeout(() => {
        setLoadingAnalysis(false);
      }, TIMEOUT_LOADING);
    }
  };

  const handleChangeTab = (event, value) => {
    setCurrentTab(value);
    const params = queryString.stringify({
      tab: value,
    });
    navigate({
      pathname: location.pathname,
      search: params,
    });
  };

  useEffect(() => {
    fetchData();
  }, [page, currentTab]);

  useEffect(() => {
    fetchSubscriptionAnalysis();
  }, []);

  return (
    <Box>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "500", fontSize: "28px" }}
      >
        {intl.formatMessage({ id: "SubscriptionList.title" })}
      </Typography>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ fontWeight: "400", color: "var(--colorGrey400)" }}
      >
        {intl.formatMessage({ id: "SubscriptionList.subtitle" })}
      </Typography>

      <Box sx={{ display: "flex", gap: "20px", mt: 3, mb: 5 }}>
        {!loadingAnalysis ? (
          <>
            <CardItem
              label={intl.formatMessage({
                id: "SubscriptionList.description.totalSpent",
              })}
              value={analysisData?.totalAmount}
            />
            <CardItem
              label={intl.formatMessage({
                id: "SubscriptionList.description.totalSubscriptions",
              })}
              value={analysisData?.totalSubscriptions || "0"}
            />
            <CardItem
              label={intl.formatMessage({
                id: "SubscriptionList.description.totalSuccessSubscriptions",
              })}
              value={analysisData?.successfulSubscriptions || "0"}
            />
          </>
        ) : (
          <>
            <Skeleton variant="rectangular" width={300} height={120} />
            <Skeleton variant="rectangular" width={300} height={120} />
            <Skeleton variant="rectangular" width={300} height={120} />
          </>
        )}
      </Box>
      <Box
        sx={{
          backgroundColor: "var(--colorWhite)",
          my: 2.5,
        }}
      >
        <Tabs
          value={currentTab}
          onChange={handleChangeTab}
          aria-label="Search tabs..."
        >
          {Object.values(TAB_LIST).map((tab) => (
            <Tab key={tab.id} label={tab.label} {...tabProps(tab.id)} />
          ))}
        </Tabs>
      </Box>
      {!loading ? (
        <CustomTable
          tableColumns={tableColumns(intl)}
          data={data}
          // onSetOrder={handleSetOderBy}
          // order={order}
          // sortBy={sortBy}
          page={page}
          onPageChange={handleOnChangePage}
          className={css.tableWrapper}
          viewAction={(item) => navigate(`/personal/subscriptions/${item.id}`)}
          {...paginationMetadata}
        />
      ) : (
        <TableSkeleton className={css.tableWrapper} />
      )}
    </Box>
  );
};

export default SubscriptionList;
