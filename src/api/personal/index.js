import axios from "axios";
import axiosInstance from "../../utils/axios";

const handleUpdateProfile = (body) => {
  return axiosInstance.patch("/member/personal/profile", body);
};

const handleChangePassword = (config) => {
  return axiosInstance.patch("/member/personal/password", config);
};

const handleUploadImage = (images) => {
  return axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload/`, images);
};

const handleUpdateAvatar = (config) => {
  return axiosInstance.patch("/customer/personal/avatar", config);
};

const toggleFavouriteDocument = async (documentId) => {
  return axiosInstance.post("/member/personal/favourite-document", { documentId });
};

const getCurrentStatusFavouriteDocument = async (documentId) => {
  return axiosInstance.get(`/member/personal/favourite-document/${documentId}`);
};

const toggleFavouriteCourse = async (courseId) => {
  return axiosInstance.post("/member/personal/favourite-course", { courseId });
};

const getCurrentStatusFavouriteCourse = async (courseId) => {
  return axiosInstance.get(`/member/personal/favourite-course/${courseId}`);
};

const getFavouriteDocumentList = async (params) => {
  return axiosInstance.get("/member/personal/favourite-document", { params });
}

const getFavouriteCourseList = async (params) => {
  return axiosInstance.get("/member/personal/favourite-course", { params });
};

const getMyDocumentList = async (params) => {
  return axiosInstance.get("/member/personal/document", { params });
}

const updateFavouriteCourseList = async (body) => {
  return axiosInstance.post("/member/personal/favourite-course-list", body);
}

const getPersonalSubscriptions = async (params) => {
  return axiosInstance.get("/member/personal/subscriptions", { params });
}

const getPersonalSubscriptionAnalysis = async () => {
  return axiosInstance.get("/member/personal/subscription-analysis");
}

const getRecommendedDocuments = async (params) => {
  return axiosInstance.get("/member/personal/recommended-documents", { params });
}

export {
  handleUpdateProfile,
  handleChangePassword,
  handleUploadImage,
  handleUpdateAvatar,
  toggleFavouriteDocument,
  getCurrentStatusFavouriteDocument,
  toggleFavouriteCourse,
  getCurrentStatusFavouriteCourse,
  getFavouriteDocumentList,
  getFavouriteCourseList,
  getMyDocumentList,
  updateFavouriteCourseList,
  getPersonalSubscriptions,
  getPersonalSubscriptionAnalysis,
  getRecommendedDocuments
};
