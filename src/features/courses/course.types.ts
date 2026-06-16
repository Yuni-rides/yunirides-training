export interface OperationItem {
  id: string;
  code: string;
  name: string;
  logo: string | null;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CourseCategoryItem {
  id: string;
  moduleId: string;
  operationId: string | null;
  name: string;
  description: string | null;
  thumbnailUrl: string | null;
  order: number;
  isActive: boolean;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  operation: OperationItem | null;
}

export interface CourseModuleItem {
  id: string;
  type: "MODULE_1" | "MODULE_2";
  title: string;
  subTitle: string;
  description: string;
  thumbnailUrl: string;
  isCompulsory: boolean;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
}

export interface CourseProgress {
  id?: string;
  driverId?: string;
  courseId?: string;
  status: "PENDING" | "FAILED" | "COMPLETED";
  videoWatched: boolean;
  quizPassed: boolean;
  quizScore: number | null;
  attemptCount: number;
  lastAttemptAt?: string;
  completedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface DriverCourseItem {
  id: string;
  categoryId: string;
  title: string;
  description: string;
  videoUrl: string;
  videoDuration: number;
  thumbnailUrl: string | null;
  passingScore: number;
  order: number;
  isActive: boolean;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  progress: CourseProgress;
}

export interface CourseAssessments {
  overallScore: string;
  courseCompleted: number;
  totalCourses: number;
  paused: number;
  pendingCourse: number;
}

export interface GetDriverCoursesResponse {
  status: boolean;
  code: string;
  message: string;
  data: {
    assessments: CourseAssessments;
    courses: DriverCourseItem[];
  };
}

export interface GetCategoriesByModuleResponse {
  status: boolean;
  code: string;
  message: string;
  data: CourseCategoryItem[];
}

export interface GetModulesResponse {
  status: boolean;
  code: string;
  message: string;
  data: CourseModuleItem[];
}
