import { Box, Typography } from "@mui/material";
import { useIntl } from "react-intl";
import { useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import handleError from "../../utils/handleError.js";
import { toast } from "react-toastify";
import { AUTO_CLOSE_TOAST_DURATION, COURSE_STATUS, LIMIT_SUGGESTION, UNIVERSITY_STATUS } from "../../constants/index.js";
import {
  getAllAcademicYears,
  getAllDocumentTypes,
  getDocumentById,
  getDocumentUrlById,
  updateDocumentByAdmin,
} from "../../api/document/index.js";
import AdminDocumentDetailsForm from "./components/AdminDocumentDetailsForm.jsx";
import { PrimaryButton } from "../../components/CustomButton/CustomButton.jsx";
import FilePreviewer from "../../components/FilePreviewer/FilePreviewer.jsx";
import VisibilityIcon from '@mui/icons-material/Visibility';
import classNames from "classnames";
import css from "./AdminDocumentDetails.module.css";
import { getUniversityListForAdmin } from "../../api/university/index.js";
import { getCourseListForAdmin } from "../../api/course/index.js";

const AdminDocumentDetails = () => {
  const { documentId } = useParams();
  const [loading, setLoading] = useState(false);
  const [document, setDocument] = useState(null);
  const [fileUrl, setfileUrl] = useState(null);
  const [isPreviewFileLoading, setIsPreviewFileLoading] = useState(false);
  const intl = useIntl();
  const [courseOptions, setCourseOptions] = useState([]);
  const [universityOptions, setUniversityOptions] = useState([]);
  const [documentTypeList, setDocumentTypeList] = useState([]);
  const [academicYearList, setAcademicYearList] = useState([]);
  const initialDocumentValues = useMemo(() => {
    const {
      id,
      title,
      description,
      downloadCount,
      saveCount,
      documentType,
      status,
      viewUrl,
      course,
      academicYear,
      userId,
      author,
      flaggedReason
    } = document || {};
    const {
      id: courseId,
      name: courseName,
      status: courseStatus,
      university,
    } = course || {};
    const {
      id: universityId,
      name: universityName,
      status: universityStatus,
    } = university || {};
    const { email } = author || {};
    return {
      id,
      title,
      description,
      downloadCount,
      saveCount,
      documentType,
      viewUrl,
      status,
      courseId,
      courseName,
      courseStatus,
      universityId,
      universityName,
      universityStatus,
      academicYear,
      userId,
      email,
      flaggedReason
    };
  }, [document]);
  const isCoursePublic = document?.course?.status === COURSE_STATUS.PUBLIC;

  const handleGetAllDocumentTypes = async () => {
    try {
      const { documentTypeList } = await getAllDocumentTypes("admin");
      setDocumentTypeList(documentTypeList)
    }
    catch(err) {
      handleError(err)
    }
  }

  const handleGetAllAcademicYears = async () => {
    try {
      const { academicYearList } = await getAllAcademicYears("admin");
      setAcademicYearList(academicYearList)
    }
    catch(err) {
      handleError(err)
    }
  }

  const fetchDocumentData = async () => {
    try {
      setLoading(true);
      const response = await getDocumentById(documentId);
      if (response) {
        setDocument(response);
        const {course} = response || {};
        const {university} = course || {};
        setUniversityOptions([
          {
            id: university?.id,
            name: university?.name,
          },
        ]);
        setCourseOptions([
          {
            id: course?.id,
            name: course?.name,
          },
        ]);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateDocumentByAdmin = async (values) => {
    try {
      const {
        status,
        title,
        description,
        academicYear,
        documentType,
        courseId,
      } = values;
      await updateDocumentByAdmin(documentId, { 
        status,
        title,
        description,
        academicYear,
        documentType,
        courseId,
       });
      await fetchDocumentData();
      toast.success(
        intl.formatMessage({ id: "AdminDocumentDetails.updateSuccess" }),
        {
          autoClose: AUTO_CLOSE_TOAST_DURATION,
        }
      );
    } catch (error) {
      handleError(error);
      toast.error(
        intl.formatMessage({ id: "AdminDocumentDetails.updateErrorMessage" }),
        {
          autoClose: AUTO_CLOSE_TOAST_DURATION,
        }
      );
    }
  };

  const handlePreviewFile = async () => {
    try {
      setIsPreviewFileLoading(true);
      const response = await getDocumentUrlById(documentId, 'admin');
      if (response.url) {
        setfileUrl(response.url);
      } else {
        toast.error(
          intl.formatMessage({ id: "AdminDocumentDetails.noFileToPreview" }),
          {
            autoClose: AUTO_CLOSE_TOAST_DURATION,
          }
        );
      }
    }
    catch (error) {
      handleError(error);
      toast.error(
        intl.formatMessage({ id: "AdminDocumentDetails.previewError" }),
        {
          autoClose: AUTO_CLOSE_TOAST_DURATION,
        }
      );
    } finally {
      setIsPreviewFileLoading(false);
    }
  }

  const handleGetUniversityList = async (keyword) => {
    try {
      const response = await getUniversityListForAdmin(
        {
          keyword: keyword ?? "",
          limit: LIMIT_SUGGESTION,
          status: UNIVERSITY_STATUS.PUBLIC
        }
      )
      setUniversityOptions([...(response ? response.results : [])]);
    }
    catch(err) {
      handleError(err)
    }
  }

  const handleGetCourseList = async ({
    universityId, keyword
  }) => {
    try {
      const { results } = await getCourseListForAdmin({
        keyword: keyword ?? "",
        limit: LIMIT_SUGGESTION,
        universityId,
        status: COURSE_STATUS.PUBLIC
      });
      setCourseOptions(
        [...(results ? results : [])]
      )
    }
    catch(err) {
      handleError(err)
    }
  }

  useEffect(() => {
    fetchDocumentData();
    handleGetAllDocumentTypes();
    handleGetAllAcademicYears();
  }, [documentId]);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: "500", fontSize: "28px" }}
          >
            {intl.formatMessage({ id: "AdminDocumentDetails.title" })}
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontWeight: "400", color: "var(--colorGrey400)", mb: 4 }}
          >
            {intl.formatMessage({ id: "AdminDocumentDetails.subtitle" })}
          </Typography>
        </Box>
        {!fileUrl && (
          <PrimaryButton
            onClick={handlePreviewFile}
            loading={isPreviewFileLoading}
            startIcon={<VisibilityIcon />}
          >
            {intl.formatMessage({
              id: "AdminDocumentDetails.previewFileButton",
            })}
          </PrimaryButton>
        )}
      </Box>
      {fileUrl && (
        <Box sx={{ height: "90vh" }}>
          <FilePreviewer url={fileUrl} />
        </Box>
      )}
      {!loading && (
        <AdminDocumentDetailsForm
          className={classNames({
            [css.hasFilePreview]: fileUrl,
          })}
          initialValues={{ ...initialDocumentValues }}
          onSubmit={handleUpdateDocumentByAdmin}
          isCoursePublic={isCoursePublic}
          academicYearOptions={academicYearList}
          documentTypeOptions={documentTypeList}
          courseOptions={courseOptions}
          universityOptions={universityOptions}
          handleOnInputCourse={handleGetCourseList}
          handleOnInputUniversity={handleGetUniversityList}
        />
      )}
    </Box>
  );
};

export default AdminDocumentDetails;
