export type DriverModuleType = "MODULE_1" | "MODULE_2";

export interface DriverOperationItem {
  id: string;
  code: string;
  name: string;
  logo: string | null;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface DriverCategoryItem {
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
  operation: DriverOperationItem | null;
  totalCourses: number;
  passedCourses: number;
  progressPercent: number;
}

export interface DriverModuleItem {
  id: string;
  type: DriverModuleType;
  title: string;
  subTitle: string;
  description: string;
  thumbnailUrl: string;
  isCompulsory: boolean;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  moduleTotalCourses: number;
  modulePassedCourses: number;
  moduleProgressPercent: number;
  categories: DriverCategoryItem[];
}

export interface DriverDashboardData {
  overallProgress: number;
  certificateCompleteRatio: number;
  totalCertificatesEarned: number;
  totalCertificatesPossible: number;
  modules: DriverModuleItem[];
}

export interface GetDriverDashboardResponse {
  status: boolean;
  code: string;
  message: string;
  data: DriverDashboardData;
}
