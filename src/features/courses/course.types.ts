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

export interface QuestionOption {
  text: string;
  label: string;
}

export interface CourseQuestion {
  id: string;
  questionText: string;
  options: QuestionOption[];
  questionDuration?: number;
}

export interface CourseDetailProgress {
  status: "PENDING" | "FAILED" | "COMPLETED";
  videoWatched: boolean;
  quizPassed: boolean;
  quizScore: number | null;
  attemptCount: number;
}

export interface CurrentCourse {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  videoDuration: number;
  passingScore: number;
  questions: CourseQuestion[];
  progress: CourseDetailProgress;
}

export interface PlaylistItem {
  id: string;
  title: string;
  vedioUrl: string;
  thumbnailUrl: string | null;
  duration: string;
  isPassed: boolean;
  isVideoWatched: boolean;
}

export interface CertificateUnlock {
  isEligible: boolean;
  certificateCode: string | null;
  certificateUrl: string | null;
}

export interface QuizAnswer {
  questionId: string;
  selectedOptionIndex: number;
}

export interface SubmitQuizPayload {
  courseId: string;
  answers: QuizAnswer[];
}

export interface GradedAnswer {
  questionId: string;
  selectedOptionIndex: number;
  isCorrect: boolean;
}

export interface CertificateCategory {
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
  module: CourseModuleItem;
}

export interface DriverCertificateItem {
  id: string;
  driverId: string;
  categoryId: string;
  certificateUrl: string;
  certificateCode: string;
  issuedAt: string;
  category: CertificateCategory;
}

export interface GetDriverCertificatesResponse {
  status: boolean;
  code: string;
  message: string;
  data: DriverCertificateItem[];
}

export interface SubmitQuizResult {
  score: number;
  passed: boolean;
  passingScore: number;
  correctCount: number;
  totalQuestions: number;
  gradedAnswers: GradedAnswer[];
}

export interface SubmitQuizResponse {
  status: boolean;
  code: string;
  message: string;
  data: SubmitQuizResult;
}

export interface GetCourseDetailResponse {
  status: boolean;
  code: string;
  message: string;
  data: {
    currentCourse: CurrentCourse;
    playlist: PlaylistItem[];
    certificateUnlock: CertificateUnlock;
  };
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
