import { useEffect, useRef, useState } from "react";
import { useIntl } from "react-intl";
import { useNavigate, useParams } from "react-router-dom";
import handleError from "../../utils/handleError";
import { Box, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { PrimaryButton, PrimaryOutlineButton } from "../../components/CustomButton/CustomButton";
import WelcomePanel from "./components/WelcomePanel/WelcomePanel";
import { userInfoSelector } from "../../redux/selector";
import { useDispatch, useSelector } from "react-redux";
import UniversityPanel from "./components/UniversityPanel/UniversityPanel";
import { handleGetUserInfo } from "../../api/user";
import authSlice from "../../redux/slice/authSlice";
import CoursePanel from "./components/CoursePanel/CoursePanel";
import CompletedPanel from "./components/CompletedPanel/CompletedPanel";
import { getFavouriteCourseList, getFavouriteDocumentList } from "../../api/personal";

const WELCOME_TAB = 'welcome';
const UNIVERSITY_TAB = 'university';
const COURSE_TAB = 'course';
const COMPLETED_TAB = 'completed';

const TABS = {
  [WELCOME_TAB]: {
    id: WELCOME_TAB,
    label: 'Welcome'
  },
  [UNIVERSITY_TAB]: {
    id: UNIVERSITY_TAB,
    label: 'University'
  },
  [COURSE_TAB]: {
    id: COURSE_TAB,
    label: 'Course'
  },
  [COMPLETED_TAB]: {
    id: COMPLETED_TAB,
    label: 'Completed'
  },
}

const Onboarding = () => {
  const { tab } = useParams();
  const intl = useIntl();
  const currentTab = TABS[tab]?.id || WELCOME_TAB;
  const formRef = useRef(null);
  const activeStep = Object.keys(TABS).indexOf(currentTab);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [favouriteCoursesList, setFavouriteCoursesList] = useState([]);
  const dispatch = useDispatch();

  const handleNavigateToNextTab = () => {
    if (activeStep < Object.keys(TABS).length - 1) {
      navigate(`/onboarding/${Object.keys(TABS)[activeStep + 1]}`);
    } else {
      navigate('/')
    }
  }

  const handleNavigateToPreviousTab = () => {
    if (activeStep > 0) {
      navigate(`/onboarding/${Object.keys(TABS)[activeStep - 1]}`);
    }
  }

  const onSubmit = () => {
    if (!formRef.current) return;
    try {
      formRef.current.submit();
    }
    catch (error) {
      handleError(error);
    }
  }

  const fetchCurrentUser = async () => {
    try {
      const response = await handleGetUserInfo();
      dispatch(
        authSlice.actions.setAuthInfo({
          userInfo: response,
        })
      );
      setCurrentUser(response);
    } catch (err) {
      handleError(err);
    } 
  }

  const fetchFavouriteCourseList = async () => {
    try {
      const response = await getFavouriteCourseList({ fetchAll: true });
      if (response) {
        setFavouriteCoursesList(response.results || []);
      }
    } catch (error) {
      handleError(error);
    }
  }

  const contentTabRenderer = () => {
    switch (currentTab) {
      case WELCOME_TAB: {
        return {
          primaryButtonText: intl.formatMessage({ id: 'Onboarding.nextButton'}),
          primarySubmit: handleNavigateToNextTab,
          component: WelcomePanel
        }
      }
        
      case UNIVERSITY_TAB: {
        return {
          primaryButtonText: intl.formatMessage({ id: 'Onboarding.nextButton'}),
          primarySubmit: onSubmit,
          secondaryButtonText: intl.formatMessage({ id: 'Onboarding.backButton'}),
          secondarySubmit: handleNavigateToPreviousTab,
          title: intl.formatMessage({ id: 'Onboarding.university.title'}),
          subtitle: intl.formatMessage({ id: 'Onboarding.university.subtitle'}),
          component: UniversityPanel,
        }
      }

      case COURSE_TAB: {
        return {
          primaryButtonText: intl.formatMessage({ id: 'Onboarding.nextButton'}),
          primarySubmit: onSubmit,
          secondaryButtonText: intl.formatMessage({ id: 'Onboarding.backButton'}),
          secondarySubmit: handleNavigateToPreviousTab,
          title: intl.formatMessage({ id: 'Onboarding.course.title'}),
          subtitle: intl.formatMessage({ id: 'Onboarding.course.subtitle'}),
          component: CoursePanel,
          props: {
            favouriteCoursesList,
          }
        }
      }

      case COMPLETED_TAB: {
        return {
          primaryButtonText: intl.formatMessage({ id: 'Onboarding.finishButton'}),
          primarySubmit: handleNavigateToNextTab,
          secondaryButtonText: intl.formatMessage({ id: 'Onboarding.backButton'}),
          secondarySubmit: handleNavigateToPreviousTab,
          component: CompletedPanel
        }
      }
    }
  }

  const {
    primaryButtonText,
    primarySubmit,
    secondaryButtonText,
    secondarySubmit,
    title,
    subtitle,
    component: PanelComponent,
    props: panelProps = {},
  } = contentTabRenderer();

  useEffect(() => {
    fetchCurrentUser();
    fetchFavouriteCourseList();
  }, [tab]);

  return (
    <Box
      sx={{
        backgroundColor: "var(--secondaryColor)",
        height: "calc(100vh - var(--navbarHeight))",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: "var(--colorWhite)",
          boxShadow: 2,
          borderRadius: 3,
          width: "900px",
          py: 5,
          px: 6,
        }}
      >
        <Stepper activeStep={activeStep} alternativeLabel>
          {Object.values(TABS).map(({ id, label }) => (
            <Step key={id}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box sx={{ py: 5 }}>
          {title && (
            <Typography variant="h5" sx={{ fontWeight: 500, mb: 1 }}>
              {title}
            </Typography>
          )}
          {subtitle && (
            <Typography variant="body1" sx={{ mb: 4, color: "var(--colorGrey600)" }}>
              {subtitle}
            </Typography>
          )}

          {PanelComponent && (
            <PanelComponent
              currentUser={currentUser}
              intl={intl}
              formRef={formRef}
              handleNavigateToNextTab={handleNavigateToNextTab}
              {...panelProps}
            />
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: secondaryButtonText ? "space-between" : "flex-end",
            alignItems: "center",
            mt: 4,
          }}
        >
          {secondaryButtonText && secondarySubmit && (
            <PrimaryOutlineButton onClick={secondarySubmit}>
              {secondaryButtonText}
            </PrimaryOutlineButton>
          )}
          {primaryButtonText && primarySubmit && (
            <PrimaryButton onClick={primarySubmit}>
              {primaryButtonText}
            </PrimaryButton>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Onboarding;