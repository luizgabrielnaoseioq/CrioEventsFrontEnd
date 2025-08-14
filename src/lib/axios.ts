import { useAuthStore } from "@/pages/auth/store/auth-store";
import axios from "axios";
export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_API,
});

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
