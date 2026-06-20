import { http } from "@/lib/shared/api/http";
import {
  GetCategoriesByModuleResponse,
  GetCourseDetailResponse,
  GetDriverCertificatesResponse,
  GetDriverCoursesResponse,
  GetModulesResponse,
  SubmitQuizPayload,
  SubmitQuizResponse,
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
  getCourseById: async (courseId: string): Promise<GetCourseDetailResponse> => {
    const res = await http.get<GetCourseDetailResponse>(
      `/training/driver/courses/${courseId}`,
    );
    return res.data;
  },
  submitVideoWatchedStatus: async (
    courseId: string,
  ): Promise<{ status: boolean; message: string }> => {
    const res = await http.post<{ status: boolean; message: string }>(
      "/training/driver/video-watched",
      { courseId },
    );
    return res.data;
  },
  submitQuiz: async (
    payload: SubmitQuizPayload,
  ): Promise<SubmitQuizResponse> => {
    const res = await http.post<SubmitQuizResponse>(
      "/training/driver/quiz/submit",
      payload,
    );
    return res.data;
  },
  getDriverCertificates: async (
    moduleId?: string,
  ): Promise<GetDriverCertificatesResponse> => {
    const url = moduleId
      ? `/training/driver/certificates?moduleId=${moduleId}`
      : "/training/driver/certificates";
    const res = await http.get<GetDriverCertificatesResponse>(url);
    return res.data;
  },
};
