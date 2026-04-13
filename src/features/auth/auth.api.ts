import { http } from "@/shared/api/http";
import type { LoginRequest, LoginResponse } from "./auth.types";

export const authApi = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await http.post<LoginResponse>("/auth/login", data);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await http.post("/auth/logout");
  },

  me: async () => {
    const response = await http.get("/auth/me");
    return response.data;
  },
};