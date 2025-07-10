import axiosInstance from "../../utils/axios";

const createComment = (body) => {
  return axiosInstance.post("/member/comments", body);
}

const getCommentsByDocument = async (documentId, params) => {
  return axiosInstance.get(`/member/comments/${documentId}`, { params });
}

export {
  createComment,
  getCommentsByDocument
}