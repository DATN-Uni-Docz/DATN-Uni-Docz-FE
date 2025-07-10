import { Divider, Typography } from "@mui/material";
import css from "../../UniversityDetails.module.css";
import classNames from "classnames";
import {
  ArticleOutlined,
  BookmarkBorderOutlined,
  CalendarTodayOutlined,
} from "@mui/icons-material";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";

const CourseCard = (props) => {
  const {
    id,
    name,
    description,
    updatedAt,
    documentCount,
    saveCount,
  } = props;
  const intl = useIntl();

  return (
    <Link
      to={`/course/${id}`}
      className={classNames(css.cardItem, css.cardWrapper)}
    >
      <Typography variant="h6">
        {name}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "var(--colorGrey500)",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {description}
      </Typography>
      <Divider
        sx={{ margin: "10px 0", backgroundColor: "var(--colorGrey400)" }}
      />
      <div className={css.subInfoWrapper}>
        <div className={css.analysisInfo}>
          <div className={css.subInfoDetails}>
            <ArticleOutlined sx={{ color: "var(--primaryColor)" }} />
            <Typography variant="body1" sx={{ color: "var(--colorGrey500)" }}>
              {intl.formatMessage(
                { id: "UniversityDetails.CourseCard.documentCount" },
                { count: documentCount }
              )}
            </Typography>
          </div>
          <div className={css.subInfoDetails}>
            <BookmarkBorderOutlined sx={{ color: "var(--primaryColor)" }} />
            <Typography variant="body1" sx={{ color: "var(--colorGrey500)" }}>
              {intl.formatMessage(
                { id: "UniversityDetails.CourseCard.saveCount" },
                { count: saveCount }
              )}
            </Typography>
          </div>
        </div>
        {/* <div className={css.subInfoDetails}>
          <CalendarTodayOutlined sx={{ color: "var(--colorGrey500)" }} />
          <Typography variant="body1" sx={{ color: "var(--colorGrey500)" }}>
            {intl.formatDate(updatedAt, {
              year: "numeric",
              month: "short",
              day: "2-digit",
            })}
          </Typography>
        </div> */}
      </div>
    </Link>
  );
};

export default CourseCard;
