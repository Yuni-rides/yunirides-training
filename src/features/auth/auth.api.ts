import apiClient from "@/lib/axios";
import { LoginFormData } from "./auth.types";

export const authApi = {
  login: async (data: LoginFormData) => {
    const response = await apiClient.post("/auth/login", {
      email: data.username,
      password: data.password,
    });

    console.log("LOGIN RESPONSE 👉", response.data);

    return {
      user: response.data.data.user,
      accessToken: response.data.data.accessToken,
    };

  },
  logout: async () => {
  const response = await apiClient.post("/auth/logout");

  console.log("LOGOUT RESPONSE 👉", response.data);

  return response.data;
},
};