// lib/axios.ts (or similar)
import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.yunirides.com/api",
});

apiClient.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("access_token") ||
    sessionStorage.getItem("access_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default apiClient;