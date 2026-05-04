import axios from "axios";

// 1. Fallback URL zaroor rakhein taake agar env file miss ho jaye toh app crash na ho
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.yunirides.com/api";

const apiClient = axios.create({
  baseURL: BASE_URL
});

// 2. Training client hamesha live api par hi rahega (Good!)
export const trainingClient = axios.create({
 //baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
 baseURL: "https://authentic-thirstily-shanty.ngrok-free.dev/api",
});

// Interceptor logic for apiClient
apiClient.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("access_token") ||
    sessionStorage.getItem("access_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Interceptor logic for trainingClient
trainingClient.interceptors.request.use((config) => {
  const token = 
    localStorage.getItem("access_token") || 
    sessionStorage.getItem("access_token");
    
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;