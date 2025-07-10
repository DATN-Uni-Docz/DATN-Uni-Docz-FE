import { useIntl } from "react-intl";
import css from "./SearchCourseCard.module.css";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { Divider, Typography } from "@mui/material";
import {
  ArticleOutlined,
  CalendarTodayOutlined,
  PersonAddAltOutlined,
  SchoolOutlined,
} from "@mui/icons-material";

const CourseCard = (props) => {
  const {
    id,
    name,
    description,
    documentCount,
    saveCount,
    university,
    updatedAt,
    className
  } = props;
  const { name: universityName } = university || {};
  const intl = useIntl();

  return (
    <Link
      to={`/course/${id}`}
      className={classNames(css.cardWrapper, className)}
    >
      <Typography variant="h6">{name}</Typography>
      {/* <Typography
        variant="body1"
        sx={{
          color: "var(--colorGrey500)",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {description}
      </Typography> */}
      <div className={css.academicWrapper}>
        <div className={css.academicDetails}>
          <SchoolOutlined sx={{ color: "var(--colorGrey500)" }} />
          <Typography
            variant="body1"
            sx={{
              color: "var(--colorGrey500)",
            }}
          >
            {universityName}
          </Typography>
        </div>
      </div>
      <Divider
        sx={{ margin: "10px 0", backgroundColor: "var(--colorGrey400)" }}
      />
      <div className={css.subInfoWrapper}>
        <div className={css.analysisInfo}>
          <div className={css.subInfoDetails}>
            <ArticleOutlined sx={{ color: "var(--primaryColor)" }} />
            <Typography variant="body1" sx={{ color: "var(--colorGrey500)" }}>
              {intl.formatMessage(
                { id: "SearchCourseCard.documentCount" },
                { count: documentCount }
              )}
            </Typography>
          </div>
          <div className={css.subInfoDetails}>
            <PersonAddAltOutlined sx={{ color: "var(--primaryColor)" }} />
            <Typography variant="body1" sx={{ color: "var(--colorGrey500)" }}>
              {intl.formatMessage(
                { id: "SearchCourseCard.saveCount" },
                { count: saveCount }
              )}
            </Typography>
          </div>
        </div>
        <div className={css.subInfoDetails}>
          <CalendarTodayOutlined sx={{ color: "var(--colorGrey500)" , fontSize: "20px"}} />
          <Typography variant="body1" sx={{ color: "var(--colorGrey500)" }}>
            {intl.formatDate(updatedAt, {
              year: "numeric",
              month: "long",
              day: "2-digit",
            })}
          </Typography>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
