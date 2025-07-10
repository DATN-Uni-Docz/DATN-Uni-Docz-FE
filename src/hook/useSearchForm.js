import queryString from "query-string";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getUniversityByIdForMember,
  getUniversityListForMember,
} from "../api/university";
import handleError from "../utils/handleError";
import {
  getCourseListForMember,
  getCourseByIdForMember,
} from "../api/course";

const LIMIT = 10;

const useSearchForm = () => {
  const location = useLocation();
  const {
    universityId: universityParamId,
    courseId: courseParamId,
    documentType,
  } = useMemo(() => {
    return queryString.parse(location.search, {
      arrayFormat: "comma",
    });
  }, [location.search]);
  const [options, setOptions] = useState({
    universityList: [],
    courseList: [],
  });
  const [universityLoading, setUniversityLoading] = useState(false);
  const [courseLoading, setCourseLoading] = useState(false);

  const handleGetUniversityList = async (keyword) => {
    try {
      setUniversityLoading(true);
      const response = await getUniversityListForMember({
        keyword: keyword ?? "",
        limit: LIMIT,
      });
      setOptions((prev) => ({
        ...prev,
        universityList: response?.results,
      }));
      setUniversityLoading(false);
    } catch (err) {
      setUniversityLoading(false);
      handleError(err);
    }
  };

  const handleGetCourseList = async ({ universityId, keyword }) => {
    try {
      setCourseLoading(true);
      const { results } = await getCourseListForMember({
        keyword: keyword ?? "",
        limit: LIMIT,
        universityId,
      });
      setOptions((prev) => ({
        ...prev,
        courseList: results,
      }));
      setCourseLoading(false);
    } catch (err) {
      setCourseLoading(false);
      handleError(err);
    }
  };

  const getInitialOptions = async () => {
    try {
      if (universityParamId) {
        const university = await getUniversityByIdForMember(universityParamId);
        const { id: universityId, name: universityName } = university || {};
        if (courseParamId) {
          const course = await getCourseByIdForMember(courseParamId);
          const { id: courseId, name: courseName } = course || {};
          if (course?.universityId === universityId) {
            setOptions((prev) => ({
              ...prev,
              universityList: [
                {
                  id: universityId,
                  name: universityName,
                },
              ],
              courseList: [
                {
                  id: courseId,
                  name: courseName,
                },
              ],
            }));
          }
        }
        setOptions((prev) => ({
          ...prev,
          universityList: [
            {
              id: universityId,
              name: universityName,
            },
          ],
        }));
      } else {
        await handleGetUniversityList();
      }
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    getInitialOptions();
  }, []);

  const initialValues = useMemo(() => {
    return {
      courseId: courseParamId,
      universityId: universityParamId,
      documentType: Array.isArray(documentType) ? documentType : [documentType],
    };
  }, [universityParamId, courseParamId, documentType]);
  return {
    options,
    handleGetUniversityList,
    handleGetCourseList,
    universityLoading,
    courseLoading,
    initialValues,
  };
};

export default useSearchForm;
