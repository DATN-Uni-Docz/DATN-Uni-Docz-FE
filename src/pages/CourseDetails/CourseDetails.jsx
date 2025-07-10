import { Box, Divider, Skeleton, Typography } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import handleError from "../../utils/handleError";
import { getCourseByIdForMember } from "../../api/course";
import CustomBreadcrumbs from "../../components/CustomBreadcrumbs/CustomBreadcrumbs";
import { Add, ArticleOutlined, CalendarTodayOutlined, CheckOutlined, PersonAddAltOutlined } from "@mui/icons-material";
import { useIntl } from "react-intl";
import css from "./CourseDetails.module.css";
import { PrimaryButton } from "../../components/CustomButton/CustomButton";
import SearchInputForm from "../../components/SearchInputForm/SearchInputForm";
import { AUTO_CLOSE_TOAST_DURATION, DOCUMENT_TYPES, LIMIT_SUGGESTION, TIMEOUT_LOADING } from "../../constants";
import DocumentCard from "./components/DocumentCard/DocumentCard";
import { getPopularDocumentListByCourseIdAndDocumentType } from "../../api/course";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { Mousewheel, Keyboard } from 'swiper/modules';
import queryString from "query-string";
import { getCurrentStatusFavouriteCourse, toggleFavouriteCourse } from "../../api/personal";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { roleSelector } from "../../redux/selector";
import { getDocumentListForMember } from "../../api/document";

const LIMIT = 5;

const IntroSection = (props) => {
  const { courseItem, intl, handleToggleFavouriteCourse, isFavourite } = props;
  const {
    name: courseName,
    description,
    documentCount,
    saveCount,
    updatedAt,
  } = courseItem || {};

  return (
    <div className={css.introSectionWrapper}>
      <Typography variant="h4" sx={{ fontWeight: "500" }}>
        {courseName}
      </Typography>
      <Box sx={{ mt: 1, display: "flex", gap: "20px" }}>
        <div className={css.introDetails}>
          <ArticleOutlined sx={{ color: "var(--primaryColor)" }} />
          <Typography variant="body1">
            {intl.formatMessage(
              { id: "CourseDetails.IntroSection.documentCount" },
              { count: documentCount }
            )}
          </Typography>
        </div>
        <div className={css.introDetails}>
          <PersonAddAltOutlined sx={{ color: "var(--primaryColor)" }} />
          <Typography variant="body1">
            {intl.formatMessage(
              { id: "CourseDetails.IntroSection.saveCount" },
              { count: saveCount }
            )}
          </Typography>
        </div>
        <div className={css.introDetails}>
          <CalendarTodayOutlined sx={{ color: "var(--primaryColor)" }} />
          <Typography variant="body1">
            Updated at{" "}
            {intl.formatDate(updatedAt, {
              year: "numeric",
              month: "long",
              day: "2-digit",
            })}
          </Typography>
        </div>
      </Box>
      <Typography
        variant="body1"
        sx={{
          color: "var(--colorGrey800)",
          fontSize: "16px",
          lineHeight: "24px",
          my: 2.5,
        }}
      >
        {description}
      </Typography>
      <PrimaryButton
        onClick={handleToggleFavouriteCourse}
        startIcon={isFavourite ? <CheckOutlined /> : <Add />}
      >
        {isFavourite
          ? intl.formatMessage({ id: "CourseDetails.IntroSection.following" })
          : intl.formatMessage({
              id: "CourseDetails.IntroSection.followButton",
            })}
      </PrimaryButton>
    </div>
  );
}

const DocumentSection = (props) => {
  const { items, intl, title } = props;
  return (
    <div className={css.documentSectionWrapper}>
      <Typography variant="h5" sx={{ fontWeight: "500", mb: 2 }}>
        {title}
      </Typography>
      <Swiper
        slidesPerView="auto"
        spaceBetween={30}
        cssMode={true}
        mousewheel={true}
        keyboard={true}
        modules={[Mousewheel, Keyboard]}
        className="mySwiper"
        style={{
          width: "100%",
          height: "100%",
          marginLeft: 0,
          marginRight: 0,
        }}
      >
        {items.map((item, index) => (
          <SwiperSlide
            style={{
              width: "360px",
            }}
            key={`${item.id}_${index}`}
          >
            <DocumentCard key={`${item.id}_${index+1}`} intl={intl} {...item} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Divider sx={{ backgroundColor: "var(--colorGrey300)" , my: "30px"}} />
    </div>
  );
}

const SkeletonSection = () => {
  return (
    <Box sx={{mt: 4}}>
      <Skeleton variant="rectangular" width={300} height={20} sx={{ mb: 2}} />
      <Box sx={{ display: "flex", gap: "20px" }}>
        <Skeleton variant="rectangular" width={350} height={140}/>
        <Skeleton variant="rectangular" width={350} height={140}/>
        <Skeleton variant="rectangular" width={350} height={140}/>
      </Box>
    </Box>
  )
}

// const POPULAR = 'POPULAR';
const MOST_DOWNLOADED = 'MOST_DOWNLOADED';
const MOST_SAVED = 'MOST_SAVED';
const LATEST = 'LATEST';

const getInitialConfigs = (intl) => ({
  [MOST_DOWNLOADED]: {
    title: intl.formatMessage({ id: "CourseDetails.mostDownloaded" }),
    items: [],
    sortKey: 'downloadCount',
  },
  [MOST_SAVED]: {
    title: intl.formatMessage({ id: "CourseDetails.mostSaved" }),
    items: [],
    sortKey: 'saveCount',
  },
  [LATEST]: {
    title: intl.formatMessage({ id: "CourseDetails.latest" }),
    items: [],
    sortKey: 'updatedAt',
  },
  ...Object.entries(DOCUMENT_TYPES).reduce((acc, [key, value]) => {
    acc[key] = {
      title: intl.formatMessage({ id: `CourseDetails.${value}`, defaultMessage: value }, ),
      items: [],
    };
    return acc;
  }, {})
})

const CourseDetails = () => {
  const { courseId } = useParams();
  const intl = useIntl();
  const [courseItem, setCourseItem] = useState(null);
  const initialConfigs = useMemo(() => getInitialConfigs(intl), [intl]);
  const [documentConfigs, setDocumentConfigs] = useState(initialConfigs);
  const [loading, setLoading] = useState(false);
  const [searchOptions, setSearchOptions] = useState([]);
  const [isFavourite, setIsFavourite] = useState(false);
  const role = useSelector(roleSelector);
  const navigate = useNavigate();

  const breadcrumbs = useMemo(() => {
    const { id: courseId, name: courseName, university } = courseItem || {};
    const { id: universityId, name: universityName } = university || {};
    if(!courseId || !universityId) return [];
    return [
      { key: "Universities", label: "Universities", link: "/#universities" },
      { key: `University_${universityId}`, label: universityName, link: `/university/${universityId}` },
      { key: `Course_${courseId}`, label: courseName, link: `/course/${courseId}` },
    ];
  }, [courseItem]);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        setLoading(true);
        const courseResponse = await getCourseByIdForMember(courseId);
        setCourseItem(courseResponse);
        const documentResponse = await Promise.all([
          // First batch: sortKey-based requests
          ...Object.keys(DOCUMENT_TYPES).map(async (key) => {
            const response =
              await getPopularDocumentListByCourseIdAndDocumentType(courseId, {
                limit: LIMIT,
                documentType: key,
              });
            return { key, items: response?.results };
          }),
          // Second batch: documentType-based requests
          ...Object.entries(initialConfigs)
            .filter(([_, { sortKey }]) => !!sortKey)
            .map(async ([key, { sortKey }]) => {
              const response = await getDocumentListForMember({
                courseId,
                sortBy: sortKey,
                limit: LIMIT,
              });
              return { key, items: response?.results };
            }),
        ]);
        setDocumentConfigs((prevConfigs) => {
          return {
            ...prevConfigs,
            ...documentResponse.reduce((acc, { key, items }) => {
              acc[key] = { ...prevConfigs[key], items };
              return acc;
            }, {}),
          }
        })
        if (role) {
          const favouriteCourseResponse = await getCurrentStatusFavouriteCourse(
            courseId
          );
          if (favouriteCourseResponse) {
            setIsFavourite(favouriteCourseResponse?.isFavourite);
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
    fetchCourseDetails();
  }, [courseId, role, initialConfigs]);

  const onSearch = async (values) => {
    const { search } = values;
    const params = queryString.stringify({
      keyword: search,
      courseId,
      universityId: courseItem?.university?.id,
    })
    navigate(
      {
        pathname: "/s",
        search: params,
      }
    )
  }

  const handleOnInputChange = async (event, value) => {
    try {
      const response = await getDocumentListForMember({
        page: 1,
        limit: LIMIT_SUGGESTION,
        keyword: value || "",
        courseId,
        universityId: courseItem?.university?.id,
      });
      if (response) {
        const { results } = response;
        setSearchOptions(
          results.length > 0
            ? [
                ...results.map(({ title }) => ({
                  value: title,
                })),
              ]
            : []
        );
      }
    } catch (err) {
      handleError(err);
    }
  };

  const handleToggleFavouriteCourse = useCallback(async () => {
    try {
      const response = await toggleFavouriteCourse(courseId);
      if (response) {
        const { isFavourite } = response;
        setIsFavourite(response?.isFavourite);
        const message = isFavourite
          ? intl.formatMessage({ id: "CourseDetails.favouriteAdded" })
          : intl.formatMessage({
              id: "CourseDetails.favouriteRemoved",
            });
        toast.info(message, {
          autoClose: AUTO_CLOSE_TOAST_DURATION,
        });
      }
    } catch (error) {
      handleError(error);
    }
  }, [courseId, intl]);

  return (
    <Box>
      {!loading ? (
        <CustomBreadcrumbs data={breadcrumbs} />
      ) : (
        <Skeleton
          variant="rectangular"
          height={30}
          sx={{ mb: 2, width: "50%" }}
        />
      )}
      {!loading ? (
        <IntroSection
          courseItem={courseItem}
          intl={intl}
          handleToggleFavouriteCourse={handleToggleFavouriteCourse}
          isFavourite={isFavourite}
        />
      ) : (
        <Skeleton variant="rectangular" height={200} />
      )}
      {!loading && (
        <SearchInputForm
          handleOnInputChange={handleOnInputChange}
          className={css.searchInputWrapper}
          onSubmit={onSearch}
          searchPlaceholderText={intl.formatMessage({
            id: "CourseDetails.searchPlaceholder",
          })}
          options={searchOptions}
        />
      )}
      {!loading ? (
        Object.entries(documentConfigs).map(([key, { title, items }]) => (
          <DocumentSection key={key} title={title} items={items} intl={intl} />
        ))
      ) : (
        <>
          <SkeletonSection />
          <SkeletonSection />
        </>
      )}
    </Box>
  );
};
export default CourseDetails;
