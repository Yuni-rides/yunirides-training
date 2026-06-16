import { http } from "@/lib/shared/api/http";
import { GetDriverDashboardResponse } from "./dashboard.types";

export const driverDashboardApi = {
  getDashboardMetrics: async (): Promise<GetDriverDashboardResponse> => {
    const res = await http.get<GetDriverDashboardResponse>("/training/driver/dashboard");
    return res.data;
  },
};