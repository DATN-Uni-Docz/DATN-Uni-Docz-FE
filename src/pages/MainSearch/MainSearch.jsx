import { FilterAltOutlined, SortOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Drawer,
  Menu,
  MenuItem,
  Pagination,
  Skeleton,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import queryString from "query-string";
import { useIntl } from "react-intl";
import { useLocation, useNavigate } from "react-router-dom";
import useBoolean from "../../hook/useBoolean";
import { useCallback, useEffect, useMemo, useState } from "react";
import handleError from "../../utils/handleError";
import { getDocumentListForMember } from "../../api/document";
import css from "./MainSearch.module.css";
import SearchDocumentCard from "../../components/SearchDocumentCard/SearchDocumentCard";
import SearchCourseCard from "../../components/SearchCourseCard/SearchCourseCard";
import { getCourseListForMember } from "../../api/course";
import SearchFilterPanel from "./components/SearchFilterPanel/SearchFilterPanel";
import { pick } from "lodash";
import PaginationInfo from "../../components/PaginationInfo/PaginationInfo";
import { TIMEOUT_LOADING } from "../../constants";

const LIMIT = 4;
const DOCUMENT_TAB = "document";
const COURSE_TAB = "course";
const DEFAULT_KEYS = ["keyword", "page", "sortBy"];
const ARRAY_KEYS = ["documentType"];
const TAB_LIST = {
  [DOCUMENT_TAB]: {
    id: DOCUMENT_TAB,
    label: "Document",
    filterKeys: ["documentType", "courseId", "universityId"],
    sortKeys: [{
      key: "updatedAt",
      label: "Relevant",
    }, {
      key: "downloadCount",
      label: "Most downloaded",
    }, {
      key: "saveCount",
      label: "Most saved",
    }],
  },
  [COURSE_TAB]: {
    id: COURSE_TAB,
    label: "Course",
    filterKeys: ["universityId"],
    sortKeys: [
      {
        key: "updatedAt",
        label: "Relevant",
      },
      {
        key: "saveCount",
        label: "Most saved",
      },
      {
        key: "documentCount",
        label: "Most documents",
      },
    ]
  },
};

const tabProps = (key) => {
  return {
    id: `search-tab-${key}`,
    "aria-controls": `search-tabpanel-${key}`,
    value: key,
  };
};

const CustomTabPanel = (props) => {
  const { children, value, currentValue, ...other } = props;
  return value === currentValue ? (
    <div
      role="tabpanel"
      id={`search-tabpanel-${value}`}
      aria-labelledby={`search-tab-${value}`}
      className={css.tabPanelWrapper}
      {...other}
    >
      {children}
    </div>
  ) : null;
};

const SkeletonCardItem = () => {
  return (
    <div className={css.cardItem}>
      <Stack spacing={2}>
        <Skeleton variant="rectangular" height={140} />
      </Stack>
    </div>
  );
};

const CardItem = (props) => {
  const { type, item, ...rest } = props;
  switch (type) {
    case DOCUMENT_TAB:
      return <SearchDocumentCard {...item} {...rest} className={css.cardItem}/>;
    case COURSE_TAB:
      return <SearchCourseCard {...item} {...rest} className={css.cardItem}/>;
    default:
      return null;
  }
};

const MainSearch = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const intl = useIntl();
  const queryParams = useMemo(() => {
    return queryString.parse(location.search, {
      arrayFormat: "comma",
      types: {
        page: "number",
      },
    });
  }, [location.search]);
  const { tab, page = 1, keyword } = queryParams;
  const tabParam = (tab && TAB_LIST[tab]?.id) || DOCUMENT_TAB;
  const filterPanel = useBoolean();
  const [currentTab, setCurrentTab] = useState(tabParam);
  const [cardItems, setCardItems] = useState(null);
  const [paginationMetadata, setPaginationMetadata] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sortAnchorEl, setSortAnchorEl] = useState(null);
  const sortOpen = Boolean(sortAnchorEl);
  const { filterKeys, sortKeys } = TAB_LIST?.[currentTab] || {};
  const isFilterActive = Object.keys(pick(queryParams, filterKeys)).length > 0;
  const isSortActive = !!queryParams.sortBy;

  const handleChangeTab = (event, value) => {
    setCurrentTab(value);
    const params = queryString.stringify({
      tab: value,
      keyword,
    });
    navigate({
      pathname: location.pathname,
      search: params,
    });
  };

  const handleClickSortButton = (event) => {
    setSortAnchorEl(event.currentTarget);
  };

  const handleCloseSortMenu = () => {
    setSortAnchorEl(null);
  };

  const formatQueryParams = useCallback(
    () => {
      const filteredQueryParams = pick(queryParams, DEFAULT_KEYS.concat(filterKeys));
      const formattedQueryParams = Object.keys(filteredQueryParams).reduce(
        (acc, key) => {
          const value = filteredQueryParams[key];
          if (ARRAY_KEYS.includes(key)) {
            return {
              ...acc,
              [key]: Array.isArray(value) ? value : [value],
            };
          }
          return {
            ...acc,
            [key]: value,
          };
        },
        {}
      );
      return {
        ...formattedQueryParams,
        limit: LIMIT,
        page,
      };
    },
    [queryParams, page, filterKeys]
  );

  const handleOnChangePage = (event, value) => {
    const params = queryString.stringify({
      ...queryParams,
      page: value,
    }, {
      arrayFormat: "comma",
    });
    navigate({
      pathname: location.pathname,
      search: params,
    });
  };

  const handleSort = (value) => () => {
    const params = queryString.stringify({
      ...queryParams,
      sortBy: value,
    });
    navigate({
      pathname: location.pathname,
      search: params,
    });
  }

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const formattedQueryParams = formatQueryParams();
        if (currentTab === DOCUMENT_TAB) {
          const response = await getDocumentListForMember(formattedQueryParams);
          if (response) {
            const { results, page, limit, totalPages, totalResults } = response;
            setCardItems(results);
            setPaginationMetadata({
              page,
              limit,
              totalPages,
              totalResults,
            });
          }
        } else if (currentTab === COURSE_TAB) {
          const response = await getCourseListForMember(formattedQueryParams);
          if (response) {
            const { results, page, limit, totalPages, totalResults } = response;
            setCardItems(results);
            setPaginationMetadata({
              page,
              limit,
              totalPages,
              totalResults,
            });
          }
        }
      } catch (error) {
        handleError(error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, TIMEOUT_LOADING);
      }
    };
    fetchItems();
  }, [queryParams, currentTab, formatQueryParams]);

  return (
    <Box>
      <Box>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: "500", fontSize: "28px" }}
        >
          {intl.formatMessage({ id: "MainSearch.title" })}
        </Typography>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontWeight: "400", color: "var(--colorGrey400)" }}
        >
          {intl.formatMessage({ id: "MainSearch.subtitle" })}
        </Typography>
      </Box>
      <Box sx={{ mt: 2.5, display: "flex", gap: "16px" }}>
        <Button
          id="filter-button"
          size="large"
          sx={{
            py: 1,
            px: 2,
            textTransform: "none",
            backgroundColor: isFilterActive
              ? "var(--primaryColor)"
              : "var(--colorWhite)",
            color: isFilterActive ? "var(--colorWhite)" : "inherit",
          }}
          startIcon={<FilterAltOutlined />}
          onClick={filterPanel.setTrue}
          variant={isFilterActive ? "contained" : "outlined"}
        >
          {intl.formatMessage({ id: "MainSearch.filterButton" })}
        </Button>
        <Button
          id="sort-button"
          size="large"
          sx={{
            py: 1,
            px: 2,
            textTransform: "none",
            backgroundColor: isSortActive
              ? "var(--primaryColor)"
              : "var(--colorWhite)",
            color: isSortActive ? "var(--colorWhite)" : "inherit",
          }}
          startIcon={<SortOutlined />}
          onClick={handleClickSortButton}
          variant={isSortActive ? "contained" : "outlined"}
        >
          {intl.formatMessage({ id: "MainSearch.sortButton" })}
        </Button>
        <Menu
          id="sort-menu"
          anchorEl={sortAnchorEl}
          open={sortOpen}
          onClose={handleCloseSortMenu}
        >
          {sortKeys.map(({ key, label }) => (
            <MenuItem key={key} onClick={handleSort(key)}>
              {intl.formatMessage({ id: label })}
            </MenuItem>
          ))}
        </Menu>
      </Box>
      <Box
        sx={{
          backgroundColor: "var(--colorWhite)",
          mt: 2.5,
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
      {Object.values(TAB_LIST).map((tab) => (
        <CustomTabPanel key={tab.id} value={tab.id} currentValue={currentTab}>
          {loading ? (
            <div className={css.resultsPanel}>
              <SkeletonCardItem />
              <SkeletonCardItem />
              <SkeletonCardItem />
              <SkeletonCardItem />
            </div>
          ) : cardItems?.length > 0 ? (
            <>
              <Box
                sx={{ mb: 2 }}
              >
                <PaginationInfo {...paginationMetadata} />
              </Box>
              <div className={css.resultsPanel}>
                {cardItems.map((item) => (
                  <CardItem key={item.id} item={item} type={currentTab} />
                ))}
              </div>
            </>
          ) : (
            <Typography variant="body1" sx={{ fontSize: "18px" }}>
              {intl.formatMessage({ id: "MainSearch.noResults" })}
            </Typography>
          )}
        </CustomTabPanel>
      ))}
      {!loading && (
        <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
          <Pagination
            count={paginationMetadata?.totalPages}
            page={page}
            onChange={handleOnChangePage}
            size="large"
            sx={{
              "& .MuiPaginationItem-root.Mui-selected": {
                backgroundColor: "var(--primaryColor)",
                color: "white",
              },
            }}
          />
        </Box>
      )}
      <Drawer
        anchor="right"
        open={filterPanel.value}
        onClose={filterPanel.setFalse}
      >
        <SearchFilterPanel
          currentTab={currentTab}
          onClose={filterPanel.setFalse}
          intl={intl}
          queryParams={queryParams}
        />
      </Drawer>
    </Box>
  );
};

export default MainSearch;
