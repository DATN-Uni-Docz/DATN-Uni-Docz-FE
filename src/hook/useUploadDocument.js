import { useState } from "react"
import { getAllAcademicYears, getAllDocumentTypes } from "../api/document"
import handleError from "../utils/handleError";
import { getUniversityListForMember } from "../api/university";
import { getCourseListForMember } from "../api/course";
import { LIMIT_SUGGESTION } from "../constants";


const useUploadDocument = () => {
  const [options, setOptions] = useState({
    universityList: [],
    courseList: []
  });
  const [documentTypeList, setDocumentTypeList] = useState([]);
  const [academicYearList, setAcademicYearList] = useState([]);
  const [universityLoading, setUniversityLoading] = useState(false);
  const [courseLoading, setCourseLoading] = useState(false);
  const [currentUniversity, setCurrentUniversity] = useState(null);

  const handleGetUniversityList = async (keyword) => {
    try {
      setUniversityLoading(true)
      const response = await getUniversityListForMember(
        {
          keyword: keyword ?? "",
          limit: LIMIT_SUGGESTION
        }
      )
      setOptions(prev => ({
        ...prev,
        universityList: response?.results
      }))
      setUniversityLoading(false)
    }
    catch(err) {
      setUniversityLoading(false)
      handleError(err)
    }
  }

  const handleGetCourseList = async ({
    universityId, keyword
  }) => {
    try {
      setCourseLoading(true)
      const { results } = await getCourseListForMember({
        keyword: keyword ?? "",
        limit: LIMIT_SUGGESTION,
        universityId,
      });
      setOptions(prev => (
        {
          ...prev,
          courseList: results
        }
      ))
      if(universityId) {
        setCurrentUniversity({
          name: options?.universityList?.find(item => item.id === universityId)?.name,
          id: universityId
        })
      }
      setCourseLoading(false)
    }
    catch(err) {
      setCourseLoading(false)
      handleError(err)
    }
  }

  const handleGetAllDocumentTypes = async () => {
    try {
      const { documentTypeList } = await getAllDocumentTypes("member");
      setDocumentTypeList(documentTypeList)
    }
    catch(err) {
      handleError(err)
    }
  }

  const handleGetAllAcademicYears = async () => {
    try {
      const { academicYearList } = await getAllAcademicYears("member");
      setAcademicYearList(academicYearList)
    }
    catch(err) {
      handleError(err)
    }
  }

  return {
    options,
    universityLoading,
    courseLoading,
    documentTypeList,
    academicYearList,
    currentUniversity,
    handleGetUniversityList,
    handleGetCourseList,
    handleGetAllAcademicYears,
    handleGetAllDocumentTypes,
    setOptions,
  }

}
export default useUploadDocument