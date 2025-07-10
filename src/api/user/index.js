import { getParams } from "../../helper";
import axiosInstance from "../../utils/axios";

const handleLogin = (email, password) => {
  return axiosInstance.post("/auth/login", {
    email,
    password,
  });
};

const handleLoginByOauth = (userId, tokenLogin) => {
  return axiosInstance.post("/auth/login-by-oauth", {
    userId,
    tokenLogin
  })
}

const handleCreateAccessToken = (refreshToken) => {
  return axiosInstance.post("/auth/refresh-token", {
    refreshToken,
  });
};

const handleSignUp = (data) => {
  const newData = getParams(data, ["dateOfBirth", "firstName", "lastName", "gender", "phoneNumber"]);
  return axiosInstance.post("/auth/sign-up", newData);
};

const handleGetUserInfo = () => {
  return axiosInstance.get("/auth/current-user");
};

const handleLogout = (refreshToken) => {
  return axiosInstance.post("/auth/logout", {
    refreshToken,
  });
};

const confirmAccount = (token) => {
  return axiosInstance.get(`/auth/confirm-sign-up`, {
    params: {
      token,
    },
  });
};

const resendEmail = (email) => {
  return axiosInstance.post("/auth/resend-confirmation-email", {
    email,
  });
};

const getUserList = (params) => {
  return axiosInstance.get("/admin/users", {
    params,
  });
}

const getUserById = (userId) => {
  return axiosInstance.get(`/admin/users/${userId}`);
}

export {
  handleLogin,
  handleLoginByOauth,
  handleCreateAccessToken,
  handleSignUp,
  handleGetUserInfo,
  handleLogout,
  confirmAccount,
  resendEmail,
  getUserList,
  getUserById
};
