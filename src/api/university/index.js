import axiosInstance from "../../utils/axios";

const getUniversityListForMember = (params) => {
  return axiosInstance.get("/member/universities", { params });
};

const getUniversityByIdForMember = (universityId) => {
  return axiosInstance.get(`/member/universities/${universityId}`);
}

const getUniversityListForAdmin = (params) => {
  return axiosInstance.get("/admin/universities", { params });
};

const getUniversityByIdForAdmin = (universityId) => {
  return axiosInstance.get(`/admin/universities/${universityId}`);
}

const createUniversityForAdmin = (data) => {
  return axiosInstance.post("/admin/universities", data);
};

const createUniversityForMember = (data) => {
  return axiosInstance.post("/member/universities", data);
}

const editUniversity = (universityId, data) => {
  return axiosInstance.patch(`/admin/universities/${universityId}`, data);
};

const deleteUniversity = (universityId) => {
  return axiosInstance.delete(`/admin/universities/${universityId}`);
};

export {
  getUniversityListForMember,
  getUniversityByIdForMember,
  getUniversityListForAdmin,
  getUniversityByIdForAdmin,
  createUniversityForAdmin,
  createUniversityForMember,
  editUniversity,
  deleteUniversity,
};
