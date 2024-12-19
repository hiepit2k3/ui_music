import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/v1/";

export const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Cookie sẽ được gửi kèm
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosPrivateInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Cookie sẽ được gửi kèm
  headers: {
    "Content-Type": "application/json",
  },
});

axiosPrivateInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
  
      // Nếu token hết hạn, thử làm mới token
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          // Gửi yêu cầu làm mới token (sử dụng cookie HTTP-only)
          await axiosInstance.post("auth/refresh/");
  
          // Thử gửi lại yêu cầu ban đầu sau khi làm mới
          return axiosPrivateInstance(originalRequest);
        } catch (refreshError) {
          console.error("Làm mới token thất bại:", refreshError);
          // Xử lý khi refresh token không hợp lệ
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );
  