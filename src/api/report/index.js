import axiosInstance from "../../utils/axios";

const createReport = (body) => {
  return axiosInstance.post("/member/reports", body);
}

const getReportTypes = () => {
  return axiosInstance.get("/member/reports/report-types");
};

const getReportList = (params) => {
  return axiosInstance.get("/admin/reports", { params });
}

const getReportById = (reportId) => {
  return axiosInstance.get(`/admin/reports/${reportId}`);
};

const getReportListByDocumentId = (documentId, params) => {
  return axiosInstance.get(`/admin/reports/document/${documentId}`, { params });
}

export {
  createReport,
  getReportTypes,
  getReportList,
  getReportById,
  getReportListByDocumentId
}