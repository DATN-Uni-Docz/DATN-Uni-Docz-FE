import axios from "axios";
import { handleCreateAccessToken } from "../api/user";
import authSlice from "../redux/slice/authSlice";
import store from "../redux/store/store";
import { redirect } from "react-router-dom";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (request) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      request.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);
const { dispatch } = store;

axiosInstance.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = localStorage.getItem("refreshToken");
    if (
      error.response.status === 401 &&
      error.config.url === "/auth/refresh-token"
    ) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      dispatch(
        authSlice.actions.setAuthInfo({
          isAuthenticated: false,
          userInfo: {},
        })
      );
      window.location.href = "/login";
    } else if (error.response.status === 401 && !originalRequest._retry) {
      if (!refreshToken && window.location.pathname !== "/login") {
        // return redirect("/login");
        window.location.href = "/login";
      }
      const resultError = error.response.data;
      const { message, user } = resultError;
      if (message === "Account is not active") {
        sessionStorage.setItem("email", user.email);
        window.location.href = "/resend-email";
      };
      
      originalRequest._retry = true;
      const response = await handleCreateAccessToken(refreshToken);
      const { access, refresh } = response;
      localStorage.setItem("accessToken", access.token);
      localStorage.setItem("refreshToken", refresh.token);
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${access.token}`;
      return axiosInstance(originalRequest);
    } else if (error.response.status === 403) {
      return redirect("/login");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
