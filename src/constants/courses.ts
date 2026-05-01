export interface Lesson {
  id: string;
  num: string;
  title: string;
  duration: string;
  completed: boolean;
}

export interface CourseModule {
  id: string;      // This matches the 'id' (UUID) from your PostgreSQL
  title: string;
  category: string; // Matches your Backend entity
  thumbnail?: string;
  status?: string;
  duration?: string;
  description: string;
  lessons?: Lesson[]; // Optional, as you might not fetch lessons on the main dashboard
}

// We export an empty array just to prevent "Import errors" while you finish the setup
export const courseModules: CourseModule[] = [];
export const courses = courseModules;