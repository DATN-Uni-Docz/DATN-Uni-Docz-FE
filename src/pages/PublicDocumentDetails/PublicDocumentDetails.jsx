import { Avatar, Box, Divider, Pagination, Typography } from "@mui/material";
import css from "./PublicDocumentDetails.module.css";
import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  downloadDocument,
  getDownloadPresignedUrl,
  getPublicDocumentById,
} from "../../api/document";
import handleError from "../../utils/handleError";
import { useIntl } from "react-intl";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import {
  PrimaryButton,
  PrimaryOutlineButton,
} from "../../components/CustomButton/CustomButton";
import userAvatar from "../../assets/userAvatar.png";
import {
  Article,
  Bookmark,
  BookmarkBorder,
  CalendarMonth,
  ContentCopy,
  Folder,
  LineWeight,
  LocalLibrary,
  OutlinedFlag,
  School,
} from "@mui/icons-material";
import { AUTO_CLOSE_TOAST_DURATION, DOCUMENT_TYPES, FILE_TYPE, OTHER } from "../../constants";
import { formatFileSize } from "../../helper";
import {
  getCurrentStatusFavouriteDocument,
  toggleFavouriteDocument,
} from "../../api/personal";
import { toast } from "react-toastify";
import CustomModal from "../../components/CustomModal/CustomModal";
import { DOMAIN_NAME } from "../../config";
import { useSelector } from "react-redux";
import { roleSelector, userInfoSelector } from "../../redux/selector";
import useBoolean from "../../hook/useBoolean";
import { createReport, getReportTypes } from "../../api/report";
import ReportForm from "./components/ReportForm";
import FilePreviewer from "../../components/FilePreviewer/FilePreviewer";
import { createComment, getCommentsByDocument } from "../../api/comment";
import CommentForm from "./components/CommentForm";
import CommentItem from "./components/CommentItem";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { Mousewheel, Keyboard } from 'swiper/modules';
import SearchDocumentCard from "../../components/SearchDocumentCard/SearchDocumentCard";

const LIMIT = 5;

const DocumentInfoItem = ({ label, value, icon, isLink, href }) => {
  const Wrapper = isLink ? Link : 'div';
  const linkProps = isLink ? { to: href } : {};
  return (
    <Box sx={{ display: "flex", gap: "10px" }}>
      <Box
        sx={{
          color: "var(--colorGrey500)",
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography
          variant="body1"
          sx={{
            color: "var(--colorGrey500)",
            mb: 1,
          }}
        >
          {label}
        </Typography>
        <Wrapper {...linkProps} className={css.documentInfoValue}>
          {value}
        </Wrapper>
      </Box>
    </Box>
  );
};

const AuthorDetails = ({ author, intl }) => {
  const { firstName, lastName, university, uploadCounts } = author;
  const { name: universityName } = university || {};
  return (
    <Box
      sx={{
        borderRadius: 2,
        border: "1px solid var(--outlineColor)",
        p: "20px",
        backgroundColor: "var(--colorWhite)",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 500 }}>
        {intl.formatMessage({
          id: "PublicDocumentDetails.authorDetails.title",
        })}
      </Typography>
      <Box
        sx={{ display: "flex", gap: "12px", alignItems: "flex-start", mt: 1.5 }}
      >
        <Avatar
          alt="Author avatar"
          src={userAvatar}
          sx={{
            width: "56px",
            height: "56px",
          }}
        />
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 500, fontSize: "18px" }}>
            {`${firstName} ${lastName}`}
          </Typography>
          <Box sx={{ mt: "4px" }}>
            <Typography variant="body1" sx={{ color: "var(--colorGrey500)" }}>
              {universityName}
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "var(--colorGrey500)", mt: "2px" }}
            >
              {intl.formatMessage(
                {
                  id: "PublicDocumentDetails.authorDetails.uploadCount",
                },
                {
                  count: uploadCounts,
                }
              )}
            </Typography>
          </Box>
        </Box>
      </Box>
      <PrimaryOutlineButton fullWidth sx={{ mt: 2.5 }}>
        {intl.formatMessage({
          id: "PublicDocumentDetails.authorDetails.viewProfileButton",
        })}
      </PrimaryOutlineButton>
    </Box>
  );
};

const DescriptionDetails = ({ description, intl }) => {
  return (
    <Box
      sx={{
        borderRadius: 2,
        border: "1px solid var(--outlineColor)",
        p: "24px",
        backgroundColor: "var(--colorWhite)",
        mt: 3,
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 500 }}>
        {intl.formatMessage({
          id: "PublicDocumentDetails.DescriptionDetails.title",
        })}
      </Typography>
      <Typography
        variant="body1"
        sx={{ mt: 1.5, color: "var(--colorGrey500)" }}
      >
        {description}
      </Typography>
    </Box>
  );
};

const DocumentDetails = ({ document, course, university, intl }) => {
  const { documentType, academicYear, documentMeta } = document;
  const { size, contentType } = documentMeta || {};
  const { id: courseId, name: courseName } = course;
  const { id: universityId, name: universityName } = university;
  return (
    <Box
      sx={{
        borderRadius: 2,
        border: "1px solid var(--outlineColor)",
        p: "24px",
        backgroundColor: "var(--colorWhite)",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 500 }}>
        {intl.formatMessage({
          id: "PublicDocumentDetails.documentDetails.title",
        })}
      </Typography>
      <Box
        sx={{ display: "flex", flexDirection: "column", gap: "10px", mt: 1.5 }}
      >
        <DocumentInfoItem
          label={intl.formatMessage({
            id: "PublicDocumentDetails.documentDetails.fileType",
          })}
          value={FILE_TYPE[contentType]}
          icon={<Article />}
        />
        <DocumentInfoItem
          label={intl.formatMessage({
            id: "PublicDocumentDetails.documentDetails.university",
          })}
          value={universityName}
          icon={<School />}
          isLink
          href={`/university/${universityId}`}
        />
        <DocumentInfoItem
          label={intl.formatMessage({
            id: "PublicDocumentDetails.documentDetails.course",
          })}
          value={courseName}
          icon={<Folder />}
          isLink
          href={`/course/${courseId}`}
        />
        <DocumentInfoItem
          label={intl.formatMessage({
            id: "PublicDocumentDetails.documentDetails.academicYear",
          })}
          value={academicYear}
          icon={<CalendarMonth />}
        />
        <DocumentInfoItem
          label={intl.formatMessage({
            id: "PublicDocumentDetails.documentDetails.documentType",
          })}
          value={DOCUMENT_TYPES[documentType]}
          icon={<LocalLibrary />}
        />
        <DocumentInfoItem
          label={intl.formatMessage({
            id: "PublicDocumentDetails.documentDetails.size",
          })}
          value={formatFileSize(size)}
          icon={<LineWeight />}
        />
      </Box>
    </Box>
  );
};

const PublicDocumentDetails = () => {
  const { documentId } = useParams();
  const [{ document, course, university, author, recommendations }, setDocumentInfo] = useState({
    document: null,
    course: null,
    university: null,
    author: null,
    recommendations: [],
  });
  const [isFavourite, setIsFavourite] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [reportTypeConfigs, setReportTypeConfigs] = useState([]);
  const [commentList, setCommentList] = useState([])
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [currentPage, setCurrentPage] = useState(null);
  const [paginationMetadata, setPaginationMetadata] = useState(null);
  const shareLinkModal = useBoolean();
  const reportModal = useBoolean();
  const intl = useIntl();
  const role = useSelector(roleSelector);
  const currentUser = useSelector(userInfoSelector);

  const handleDownload = useCallback(async () => {
    try {
      const response = await downloadDocument(documentId);
      if (response) {
        if (window === undefined) return null;
        const { url } = response;
        const link = window.document.createElement("a");
        link.href = url;
        link.setAttribute("download", document.title);
        window.document.body.appendChild(link);
        link.click();
      }
    } catch (error) {
      handleError(error);
      toast.error(intl.formatMessage({
        id: "PublicDocumentDetails.downloadError",
      }), {
        autoClose: AUTO_CLOSE_TOAST_DURATION,
      })
    }
  }, [document, documentId]);

  const handleToggleFavouriteDocument = useCallback(async () => {
    try {
      const response = await toggleFavouriteDocument(documentId);
      if (response) {
        const { isFavourite } = response;
        setIsFavourite(response?.isFavourite);
        const message = isFavourite
          ? intl.formatMessage({ id: "PublicDocumentDetails.favouriteAdded" })
          : intl.formatMessage({
              id: "PublicDocumentDetails.favouriteRemoved",
            });
        toast.info(message, {
          autoClose: AUTO_CLOSE_TOAST_DURATION,
        });
      }
    } catch (error) {
      handleError(error);
    }
  }, [documentId, intl]);

  const handleReport = async(values) => {
    try {
      const {reportType, reason} = values;
      const response = await createReport(
        {
          documentId,
          reportType,
          reporterId: currentUser.id,
          ...(reportType === OTHER && { reason: reason }),
        }
      )
      if (response) {
        toast.success(
          intl.formatMessage({
            id: "PublicDocumentDetails.reportSuccess",
          }),
          {
            autoClose: AUTO_CLOSE_TOAST_DURATION,
          }
        );
        reportModal.setFalse();
      }
    } catch (error) {
      handleError(error);
      toast.error(
        intl.formatMessage({
          id: "PublicDocumentDetails.reportError",
        }),
        {
          autoClose: AUTO_CLOSE_TOAST_DURATION,
        }
      );
    }
  };

  const postComment = async (values) => {
    try {
      const { content } = values;
      await createComment({
        documentId,
        content,
      });
      toast.success(
        intl.formatMessage({
          id: "PublicDocumentDetails.commentSuccess",
        }),
        {
          autoClose: AUTO_CLOSE_TOAST_DURATION,
        }
      );
      await getCommentList();
    } catch (error) {
      handleError(error);
    }
  };

  const getCommentList = async (page) => {
    try {
      const response = await getCommentsByDocument(documentId, {
        page,
        limit: LIMIT
      });
      if (response) {
        const { results, page, limit, totalPages, totalResults } = response;
        setCommentList(results);
        setPaginationMetadata({
          page,
          limit,
          totalPages,
          totalResults,
        });
      }
    }
    catch (error) {
      handleError(error);
    }
  }

  const handleOnChangePage = (event, value) => {
    setCurrentPage(value);
    getCommentList(value);
  };

  const getDocument = async () => {
    try {
      const documentResponse = await getPublicDocumentById(documentId);
      const reportTypeResponse = await getReportTypes();
      if (documentResponse) {
        const { author, course, recommendations, ...rest } = documentResponse;
        setDocumentInfo({
          document: rest,
          course,
          university: course?.university,
          author,
          recommendations,
        });
      }
      if(role) {
        const favouriteDocumentResponse = await getCurrentStatusFavouriteDocument(
          documentId
        );
        
        if (favouriteDocumentResponse) {
          setIsFavourite(favouriteDocumentResponse?.isFavourite);
        }
      }
      setReportTypeConfigs(reportTypeResponse);
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    getDocument();
    getCommentList();
  }, [documentId, role]);

  if (!documentId) return null;
  if (!document || !author) return null;

  return (
    <Box
      sx={{
        mx: "auto",
        maxWidth: "1024px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <Typography
            variant="h4"
            sx={{
              color: "var(--primaryColor)",
              fontWeight: 500,
              fontSize: "32px",
            }}
          >
            {document.title}
          </Typography>
          <Box sx={{ display: "flex", gap: "16px" }}>
            <div className={css.headerIconWrapper}>
              <CalendarMonthOutlinedIcon />
              <Typography variant="body1">
                {intl.formatDate(document.updatedAt, {
                  year: "numeric",
                  month: "long",
                  day: "2-digit",
                })}
              </Typography>
            </div>
            <div className={css.headerIconWrapper}>
              <FileDownloadOutlinedIcon />
              <Typography variant="body1">
                {intl.formatMessage(
                  { id: "PublicDocumentDetails.downloadCount" },
                  {
                    count: document.downloadCount,
                  }
                )}
              </Typography>
            </div>
            <div className={css.headerIconWrapper}>
              <BookmarkBorder />
              <Typography variant="body1">
                {intl.formatMessage(
                  { id: "PublicDocumentDetails.saveCount" },
                  {
                    count: document.saveCount,
                  }
                )}
              </Typography>
            </div>
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: "10px", maxHeight: "50px" }}>
          <PrimaryButton
            onClick={handleDownload}
            sx={{ textTransform: "none", fontSize: "16px" }}
            startIcon={<FileDownloadOutlinedIcon />}
          >
            {intl.formatMessage({ id: "PublicDocumentDetails.downloadButton" })}
          </PrimaryButton>
          <PrimaryOutlineButton onClick={handleToggleFavouriteDocument}>
            {!isFavourite ? (
              <BookmarkBorderOutlinedIcon />
            ) : (
              <Bookmark sx={{ color: "var(--primaryColor)" }} />
            )}
          </PrimaryOutlineButton>
          {/* <PrimaryOutlineButton onClick={shareLinkModal.setTrue}>
            <ShareOutlinedIcon />
          </PrimaryOutlineButton> */}
          <PrimaryOutlineButton onClick={reportModal.setTrue}>
            <OutlinedFlag />
          </PrimaryOutlineButton>
        </Box>
      </Box>
      <Box sx={{ display: "flex", mt: 4, gap: "24px" }}>
        <div className={css.documentPreviewWrapper}>
          <FilePreviewer url={document.viewUrl} />
        </div>
      </Box>
      <DescriptionDetails description={document?.description} intl={intl} />
      <Box
        sx={{
          display: "flex",
          gap: "30px",
          mt: 3,
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            borderRadius: 2,
            border: "1px solid var(--outlineColor)",
            p: "24px",
            backgroundColor: "var(--colorWhite)",
            flex: 1,
          }}
        >
          <CommentForm
            onSubmit={postComment}
            intl={intl}
            currentUser={currentUser}
            isAuthenticated={isAuthenticated}
          />
          <Divider
            sx={{ backgroundColor: "var(--colorLightPrimary)", my: 4 }}
          />
          {commentList?.length > 0 ? (
            <>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "24px",
                  mb: 3,
                }}
              >
                {commentList.map((comment) => (
                  <CommentItem key={comment.id} comment={comment} intl={intl} />
                ))}
              </Box>
              <Pagination
                count={paginationMetadata.totalPages}
                page={paginationMetadata.page}
                onChange={handleOnChangePage}
                size="large"
                sx={{
                  "& .MuiPaginationItem-root.Mui-selected": {
                    backgroundColor: "var(--primaryColor)",
                    color: "white",
                  },
                  "& .MuiPagination-ul": {
                    justifyContent: "center",
                  },
                }}
              />
            </>
          ) : (
            <Typography variant="body1" sx={{ color: "var(--colorGrey500)" }}>
              {intl.formatMessage({
                id: "PublicDocumentDetails.noComments",
              })}
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            maxWidth: "350px",
          }}
        >
          {/* <AuthorDetails author={author} intl={intl} /> */}
          <DocumentDetails
            document={document}
            course={course}
            university={university}
            intl={intl}
          />
        </Box>
      </Box>
      <Box
        sx={{
          borderRadius: 2,
          border: "1px solid var(--outlineColor)",
          p: "24px 24px 40px",
          backgroundColor: "var(--colorWhite)",
          mt: 4
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          {intl.formatMessage({
            id: "PublicDocumentDetails.recommendations.title",
          })}
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
          {recommendations.map((item, index) => (
            <SwiperSlide
              style={{
                width: "360px",
              }}
              key={`${item.id}_${index}`}
            >
              <SearchDocumentCard
                key={`${item.id}_${index + 1}`}
                intl={intl}
                className={css.documentCardWrapper}
                {...item}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
      <CustomModal
        title={intl.formatMessage({
          id: "PublicDocumentDetails.shareLinkModal.title",
        })}
        isOpen={shareLinkModal.value}
        handleClose={shareLinkModal.setFalse}
      >
        <Typography
          variant="body1"
          sx={{ color: "var(--colorGrey500)", fontSize: "18px" }}
        >
          {intl.formatMessage({
            id: "PublicDocumentDetails.shareLinkModal.shareUrlLabel",
          })}
        </Typography>
        <Box sx={{ display: "flex", gap: "12px", mt: 2, height: "40px" }}>
          <Box
            sx={{
              maxWidth: "400px",
              overflow: "hidden",
              textWrap: "nowrap",
              py: 1,
              px: 2,
              border: "1px solid var(--colorGrey500)",
              borderRadius: 3,
              height: "100%",
            }}
          >
            {`${DOMAIN_NAME}/document/${document.id}`}
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              borderRadius: 3,
              border: "1px solid var(--colorGrey500)",
              py: 1,
              px: 2,
              cursor: "pointer",
              gap: "4px",
            }}
            onClick={async () => {
              await navigator.clipboard.writeText(
                `${DOMAIN_NAME}/document/${document.id}`
              );
              setIsCopied(true);
              setTimeout(() => {
                setIsCopied(false);
              }, 1000);
            }}
          >
            <ContentCopy />
            <Typography variant="body1">
              {isCopied
                ? intl.formatMessage({
                    id: "PublicDocumentDetails.shareLinkModal.copied",
                  })
                : intl.formatMessage({
                    id: "PublicDocumentDetails.shareLinkModal.copy",
                  })}
            </Typography>
          </Box>
        </Box>
      </CustomModal>
      <CustomModal
        title={intl.formatMessage({
          id: "PublicDocumentDetails.reportModal.title",
        })}
        isOpen={reportModal.value}
        handleClose={reportModal.setFalse}
      >
        <ReportForm
          onSubmit={handleReport}
          reportTypeConfigs={reportTypeConfigs}
          intl={intl}
        />
      </CustomModal>
    </Box>
  );
};
export default PublicDocumentDetails;
