import { Box, Typography } from "@mui/material";
import handleError from "../../utils/handleError";
import { useIntl } from "react-intl";
import UploadDocumentForm from "../../components/UploadDocumentForm/UploadDocumentForm";
import {
  createDocument,
  getUploadPresignedUrl,
  uploadFileToS3,
} from "../../api/document";
import useUploadDocument from "../../hook/useUploadDocument";
import {  useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import { toast } from "react-toastify";
import { AUTO_CLOSE_TOAST_DURATION } from "../../constants";
import { useNavigate } from "react-router-dom";
import CustomModal from "../../components/CustomModal/CustomModal";
import CreateCourseForm from "../../components/CreateCourseForm/CreateCourseForm";
import useBoolean from "../../hook/useBoolean";
import { createCourseForMember } from "../../api/course";
import CreateUniversityForm from "../../components/CreateUniversityForm/CreateUniversityForm";
import { createUniversityForMember } from "../../api/university";

function UploadDocument() {
  const intl = useIntl();
  const navigate = useNavigate();
  const {
    options: { courseList, universityList },
    handleGetCourseList,
    handleGetUniversityList,
    universityLoading,
    courseLoading,
    documentTypeList,
    academicYearList,
    handleGetAllAcademicYears,
    handleGetAllDocumentTypes,
    currentUniversity,
  } = useUploadDocument();
  const [errorMessage, setErrorMessage] = useState("");
  const createCourseModal = useBoolean();
  const createUniversityModal = useBoolean();
  const uploadDocumentRef = useRef(null);
  const [newCourse, setNewCourse] = useState(null);
  const [newUniversity, setNewUniversity] = useState(null);

  const onSubmit = async (values) => {
    try {
      const {
        title,
        description,
        universityId,
        courseId,
        academicYear,
        documentType,
        documentFile,
      } = values || {};
      setErrorMessage("");
      const formattedDocumentFile = documentFile.map((item) => {
        const {file, fileName} = item
        const id = uuid();
        const newFileName = `${id}_${fileName}`;
        const originalFile = file;
        const renamedFile = new File([originalFile], newFileName, {
          type: originalFile.type,
          lastModified: Date.now(),
        });
        return {
          ...item,
          file: renamedFile,
          fileName: newFileName,
          oldFileName: fileName,
        };
      });
      const { urls } = await getUploadPresignedUrl(
        formattedDocumentFile.map(({ fileName, size, contentType }) => ({
          fileName,
          size,
          contentType,
        }))
      );
      await uploadFileToS3(formattedDocumentFile?.[0]?.file, urls[0]);
      const response = await createDocument({
        title,
        description,
        universityId,
        courseId,
        academicYear,
        documentFile: formattedDocumentFile?.map(({ fileName, contentType, size, oldFileName }) => (
          {
            documentKey: fileName,
            fileName: oldFileName,
            contentType,
            size,
          }
        )),
        documentType,
      });
      if(response.success) {
        toast.info(
          intl.formatMessage({ id: "UploadDocumentPage.uploadSuccess" }),
          {
            autoClose: AUTO_CLOSE_TOAST_DURATION,
          }
        )
        navigate(`/personal/my-documents/${response?.documentId}`);
      }
    } catch (err) {
      setErrorMessage(
        intl.formatMessage({ id: "UploadDocumentPage.uploadError" })
      )
      handleError(err);
    }
  };

  const handleCreateCourse = async (values) => {
    try {
      const { name, description, universityId } = values || {};
      const response = await createCourseForMember({
        name,
        description,
        universityId
      })
      const { id, name: courseName } = response
      toast.success(
        intl.formatMessage({
          id: "UploadDocumentPage.createCourseSuccess",
        }),
        {
          autoClose: AUTO_CLOSE_TOAST_DURATION,
        }
      )
      uploadDocumentRef.current.change("courseId", id)
      setNewCourse({
        id,
        name: courseName
      })
    }
    catch(err) {
      handleError(err)
      toast.error(
        intl.formatMessage({
          id: "UploadDocumentPage.errorMessage",
        }),
        {
          autoClose: AUTO_CLOSE_TOAST_DURATION,
        }
      )
    }
    finally {
      createCourseModal.setFalse();
    }
  }

  const handleCreateUniversity = async (values) => {
    try {
      const { name, nameEn, universityCode, location } = values || {};
      const response = await createUniversityForMember({
        name,
        nameEn,
        universityCode,
        location
      })
      const { id, name: universityName } = response
      toast.success(
        intl.formatMessage({
          id: "UploadDocumentPage.createUniversitySuccess",
        }),
        {
          autoClose: AUTO_CLOSE_TOAST_DURATION,
        }
      )
      uploadDocumentRef.current.change("universityId", id);
      setNewUniversity({
        id,
        name: universityName
      })
    }
    catch(err) {
      handleError(err)
      toast.error(
        intl.formatMessage({
          id: "UploadDocumentPage.errorMessage",
        }),
        {
          autoClose: AUTO_CLOSE_TOAST_DURATION,
        }
      )
    }
    finally {
      createUniversityModal.setFalse();
    }
  }

  const handleClearNewUniversity = () => {
    setNewUniversity(null);
    uploadDocumentRef.current.change("universityId", null);
    handleClearNewCourse();
  }

  const handleClearNewCourse = () => {
    setNewCourse(null);
    uploadDocumentRef.current.change("courseId", null);
  }

  useEffect(() => {
    handleGetAllAcademicYears();
    handleGetAllDocumentTypes();
    handleGetUniversityList();
  }, [])

  return (
    <Box
      sx={{
        mx: "auto",
        maxWidth: "900px",
      }}
      autoComplete="off"
    >
      <Box>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: "500", fontSize: "28px" }}
        >
          {intl.formatMessage({ id: "UploadDocumentPage.title" })}
        </Typography>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontWeight: "400", color: "var(--colorGrey400)" }}
        >
          {intl.formatMessage({ id: "UploadDocumentPage.subtitle" })}
        </Typography>
      </Box>
      <Box
        sx={{
          boxShadow: 1,
          borderRadius: 3,
          height: "100%",
          padding: "30px",
          backgroundColor: "var(--colorWhite)",
          marginTop: "20px",
        }}
      >
        <UploadDocumentForm
          onSubmit={onSubmit}
          academicYearOptions={academicYearList}
          documentTypeOptions={documentTypeList}
          courseOptions={newCourse ? [newCourse] : courseList}
          universityOptions={newUniversity ? [newUniversity] : universityList}
          handleOnInputCourse={handleGetCourseList}
          handleOnInputUniversity={handleGetUniversityList}
          errorMessage={errorMessage}
          universityLoading={universityLoading}
          courseLoading={courseLoading}
          handleOpenCreateCourseModal={createCourseModal.setTrue}
          handleOpenCreateUniversityModal={createUniversityModal.setTrue}
          formRef={uploadDocumentRef}
          isUniversityDisabled={!!newUniversity}
          isCourseDisabled={!!newCourse}
          handleClearNewUniversity={handleClearNewUniversity}
          handleClearNewCourse={handleClearNewCourse}
        />
      </Box>
      <CustomModal
        isOpen={createCourseModal.value}
        handleClose={createCourseModal.setFalse}
        title={intl.formatMessage({
          id: "AdminCourseList.createCourseModalTitle",
        })}
      >
        <CreateCourseForm
          onSubmit={handleCreateCourse}
          hasInitialUniversity
          universityOptions={[newUniversity || currentUniversity]}
          initialValues={{
            universityId: newUniversity?.id || currentUniversity?.id,
          }}
        />
      </CustomModal>
      <CustomModal
        isOpen={createUniversityModal.value}
        handleClose={createUniversityModal.setFalse}
        title={intl.formatMessage({
          id: "AdminUniversityList.createUniversityModalTitle",
        })}
      >
        <CreateUniversityForm onSubmit={handleCreateUniversity} />
      </CustomModal>
    </Box>
  );
}

export default UploadDocument;
