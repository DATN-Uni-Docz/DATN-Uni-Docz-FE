import {
  Box,
  Pagination,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import queryString from "query-string";
import { useIntl } from "react-intl";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import handleError from "../../utils/handleError";
import css from "./FavouriteCourses.module.css";
import SearchCourseCard from "../../components/SearchCourseCard/SearchCourseCard";
import SearchInputForm from "../../components/SearchInputForm/SearchInputForm";
import { getFavouriteCourseList } from "../../api/personal";
import { LIMIT_SUGGESTION, TIMEOUT_LOADING } from "../../constants";
import PaginationInfo from "../../components/PaginationInfo/PaginationInfo";

const LIMIT = 4;

const SkeletonCardItem = () => {
  return (
    <div className={css.cardItem}>
      <Stack spacing={2}>
        <Skeleton variant="rectangular" height={140} />
      </Stack>
    </div>
  );
};

const FavouriteCourses = () => {
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
  const { page = 1, favouriteKeyword } = queryParams;

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

  const onSearch = async (values) => {
    const { search } = values;
    const params = queryString.stringify({
      favouriteKeyword: search,
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
      const response = await getFavouriteCourseList({
        page: 1,
        limit: LIMIT_SUGGESTION,
        keyword: value || "",
      });
      if (response) {
        const { results } = response;
        setSearchOptions(
          results.length > 0
            ? [
                ...results.map((item) => ({
                  value: item?.course?.name,
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
        const response = await getFavouriteCourseList({
          limit: LIMIT,
          page,
          keyword: favouriteKeyword
        });
        if (response) {
          const { results, page, limit, totalPages, totalResults } = response;
          setCardItems(results?.map((item) => item?.course));
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
  }, [page, favouriteKeyword]);

  return (
    <Box>
      <Box>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: "500", fontSize: "28px" }}
        >
          {intl.formatMessage({ id: "FavouriteCourses.title" })}
        </Typography>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontWeight: "400", color: "var(--colorGrey400)" }}
        >
          {intl.formatMessage({ id: "FavouriteCourses.subtitle" })}
        </Typography>
      </Box>
      <SearchInputForm
        handleOnInputChange={handleOnInputChange}
        className={css.searchInputWrapper}
        onSubmit={onSearch}
        searchPlaceholderText={intl.formatMessage({
          id: "FavouriteCourses.searchPlaceholder",
        })}
        options={searchOptions}
        initialValues={{
          search: favouriteKeyword,
        }}
      />
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
              <SearchCourseCard
                key={item.id}
                className={css.cardItem}
                {...item}
              />
            ))}
          </div>
        </>
      ) : (
        <Typography variant="body1" sx={{ fontSize: "18px" }}>
          {intl.formatMessage({ id: "FavouriteCourses.noResults" })}
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

export default FavouriteCourses;
