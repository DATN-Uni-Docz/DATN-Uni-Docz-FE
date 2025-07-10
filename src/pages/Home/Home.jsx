import classes from "./Home.module.css";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { FormattedMessage, useIntl } from "react-intl";
import {
  PrimaryButton,
  PrimaryOutlineButton,
} from "../../components/CustomButton/CustomButton";
import SearchInputForm from "../../components/SearchInputForm/SearchInputForm";
import handleError from "../../utils/handleError";
import { getUniversityListForMember } from "../../api/university";
import { LIMIT_SUGGESTION } from "../../constants";
import classNames from "classnames";
import { Assistant, Info, People, School, Search, Security } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { getRecommendedDocuments } from "../../api/personal";
import SearchDocumentCard from "../../components/SearchDocumentCard/SearchDocumentCard";
import { SwiperSlide, Swiper } from "swiper/react";
import { Keyboard, Mousewheel, Navigation } from "swiper/modules";
import DocumentCard from "./components/DocumentCard";

const UniversityItem = (props) => {
  const { university } = props;
  const { id, name } = university || {};
  return (
    <Link to={`/university/${id}`} className={classes.universityItemWrapper}>
      <Typography variant="h6" sx={{ fontWeight: 400, fontSize: "18px" }}>
        {name}
      </Typography>
    </Link>
  );
};

const IntroItem = (props) => {
  const { icon: Icon, text, title } = props;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        boxShadow: 2,
        borderRadius: 4,
        backgroundColor: "var(--colorWhite)",
        gap: "10px",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 500,
          fontSize: "24px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <Icon sx={{ color: "var(--primaryColor)", fontSize: "40px" }} />
        {title}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          fontWeight: 400,
          fontSize: "16px",
          color: "var(--colorGrey500)",
          mt: 1,
          textAlign: "center",
        }}
      >
        {text}
      </Typography>
    </Box>
  );
}

const DocumentSection = (props) => {
  const { items, intl } = props;
  return (
    <div className={classes.documentSectionWrapper}>
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
          <>
            <SwiperSlide
              style={{
                width: "360px",
              }}
              key={`${item.id}_${index}`}
            >
              <DocumentCard
                key={`${item.id}_${index + 1}`}
                intl={intl}
                {...item}
              />
            </SwiperSlide>
          </>
        ))}
      </Swiper>
    </div>
  );
}

function Home() {
  const intl = useIntl();
  const [searchOptions, setSearchOptions] = useState([]);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [recommendedDocuments, setRecommendedDocuments] = useState([]);
  const location = useLocation();

  const onSearchUniversities = (values) => {
    const { search } = values;
  };

  const handleOnInputChangeUniversity = async (event, value) => {
    try {
      const response = await getUniversityListForMember({
        limit: 20,
        keyword: value || "",
      });
      if (response) {
        setSearchOptions(response?.results);
      }
    } catch (err) {
      handleError(err);
    }
  };

  const handleGetRecommendedDocuments = async () => {
    try {
      const response = await getRecommendedDocuments();
      if (response) {
        setRecommendedDocuments(response);
      }
    } catch (error) {
      handleError(error);
    }
  }

  useEffect(() => {
    handleOnInputChangeUniversity(null, "");
    if (isAuthenticated) {
      handleGetRecommendedDocuments();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const hash = window !== undefined && window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100); 
    }
  }, [location])

  return (
    <div className={classes.container}>
      <div className={classes.banner}>
        <div className={classes.bannerDetails}>
          <Typography
            variant="h2"
            style={{ color: "var(--colorGrey800)", fontWeight: "bold" }}
          >
            <FormattedMessage id="HomePage.banner.title" />
          </Typography>
          <Typography
            variant="h6"
            style={{ color: "var(--colorGrey600)", fontWeight: "400" }}
          >
            <FormattedMessage id="HomePage.banner.description" />
          </Typography>
          <div className={classes.bannerButtons}>
            <PrimaryButton>
              <Link to="/s" className={classes.primary}>
                <FormattedMessage id="HomePage.banner.documentSearchButton" />
              </Link>
            </PrimaryButton>
            <PrimaryOutlineButton>
              <Link
                to="#universities"
                className={classes.secondary}
              >
                <FormattedMessage id="HomePage.banner.universitySearchButton" />
              </Link>
            </PrimaryOutlineButton>
          </div>
        </div>
        <div className={classes.bannerImage}></div>
      </div>

      <div className={classes.main}>
        {recommendedDocuments.length > 0 && (
          <>
            <div className={classNames(classes.section)}>
              <div className={classes.sectionHeading}>
                <Assistant className={classes.sectionHeadingIcon} />
                <div className={classes.sectionHeadingText}>
                  <FormattedMessage id="HomePage.recommendedDocumentsSection.title" />
                </div>
              </div>
              <div className={classes.sectionContent}>
                <DocumentSection items={recommendedDocuments} intl={intl} />
              </div>
            </div>
            <div
              className={classNames(classes.section, classes.primarySection)}
            >
              <div className={classes.sectionHeading}>
                <Info className={classes.sectionHeadingIcon} />
                <div className={classes.sectionHeadingText}>
                  <FormattedMessage id="HomePage.introSection.title" />
                </div>
              </div>
              <div className={classes.sectionContent}>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "18px",
                    lineHeight: 1.8,
                    color: "var(--colorGrey600)",
                    mb: 2
                  }}
                >
                  <FormattedMessage id="HomePage.introSection.description1" />
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "18px",
                    lineHeight: 1.8,
                    color: "var(--colorGrey600)",
                  }}
                >
                  <FormattedMessage id="HomePage.introSection.description2" />
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    rowGap: "20px",
                    columnGap: "30px",
                    justifyContent: "center",
                    alignItems: "center",
                    mt: 4
                  }}
                >
                  <IntroItem
                    icon={Search}
                    title={
                      intl.formatMessage({
                        id: "HomePage.introSection.accessibility.title",
                      })
                    }
                    text={
                      intl.formatMessage({
                        id: "HomePage.introSection.accessibility.description",
                      })
                    }
                  />
                  <IntroItem
                    icon={Security}
                    title={
                      intl.formatMessage({
                        id: "HomePage.introSection.quality.title",
                      })
                    }
                    text={
                      intl.formatMessage({
                        id: "HomePage.introSection.quality.description",
                      })
                    }
                    />
                  <IntroItem
                    icon={People}
                    title={
                      intl.formatMessage({
                        id: "HomePage.introSection.community.title",
                      })
                    }
                    text={
                      intl.formatMessage({
                        id: "HomePage.introSection.community.description",
                      })
                    }
                  />
                </Box>
              </div>
            </div>
          </>
        )}
        <div className={classes.section}>
          <div className={classes.sectionHeading}>
            <School className={classes.sectionHeadingIcon} />
            <div className={classes.sectionHeadingText} id="universities">
              {intl.formatMessage({
                id: "HomePage.universitiesSection.title",
              })}
            </div>
          </div>
          <div
            className={classNames(
              classes.sectionContent,
              classes.universityWrapper
            )}
          >
            <SearchInputForm
              onSubmit={onSearchUniversities}
              handleOnInputChange={handleOnInputChangeUniversity}
              searchPlaceholderText={intl.formatMessage({
                id: "HomePage.universitiesSection.searchPlaceholder",
              })}
              options={searchOptions.map((item) => ({
                ...item,
                value: item.name,
              }))}
              className={classes.searchUniversityWrapper}
            />
            <div className={classes.universityList}>
              {searchOptions.map((university) => (
                <UniversityItem
                  key={university.id}
                  university={university}
                  intl={intl}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
