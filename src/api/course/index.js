import axiosInstance from "../../utils/axios";

const getPublicCourseListByUniversityIdAndCourseName = (params) => {
  return axiosInstance.get("/member/courses/university", { params });
};

const getCourseSuggestionListForMember = (params) => {
  return axiosInstance.get("/member/courses/suggestion", { params });
}

const getCourseListForMember = (params) => {
  return axiosInstance.get("/member/courses", { params });
};

const getCourseByIdForMember = (courseId) => {
  return axiosInstance.get(`/member/courses/${courseId}`);
};

const getPopularDocumentListByCourseIdAndDocumentType = async (courseId, params) => {
  return axiosInstance.get(
    `/member/courses/${courseId}/documents/popular`,
    {
      params,
    }
  );
}

const getCourseListForAdmin = (params) => {
  return axiosInstance.get("/admin/courses", { params });
};

const getCourseByIdForAdmin = (courseId) => {
  return axiosInstance.get(`/admin/courses/${courseId}`);
}

const createCourseForAdmin = (data) => {
  return axiosInstance.post("/admin/courses", data);
};

const createCourseForMember = (data) => {
  return axiosInstance.post("/member/courses", data);
}

const editCourse = (courseId, data) => {
  return axiosInstance.patch(`/admin/courses/${courseId}`, data);
};

const deleteCourse = (courseId) => {
  return axiosInstance.delete(`/admin/courses/${courseId}`);
};

export {
  getPublicCourseListByUniversityIdAndCourseName,
  getCourseListForMember,
  getCourseByIdForMember,
  getPopularDocumentListByCourseIdAndDocumentType,
  getCourseListForAdmin,
  getCourseByIdForAdmin,
  createCourseForAdmin,
  editCourse,
  deleteCourse,
  createCourseForMember,
  getCourseSuggestionListForMember
};
