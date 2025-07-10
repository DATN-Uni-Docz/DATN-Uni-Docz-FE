import { useEffect, useMemo, useState } from "react";
import {
  deleteDocument,
  getDocumentUrlById,
  getMyDocumentDetailsByDocumentId,
  updateDocument,
} from "../../api/document";
import { Link, useParams } from "react-router-dom";
import handleError from "../../utils/handleError";
import { Box, Skeleton, Typography } from "@mui/material";
import { useIntl } from "react-intl";
import UploadDocumentForm from "../../components/UploadDocumentForm/UploadDocumentForm";
import useUploadDocument from "../../hook/useUploadDocument";
import { AUTO_CLOSE_TOAST_DURATION, DOCUMENT_STATUS, TIMEOUT_LOADING } from "../../constants";
import { toast } from "react-toastify";
import { PrimaryButton, PrimaryOutlineButton } from "../../components/CustomButton/CustomButton";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { DeleteOutline, Visibility } from "@mui/icons-material";
import CustomModal from "../../components/CustomModal/CustomModal";
import useBoolean from "../../hook/useBoolean";
import FilePreviewer from "../../components/FilePreviewer/FilePreviewer";

const MyDocumentDetails = () => {
  const { documentId } = useParams();
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);
  const deleteDocumentModal = useBoolean();
  const [isPreviewFileLoading, setIsPreviewFileLoading] = useState(false);
  const [fileUrl, setfileUrl] = useState(null);
  const intl = useIntl();
  const {
    options: { courseList, universityList },
    setOptions,
    handleGetCourseList,
    handleGetUniversityList,
    universityLoading,
    courseLoading,
    academicYearList,
    documentTypeList,
    handleGetAllDocumentTypes,
    handleGetAllAcademicYears,
  } = useUploadDocument();

  const errorMessage = intl.formatMessage({
    id: "MyDocumentDetails.errorMessage",
  })

  const initialValues = useMemo(() => {
    const {
      title,
      description,
      course,
      academicYear,
      documentType,
      documentMeta,
      status
    } = document || {};
    const { id: courseId, university } = course || {};
    const { id: universityId } = university || {};
    return {
      title,
      description,
      universityId,
      courseId,
      academicYear,
      documentType,
      documentFile: [documentMeta],
      status,
    }
  }, [document])

  const onSubmit = async (values) => {
    try {
      const {
        title,
        description,
        // universityId,
        // courseId,
        academicYear,
        documentType,
      } = values;
      await updateDocument(documentId, {
        title,
        description,
        // universityId,
        // courseId,
        academicYear,
        documentType,
      });
      toast.info(
        intl.formatMessage({ id: "MyDocumentDetails.updateSuccess" }),
        {
          autoClose: AUTO_CLOSE_TOAST_DURATION,
        }
      );
    } catch (err) {
      handleError(err);
      toast.error(
        errorMessage,
        {
          autoClose: AUTO_CLOSE_TOAST_DURATION,
        }
      );
    }
  };

  const getDocument = async () => {
    try {
      setLoading(true);
      const response = await getMyDocumentDetailsByDocumentId(documentId);
      const { course } = response || {};
        const { id: courseId, name: courseName, university } = course;
        const { id: universityId, name: universityName } = university || {};
      setOptions({
        universityList: [{
          id: universityId,
          name: universityName,
        }],
        courseList: [{
          id: courseId,
          name: courseName,
        }],
      })
      setDocument(response);
    } catch (err) {
      handleError(err);
      toast.error(
        errorMessage,
        {
          autoClose: AUTO_CLOSE_TOAST_DURATION,
        }
      );
    }
    finally {
      setTimeout(() => {
        setLoading(false);
      }, TIMEOUT_LOADING);
    }
  };

  const handleOnDeleteDocument = async () => {
    try {
      setLoading(true);
      await deleteDocument(documentId);
      toast.info(
        intl.formatMessage({ id: "MyDocumentDetails.deleteSuccess" }),
        { autoClose: AUTO_CLOSE_TOAST_DURATION }
      );
      await getDocument();
      deleteDocumentModal.setFalse();
    }
    catch (err) {
      handleError(err);
      toast.error(
        errorMessage,
        {
          autoClose: AUTO_CLOSE_TOAST_DURATION,
        }
      );
    }
    finally {
      setTimeout(() => {
        setLoading(false);
      }, TIMEOUT_LOADING);
    }
  };

  const handlePreviewFile = async () => {
    try {
      setIsPreviewFileLoading(true);
      const response = await getDocumentUrlById(documentId, 'member');
      if (response.url) {
        setfileUrl(response.url);
      } else {
        toast.error(
          intl.formatMessage({ id: "MyDocumentDetails.noFileToPreview" }),
          {
            autoClose: AUTO_CLOSE_TOAST_DURATION,
          }
        );
      }
    }
    catch (error) {
      handleError(error);
      toast.error(
        intl.formatMessage({ id: "MyDocumentDetails.previewError" }),
        {
          autoClose: AUTO_CLOSE_TOAST_DURATION,
        }
      );
    } finally {
      setIsPreviewFileLoading(false);
    }
  }

  useEffect(() => {
    getDocument();
    handleGetAllDocumentTypes();
    handleGetAllAcademicYears();
  }, [documentId]);
  if (!document || !documentId) return null;

  return (
    <Box
      sx={{
        mx: "auto",
        maxWidth: "900px",
      }}
      autoComplete="off"
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <Box>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: "500", fontSize: "28px" }}
          >
            {intl.formatMessage({ id: "MyDocumentDetails.title" })}
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontWeight: "400", color: "var(--colorGrey400)" }}
          >
            {intl.formatMessage({ id: "MyDocumentDetails.subtitle" })}
          </Typography>
        </Box>
        {document?.status !== DOCUMENT_STATUS.DELETED && !loading && (
          <Box
            sx={{ maxHeight: "40px", mb: "10px", display: "flex", gap: "10px" }}
          >
            <PrimaryOutlineButton
              loading={loading}
              onClick={deleteDocumentModal.setTrue}
              startIcon={<DeleteOutline />}
            >
              {intl.formatMessage({
                id: "MyDocumentDetails.deleteButton",
              })}
            </PrimaryOutlineButton>

            {!fileUrl && (
              <PrimaryOutlineButton
                onClick={handlePreviewFile}
                loading={isPreviewFileLoading}
                startIcon={<Visibility />}
              >
                {intl.formatMessage({
                  id: "MyDocumentDetails.previewFileButton",
                })}
              </PrimaryOutlineButton>
            )}

            {document?.status === DOCUMENT_STATUS.PUBLIC && (
              <PrimaryButton startIcon={<TrendingUpIcon />}>
                <Link
                  to={`/document/${documentId}`}
                  style={{ color: "var(--colorWhite)" }}
                >
                  {intl.formatMessage({
                    id: "MyDocumentDetails.redirectPublicDocumentPageButton",
                  })}
                </Link>
              </PrimaryButton>
            )}
          </Box>
        )}
      </Box>
      {fileUrl && (
        <Box sx={{ height: "90vh", mt: 2 }}>
          <FilePreviewer url={fileUrl} />
        </Box>
      )}
      {loading ? (
        <Skeleton variant="rectangular" sx={{ height: "70vh", mt: 2 }} />
      ) : (
        <Box
          sx={{
            boxShadow: 1,
            borderRadius: 3,
            height: "100%",
            padding: "30px",
            backgroundColor: "var(--colorWhite)",
            mt: 3,
          }}
        >
          <UploadDocumentForm
            onSubmit={onSubmit}
            academicYearOptions={academicYearList}
            documentTypeOptions={documentTypeList}
            courseOptions={courseList}
            universityOptions={universityList}
            handleOnInputCourse={handleGetCourseList}
            handleOnInputUniversity={handleGetUniversityList}
            universityLoading={universityLoading}
            courseLoading={courseLoading}
            initialValues={initialValues}
            editMode
            isUniversityDisabled
            isCourseDisabled
          />
        </Box>
      )}
      <CustomModal
        isOpen={deleteDocumentModal.value}
        handleClose={deleteDocumentModal.setFalse}
        title={intl.formatMessage({
          id: "MyDocumentDetails.deleteDocumentModal.title",
        })}
        handleAction={handleOnDeleteDocument}
      >
        <Typography variant="body1">
          {intl.formatMessage({
            id: "MyDocumentDetails.deleteDocumentModal.description",
          })}
        </Typography>
      </CustomModal>
    </Box>
  );
};

export default MyDocumentDetails;
