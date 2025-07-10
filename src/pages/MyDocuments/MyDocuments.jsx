import {
  Box,
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
import { useEffect, useMemo, useState } from "react";
import handleError from "../../utils/handleError";
import css from "./MyDocuments.module.css";
import SearchInputForm from "../../components/SearchInputForm/SearchInputForm";
import { getMyDocumentList } from "../../api/personal";
import { DOCUMENT_STATUS, LIMIT_SUGGESTION, TIMEOUT_LOADING } from "../../constants";
import DocumentCard from "./components/DocumentCard/DocumentCard";
import PaginationInfo from "../../components/PaginationInfo/PaginationInfo";

const LIMIT = 4;

const ALL = "ALL";
const TAB_LIST = {
  [ALL]: {
    id: ALL,
    label: "All",
  },
  ...Object.entries(DOCUMENT_STATUS).reduce((acc, [key, value]) => {
    acc[key] = {
      id: key,
      label: value,
    };
    return acc;
  }
  , {}),
}


const SkeletonCardItem = () => {
  return (
    <div className={css.cardItem}>
      <Stack spacing={2}>
        <Skeleton variant="rectangular" height={140} />
      </Stack>
    </div>
  );
};

const tabProps = (key) => {
  return {
    id: `search-tab-${key}`,
    "aria-controls": `search-tabpanel-${key}`,
    value: key,
  };
};

const MyDocuments = () => {
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
  const { tab, page = 1, favouriteKeyword } = queryParams;
  const tabParam = (tab && TAB_LIST[tab]?.id) || ALL;
  const [currentTab, setCurrentTab] = useState(tabParam);

  const [cardItems, setCardItems] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paginationMetadata, setPaginationMetadata] = useState(null);
  const [searchOptions, setSearchOptions] = useState([]);

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

  const handleChangeTab = (event, value) => {
    setCurrentTab(value);
    const params = queryString.stringify({
      tab: value,
      favouriteKeyword,
    });
    navigate({
      pathname: location.pathname,
      search: params,
    });
  };

  const onSearch = async (values) => {
    const { search } = values;
    const params = queryString.stringify({
      favouriteKeyword: search,
      tab: currentTab,
    })
    navigate(
      {
        pathname: location.pathname,
        search: params,
      }
    )
  }

  const handleOnInputChange = async (event, value) => {
    try {
      const response = await getMyDocumentList({
        page: 1,
        limit: LIMIT_SUGGESTION,
        keyword: value || "",
        ...(currentTab && currentTab !== ALL && {
          status: currentTab,
        }),
      });
      if (response) {
        const { results } = response;
        setSearchOptions(
          results.length > 0
            ? [
                ...results.map((item) => ({
                  value: item?.title,
                })),
              ]
            : []
        );
      }
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const response = await getMyDocumentList({
          limit: LIMIT,
          page,
          ...(currentTab && currentTab !== ALL && {
            status: currentTab,
          }),
          keyword: favouriteKeyword
        });
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
      } catch (error) {
        handleError(error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, TIMEOUT_LOADING);
      }
    };
    fetchItems();
  }, [currentTab, page, favouriteKeyword]);

  return (
    <Box>
      <Box>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: "500", fontSize: "28px" }}
        >
          {intl.formatMessage({ id: "MyDocuments.title" })}
        </Typography>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontWeight: "400", color: "var(--colorGrey400)" }}
        >
          {intl.formatMessage({ id: "MyDocuments.subtitle" })}
        </Typography>
      </Box>
      <SearchInputForm
        handleOnInputChange={handleOnInputChange}
        className={css.searchInputWrapper}
        onSubmit={onSearch}
        searchPlaceholderText={intl.formatMessage({
          id: "MyDocuments.searchPlaceholder",
        })}
        options={searchOptions}
        initialValues={{
          search: favouriteKeyword,
        }}
      />
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
      {loading ? (
        <div className={css.resultsPanel}>
          <SkeletonCardItem />
          <SkeletonCardItem />
          <SkeletonCardItem />
          <SkeletonCardItem />
        </div>
      ) : cardItems?.length > 0 ? (
        <>
          <Box sx={{ mb: 2 }}>
            <PaginationInfo {...paginationMetadata} />
          </Box>
          <div className={css.resultsPanel}>
            {cardItems.map((item) => (
              <DocumentCard key={item.id} className={css.cardItem} {...item} />
            ))}
          </div>
        </>
      ) : (
        <Typography variant="body1" sx={{ fontSize: "18px" }}>
          {intl.formatMessage({ id: "MyDocuments.noResults" })}
        </Typography>
      )}
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
    </Box>
  );
};

export default MyDocuments;
