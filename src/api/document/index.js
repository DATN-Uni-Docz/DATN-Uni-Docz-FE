import axiosInstance from "../../utils/axios";

const uploadFileToS3 = async (file, presignedUrl) => {
  try {
    const response = await fetch(presignedUrl, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type,
      },
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};

const getUploadPresignedUrl = (data) => {
  return axiosInstance.post("/member/documents/generate-upload-presigned-url", {
    files: data,
  });
};

const getAllDocumentTypes = (role) => {
  return axiosInstance.get(`${role}/documents/document-type`);
}

const getAllAcademicYears = (role) => {
  return axiosInstance.get(`${role}/documents/academic-year`);
};

const getDocumentSuggestionListForMember = (params) => {
  return axiosInstance.get("/member/documents/suggestion", { params });
}

const createDocument = (body) => {
  return axiosInstance.post("/member/documents/upload-document", body)
}

const getPublicDocumentById = (documentId) => {
  return axiosInstance.get(`/member/documents/${documentId}`);
};

const getDownloadPresignedUrl = (body) => {
  return axiosInstance.post("/member/documents/generate-download-presigned-url", body);
}

const downloadDocument = (documentId) => {
  return axiosInstance.post("/member/documents/download-document", { documentId });
}

const getMyDocumentDetailsByDocumentId = (documentId) => {
  return axiosInstance.get(`/member/documents/my-documents/${documentId}`);
}

const updateDocument = async (documentId, body) => {
  return axiosInstance.patch(`/member/documents/my-documents/${documentId}`, body);
}

const getDocumentListForMember = async (params) => {
  return axiosInstance.get("/member/documents", { params });
}

const deleteDocument = async (documentId) => {
  return axiosInstance.delete(`/member/documents/my-documents/${documentId}`);
}

const getDocumentListForAdmin = async (params) => {
  return axiosInstance.get("/admin/documents", { params });
}

const getDocumentById = async (documentId) => {
  return axiosInstance.get(`/admin/documents/${documentId}`);
}

const updateDocumentByAdmin = async (documentId, body) => {
  return axiosInstance.patch(`/admin/documents/${documentId}`, body);
}

const getReportedDocumentList = async (params) => {
  return axiosInstance.get("/admin/documents/report", { params });
}

const resolveDocumentReport = async (documentId, body) => {
  return axiosInstance.post(`/admin/documents/${documentId}/report`, body);
}

const getDocumentUrlById = async (documentId, role) => {
  return axiosInstance.get(`${role}/documents/${documentId}/presigned-url`);
}

export {
  uploadFileToS3,
  getUploadPresignedUrl,
  getAllDocumentTypes,
  getAllAcademicYears,
  createDocument,
  getPublicDocumentById,
  getDownloadPresignedUrl,
  downloadDocument,
  getMyDocumentDetailsByDocumentId,
  updateDocument,
  getDocumentListForMember,
  deleteDocument,
  getDocumentListForAdmin,
  getDocumentById,
  updateDocumentByAdmin,
  getReportedDocumentList,
  resolveDocumentReport,
  getDocumentUrlById,
  getDocumentSuggestionListForMember
}
