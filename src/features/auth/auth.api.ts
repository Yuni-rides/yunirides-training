import apiClient from "@/lib/axios";
import { LoginFormData } from "./auth.types";

export const authApi = {
  login: async (data: LoginFormData) => {
    // API email mang rahi hai, isliye humne data.username ko email mein pass kiya
    const response = await apiClient.post("/auth/login", {
      email: data.username, 
      password: data.password,
    });

    console.log("LOGIN RESPONSE 👉", response.data);

    // Live API ka structure check karein. Agar data.data ke andar hai toh:
    const userData = response.data?.data?.user || response.data?.user;
    const token = response.data?.data?.accessToken || response.data?.accessToken;

    return {
      user: userData,
      accessToken: token,
    };
  },

  logout: async () => {
    const response = await apiClient.post("/auth/logout");
    console.log("LOGOUT RESPONSE 👉", response.data);
    return response.data;
  },
};