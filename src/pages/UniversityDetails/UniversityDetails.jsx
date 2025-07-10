import { Box, Divider, Skeleton, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import handleError from "../../utils/handleError";
import { getCourseListForMember, getCourseByIdForMember } from "../../api/course";
import CustomBreadcrumbs from "../../components/CustomBreadcrumbs/CustomBreadcrumbs";
import { Add, ArticleOutlined, CalendarTodayOutlined, FolderOutlined, PersonAddAltOutlined, PersonOutline } from "@mui/icons-material";
import { useIntl } from "react-intl";
import css from "./UniversityDetails.module.css";
import { PrimaryButton } from "../../components/CustomButton/CustomButton";
import SearchInputForm from "../../components/SearchInputForm/SearchInputForm";
import { DOCUMENT_TYPES, LIMIT_SUGGESTION, TIMEOUT_LOADING } from "../../constants";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { Mousewheel, Keyboard } from 'swiper/modules';
import queryString from "query-string";
import { getUniversityByIdForMember } from "../../api/university";
import CourseCard from "./components/CourseCard/CourseCard";

const LIMIT = 5;

const IntroSection = (props) => {
  const { universityItem, intl } = props;
  const {
    name: universityName,
    documentCount,
    courseCount,
    studentCount,
    updatedAt,
    location
  } = universityItem || {};

  return (
    <div className={css.introSectionWrapper}>
      <Typography variant="h4" sx={{ fontWeight: "500" }}>
        {universityName}
      </Typography>
      <Box sx={{ display: "flex", gap: "20px" }}>
        <div className={css.introDetails}>
          <FolderOutlined sx={{ color: "var(--primaryColor)" }} />
          <Typography variant="body1">
            {intl.formatMessage(
              { id: "UniversityDetails.IntroSection.courseCount" },
              { count: courseCount }
            )}
          </Typography>
        </div>
        <div className={css.introDetails}>
          <ArticleOutlined sx={{ color: "var(--primaryColor)" }} />
          <Typography variant="body1">
            {intl.formatMessage(
              { id: "UniversityDetails.IntroSection.documentCount" },
              { count: documentCount }
            )}
          </Typography>
        </div>
        <div className={css.introDetails}>
          <PersonOutline sx={{ color: "var(--primaryColor)" }} />
          <Typography variant="body1">
            {intl.formatMessage(
              { id: "UniversityDetails.IntroSection.studentCount" },
              { count: studentCount }
            )}
          </Typography>
        </div>
      </Box>
      <Box sx={{ display: "flex", gap: "6px" }}>
        <Typography variant="body1" sx={{ color: "var(--colorGrey500)" }}>
          {intl.formatMessage({
            id: "UniversityDetails.IntroSection.location",
          })}
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "var(--colorGrey700)", fontWeight: "600" }}
        >
          {location}
        </Typography>
      </Box>
      {/* <Box sx={{ display: "flex", gap: "6px" }}>
        <Typography variant="body1" sx={{ color: "var(--colorGrey500)" }}>
          {intl.formatMessage({
            id: "UniversityDetails.IntroSection.websiteLink",
          })}
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "var(--primaryColor)", fontWeight: "600", "&:hover": {
            textDecoration: "underline",
            cursor: "pointer",
          } }}
        >
          {"https://www.udn.vn/"}
        </Typography>
      </Box> */}
    </div>
  );
}

const CourseSection = (props) => {
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
        {items.map((item) => (
          <SwiperSlide
            style={{
              width: "360px",
            }}
            key={item.id}
          >
            <CourseCard {...item}/>
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

const MOST_DOCUMENTS = 'MOST_DOCUMENTS';
const MOST_SAVED = 'MOST_SAVED';
const LATEST = 'LATEST';

const getInitialConfigs = (intl) => ({
  [MOST_DOCUMENTS]: {
    sortKey: 'documentCount',
    title: intl.formatMessage({ id: "UniversityDetails.mostDocuments" }),
    items: [],
  },
  [MOST_SAVED]: {
    sortKey: 'saveCount',
    title: intl.formatMessage({ id: "UniversityDetails.mostSaved" }),
    items: [],
  },
  [LATEST]: {
    sortKey: 'updatedAt',
    title: intl.formatMessage({ id: "UniversityDetails.latest" }),
    items: [],
  },
})

const UniversityDetails = () => {
  const { universityId } = useParams();
  const intl = useIntl();
  const [universityItem, setUniversityItem] = useState(null);
  const initialConfigs = useMemo(() => getInitialConfigs(intl), [intl]);
  const [courseConfigs, setCourseConfigs] = useState(initialConfigs);
  const [loading, setLoading] = useState(false);
  const [searchOptions, setSearchOptions] = useState([]);
  const navigate = useNavigate();

  const breadcrumbs = useMemo(() => {
    const { id: universityId, name: universityName } = universityItem || {};
    if(!universityId) return [];
    return [
      { key: "Universities", label: "Universities", link: "/#universities" },
      { key: `University_${universityId}`, label: universityName, link: `/university/${universityId}` },
    ];
  }, [universityItem]);

  useEffect(() => {
    const fetchUniversityDetails = async () => {
      try {
        setLoading(true);
        const courseResponse = await getUniversityByIdForMember(universityId);
        setUniversityItem(courseResponse);
        const courseReponse = await Promise.all(
          Object.entries(initialConfigs).map(async ([key, {sortKey}]) => {
            const response = await getCourseListForMember({
              universityId,
              sortBy: sortKey,
              limit: LIMIT,
            });
            return { key, items: response?.results };
          })
        )
        setCourseConfigs((prevConfigs) => {
          return {
            ...prevConfigs,
            ...courseReponse.reduce((acc, { key, items }) => {
              acc[key] = { ...prevConfigs[key], items };
              return acc;
            }, {}),
          }
        })
      } catch (error) {
        handleError(error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, TIMEOUT_LOADING)
      }
    };
    fetchUniversityDetails();
  }, [universityId, initialConfigs]);
  
  const handleOnInputChange = async (event, value) => {
    try {
      const response = await getCourseListForMember({
        limit: LIMIT_SUGGESTION,
        keyword: value || "",
        universityId,
      });
      const { results } = response || {};
      if (results) {
        setSearchOptions(
          results.length > 0
            ? [
                ...results.map(({ name }) => ({
                  value: name,
                })),
              ]
            : []
        );
      }
    } catch (err) {
      handleError(err);
    }
  };

  const onSearch = async (values) => {
    const {search} = values;
    const params = queryString.stringify({
      keyword: search,
      universityId: universityId,
      tab: "course",
    })
    navigate(
      {
        pathname: "/s",
        search: params,
      }
    )
  }

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
        <IntroSection universityItem={universityItem} intl={intl} />
      ) : (
        <Skeleton variant="rectangular" height={200} />
      )}
      {!loading && (
        <SearchInputForm
          handleOnInputChange={handleOnInputChange}
          options={searchOptions}
          className={css.searchInputWrapper}
          onSubmit={onSearch}
          searchPlaceholderText={intl.formatMessage({
            id: "UniversityDetails.searchPlaceholder",
          })}
        />
      )}
      {!loading ? (
        Object.entries(courseConfigs).map(([key, { title, items }]) => (
          <CourseSection key={key} title={title} items={items} intl={intl} />
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
export default UniversityDetails;
