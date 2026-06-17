import { create } from "zustand";
import { courseApi } from "./course.api";
import {
  CertificateUnlock,
  CourseAssessments,
  CourseCategoryItem,
  CourseModuleItem,
  CurrentCourse,
  DriverCourseItem,
  PlaylistItem,
} from "./course.types";

type CourseStore = {
  loading: boolean;
  coursesLoading: boolean;
  courseDetailLoading: boolean;
  videoSubmitting: boolean;
  error: string | null;
  modules: CourseModuleItem[];
  categories: CourseCategoryItem[];
  courses: DriverCourseItem[];
  assessments: CourseAssessments | null;
  currentCourse: CurrentCourse | null;
  playlist: PlaylistItem[];
  certificateUnlock: CertificateUnlock | null;

  fetchModules: () => Promise<void>;
  fetchCategoriesByModule: (moduleId: string) => Promise<void>;
  fetchCoursesByCategory: (categoryId: string) => Promise<void>;
  fetchCourseById: (courseId: string) => Promise<void>;
};

export const useCourseStore = create<CourseStore>((set) => ({
  loading: false,
  coursesLoading: false,
  courseDetailLoading: false,
  videoSubmitting: false,
  error: null,
  modules: [],
  categories: [],
  courses: [],
  assessments: null,
  currentCourse: null,
  playlist: [],
  certificateUnlock: null,

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
  fetchCourseById: async (courseId: string) => {
    set({
      courseDetailLoading: true,
      error: null,
      currentCourse: null,
      playlist: [],
      certificateUnlock: null,
    });
    try {
      const res = await courseApi.getCourseById(courseId);
      if (!res.status) {
        set({ courseDetailLoading: false, error: res.message });
        return;
      }
      set({
        currentCourse: res.data?.currentCourse ?? null,
        playlist: res.data?.playlist || [],
        certificateUnlock: res.data?.certificateUnlock ?? null,
        courseDetailLoading: false,
      });
    } catch (e: any) {
      set({
        courseDetailLoading: false,
        error: e?.response?.data?.message ?? "Failed to load course details",
      });
    }
  },
  submitVideoWatched: async (courseId: string) => {
    set({ videoSubmitting: true, error: null });
    try {
      const res = await courseApi.submitVideoWatchedStatus(courseId);
      if (!res.status) {
        set({ videoSubmitting: false, error: res.message });
        return false;
      }
      set({ videoSubmitting: false });
      return true;
    } catch (e: any) {
      set({
        videoSubmitting: false,
        error:
          e?.response?.data?.message ?? "Failed to save video playback metrics",
      });
      return false;
    }
  },
}));
