import { create } from "zustand";
import { courseApi } from "./course.api";
import {
  CourseAssessments,
  CourseCategoryItem,
  CourseModuleItem,
  DriverCourseItem,
} from "./course.types";

type CourseStore = {
  loading: boolean;
  coursesLoading: boolean;
  error: string | null;
  modules: CourseModuleItem[];
  categories: CourseCategoryItem[];
  courses: DriverCourseItem[];
  assessments: CourseAssessments | null;

  fetchModules: () => Promise<void>;
  fetchCategoriesByModule: (moduleId: string) => Promise<void>;
  fetchCoursesByCategory: (categoryId: string) => Promise<void>;
};

export const useCourseStore = create<CourseStore>((set) => ({
  loading: false,
  coursesLoading: false,
  error: null,
  modules: [],
  categories: [],
  courses: [],
  assessments: null,

  fetchCategoriesByModule: async (moduleId: string) => {
    set({ loading: true, error: null, categories: [] });
    try {
      const res = await courseApi.getCategoriesByModuleId(moduleId);
      if (!res.status) {
        set({ loading: false, error: res.message });
        return;
      }
      set({ categories: res.data || [], loading: false });
    } catch (e: any) {
      set({
        loading: false,
        error:
          e?.response?.data?.message ?? "Failed to load categories for module",
      });
    }
  },
  fetchModules: async () => {
    set({ loading: true, error: null });
    try {
      const res = await courseApi.getModules();
      if (!res.status) {
        set({ loading: false, error: res.message });
        return;
      }
      set({ modules: res.data || [], loading: false });
    } catch (e: any) {
      set({
        loading: false,
        error: e?.response?.data?.message ?? "Failed to load training modules",
      });
    }
  },
  fetchCoursesByCategory: async (categoryId: string) => {
    set({ coursesLoading: true, error: null, courses: [], assessments: null });
    try {
      const res = await courseApi.getCoursesByCategoryId(categoryId);
      if (!res.status) {
        set({ coursesLoading: false, error: res.message });
        return;
      }
      set({
        courses: res.data?.courses || [],
        assessments: res.data?.assessments || null,
        coursesLoading: false,
      });
    } catch (e: any) {
      set({
        coursesLoading: false,
        error:
          e?.response?.data?.message ?? "Failed to load courses for category",
      });
    }
  },
}));
