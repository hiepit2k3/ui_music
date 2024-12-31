import axios from "axios";
import router from '../router/index.js';

const API_URL = "http://localhost:3000/auth/";

export const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosPrivateInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosPrivateInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await axiosInstance.post("refresh");
        return axiosPrivateInstance(originalRequest);
      } catch (refreshError) {
        if (refreshError.response?.status === 401) {
          router.push("/login");
        }
      }
    }
  }
);