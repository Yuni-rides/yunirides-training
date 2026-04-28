// lib/axios.ts (or similar)
import axios from "axios";

const apiClient = axios.create({
baseURL: process.env.NEXT_PUBLIC_API_URL
  
});
  export const trainingClient = axios.create({
 baseURL: "http://localhost:5000/api",
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
// Interceptor for Local Training Client (Yahan bhi token bhej dete hain agar local backend ko chahiye ho)
trainingClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token") || sessionStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}); 

export default apiClient;