import { http } from "@/lib/shared/api/http";
import {
  GetCategoriesByModuleResponse,
  GetDriverCoursesResponse,
  GetModulesResponse,
} from "./course.types";

export const courseApi = {
  getCoursesByCategoryId: async (
    categoryId: string,
  ): Promise<GetDriverCoursesResponse> => {
    const res = await http.get<GetDriverCoursesResponse>(
      `/training/driver/categories/${categoryId}/courses`,
    );
    return res.data;
  },

  getModules: async (): Promise<GetModulesResponse> => {
    const res = await http.get<GetModulesResponse>("/training/modules");
    return res.data;
  },

  getCategoriesByModuleId: async (
    moduleId: string,
  ): Promise<GetCategoriesByModuleResponse> => {
    const res = await http.get<GetCategoriesByModuleResponse>(
      `/training/modules/${moduleId}/categories`,
    );
    return res.data;
  },
};
