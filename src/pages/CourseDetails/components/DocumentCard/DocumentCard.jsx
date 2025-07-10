import { Divider, Typography } from "@mui/material";
import css from "../../CourseDetails.module.css";
import classNames from "classnames";
import {
  BookmarkBorderOutlined,
  CalendarTodayOutlined,
  FileDownloadOutlined,
} from "@mui/icons-material";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";

const DocumentCard = (props) => {
  const {
    id,
    title,
    description,
    updatedAt,
    documentType,
    downloadCount,
    saveCount,
    course,
  } = props;
  const { name: courseName, university } = course || {};
  const { name: universityName } = university || {};
  const intl = useIntl();

  return (
    <Link
      to={`/document/${id}`}
      className={classNames(css.cardItem, css.cardWrapper)}
    >
      <Typography
        variant="h6"
        sx={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {title}
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
            <FileDownloadOutlined sx={{ color: "var(--primaryColor)" }} />
            <Typography variant="body1" sx={{ color: "var(--colorGrey500)" }}>
              {intl.formatMessage(
                { id: "CourseDetails.DocumentCard.downloadCount" },
                { count: downloadCount }
              )}
            </Typography>
          </div>
          <div className={css.subInfoDetails}>
            <BookmarkBorderOutlined sx={{ color: "var(--primaryColor)" }} />
            <Typography variant="body1" sx={{ color: "var(--colorGrey500)" }}>
              {intl.formatMessage(
                { id: "CourseDetails.DocumentCard.saveCount" },
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

export default DocumentCard;
