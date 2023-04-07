/* External dependencies */
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

export const API_ADDRESS = process.env.URL_API_ADDRESS;

const API = axios.create({
  baseURL: API_ADDRESS,
});

API.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.headers.Authorization = `Bearer ${JSON.parse(
      localStorage.getItem("accessToken") || ""
    )}`;

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !error.config._isRetry) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.post(
          `${API_ADDRESS}account/token/refresh/`,
          {
            refresh: localStorage.getItem("refreshToken"),
          }
        );
        localStorage.setItem("accessToken", response.data.access);
        localStorage.setItem("accessToken", response.data.access);
        return API.request(originalRequest);
      } catch (e) {
        return Promise.reject(e);
      }
    } else {
      return Promise.reject(error);
    }
  }
);

export default API;
