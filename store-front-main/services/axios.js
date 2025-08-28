import axios from "axios";
import { useAuthStore } from "../stores/auth";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window === "undefined") {
      return config;
    }
    const stored = localStorage.getItem("auth-storage");
    let token = null;

    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        token = parsed?.state?.token || null;
      } catch (e) {
        console.error("Error parsing auth storage:", e);
      }
    }

    if (!token) {
      token = useAuthStore.getState().token;
    }

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export { axiosInstance };
