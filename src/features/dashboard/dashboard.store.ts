import { create } from "zustand";
import { driverDashboardApi } from "./dashboard.api";
import { DriverDashboardData } from "./dashboard.types";

type DriverDashboardStore = {
  loading: boolean;
  error: string | null;
  dashboardData: DriverDashboardData | null;

  fetchDashboardMetrics: () => Promise<void>;
  clearDashboardError: () => void;
};

export const useDriverDashboardStore = create<DriverDashboardStore>((set) => ({
  loading: false,
  error: null,
  dashboardData: null,

  fetchDashboardMetrics: async () => {
    set({ loading: true, error: null });
    try {
      const res = await driverDashboardApi.getDashboardMetrics();

      if (!res.status) {
        set({ loading: false, error: res.message });
        return;
      }

      set({
        dashboardData: res.data,
        loading: false,
      });
    } catch (e: any) {
      set({
        loading: false,
        error:
          e?.response?.data?.message ??
          "Failed to look up driver dashboard structural metrics.",
      });
    }
  },

  clearDashboardError: () => set({ error: null }),
}));
