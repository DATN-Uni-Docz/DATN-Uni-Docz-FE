import { Box, Chip, Divider, Typography } from "@mui/material";
import css from "./SearchDocumentCard.module.css";
import classNames from "classnames";
import {
  AutoStoriesOutlined,
  BookmarkBorderOutlined,
  CalendarTodayOutlined,
  FileDownloadOutlined,
  SchoolOutlined,
} from "@mui/icons-material";
import { ASSIGNMENT, DOCUMENT_TYPES, LECTURE_NOTE, TEXTBOOK } from "../../constants";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";

const DocumentBadge = ({ documentType, className }) => {
  const chipProps = (documentType) => {
    switch (documentType) {
      case LECTURE_NOTE:
        return {
          sx: {
            backgroundColor: "var(--colorBlack)",
            color: "var(--colorWhite)",
          },
        };
      case TEXTBOOK:
        return {
          sx: {
            backgroundColor: "var(--primaryColor)",
            color: "var(--colorWhite)",
          },
        };
      case ASSIGNMENT:
        return {
          sx: {
            backgroundColor: "var(--secondaryColor)",
            color: "var(--colorBlack)",
          },
        };
      default:
        return null;
    }
  };
  return (
    <Chip
      className={classNames(css.badgeWrapper, className)}
      label={DOCUMENT_TYPES[documentType]}
      {...chipProps(documentType)}
    />
  );
};

const SearchDocumentCard = (props) => {
  const {
    id,
    title,
    description,
    updatedAt,
    documentType,
    downloadCount,
    saveCount,
    course,
    className
  } = props;
  const { name: courseName, university } = course || {};
  const { name: universityName } = university || {};
  const intl = useIntl();

  return (
    <Link
      to={`/document/${id}`}
      className={classNames(css.cardWrapper, className)}
    >
      <Box sx={{ display: "flex", flexWrap: "nowrao", gap: "6px 10px",  }}>
        <Typography
          variant="h6"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            textWrap: "nowrap",
          }}
        >
          {title}
        </Typography>
        <DocumentBadge documentType={documentType} className={css.badge} />
      </Box>
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
      <div className={css.academicWrapper}>
        <div className={css.academicDetails}>
          <SchoolOutlined sx={{ color: "var(--colorGrey500)" }} />
          <Typography variant="body1" sx={{ color: "var(--colorGrey500)" }}>
            {universityName}
          </Typography>
        </div>
        <div className={css.academicDetails}>
          <AutoStoriesOutlined sx={{ color: "var(--colorGrey500)" }} />
          <Typography variant="body1" sx={{ color: "var(--colorGrey500)" }}>
            {courseName}
          </Typography>
        </div>
      </div>
      <Divider
        sx={{ margin: "10px 0", backgroundColor: "var(--colorGrey400)" }}
      />
      <div className={css.subInfoWrapper}>
        <div className={css.analysisInfo}>
          <div className={css.subInfoDetails}>
            <FileDownloadOutlined sx={{ color: "var(--primaryColor)" }} />
            <Typography variant="body1" sx={{ color: "var(--colorGrey500)" }}>
              {intl.formatMessage(
                { id: "SearchDocumentCard.downloadCount" },
                { count: downloadCount }
              )}
            </Typography>
          </div>
          <div className={css.subInfoDetails}>
            <BookmarkBorderOutlined sx={{ color: "var(--primaryColor)" }} />
            <Typography variant="body1" sx={{ color: "var(--colorGrey500)" }}>
              {intl.formatMessage(
                { id: "SearchDocumentCard.saveCount" },
                { count: saveCount }
              )}
            </Typography>
          </div>
        </div>
        <div className={css.subInfoDetails}>
          <CalendarTodayOutlined
            sx={{ color: "var(--colorGrey500)", fontSize: "20px" }}
          />
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

export default SearchDocumentCard;
