export interface Lesson { // Renamed from 'Course' to avoid confusion
  id: string;
  num: string;
  title: string;
  duration: string;
  completed: boolean;
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  thumbnail: string; // Added this for your dashboard cards
  status: string;    // Added this for your dashboard cards
  duration: string;  // Added this for your dashboard cards
  lessons: Lesson[];
}

export const courseModules: CourseModule[] = [
  {
    id: "1", // Use "1" to match your URL logic: /my-courses/1
    title: "Yunirides new driver training module 1",
    thumbnail: "/images/course4.png", // Needed for Dashboard
    status: "Active",                 // Needed for Dashboard
    duration: "15 min",               // Total time
    description: `Welcome to the Yuni Rides...`,
    lessons: [
      { id: "l01", num: "01", title: "Introduction to Yuni Rides", duration: "3min", completed: true },
      { id: "l02", num: "02", title: "Driver responsibilities", duration: "5min", completed: false },
      // ... keep your other lessons here
    ],
  },
];

// CRITICAL: Export this so your Dashboard doesn't break
export const courses = courseModules;