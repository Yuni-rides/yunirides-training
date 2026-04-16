export interface Lesson {
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
  lessons: Lesson[];
}

export const courseModules: CourseModule[] = [
  {
    id: "module-1",
    title: "Yunirides new driver training module 1",
    description: `Welcome to the Yuni Rides Driver Training Program. This course introduces you to our mission, safety standards, and the responsibility that comes with transporting children and youth in our communities.\n\nAt Yuni Rides, every driver plays a vital role in ensuring that students arrive safely, comfortably, and on time. Our service goes beyond transportation — we provide care, trust, and reliability for families, schools, and the children we serve.\n\nThis Course will help you understand the expectations, responsibilities, and professional standards required to become a trusted Yuni Rides driver.`,
    lessons: [
      { id: "l01", num: "01", title: "Introduction to Yuni Rides", duration: "3min", completed: true },
      { id: "l02", num: "02", title: "Driver responsibilities", duration: "5min", completed: false },
      { id: "l03", num: "03", title: "Special needs transportation", duration: "4min", completed: false },
      { id: "l05", num: "05", title: "McKinney-vento & foster youth support", duration: "8min", completed: false },
      { id: "l06", num: "06", title: "Defensive driving", duration: "4min", completed: false },
      { id: "l07", num: "07", title: "Vehicle inspection", duration: "4min", completed: false },
      { id: "l08", num: "08", title: "Emergency Procedures", duration: "3min", completed: false },
      { id: "l09", num: "09", title: "Communication with Parents & Schools", duration: "5min", completed: false },
      { id: "l10", num: "10", title: "Professional conduct", duration: "4min", completed: false },
      { id: "l11", num: "11", title: "Incident reporting", duration: "3min", completed: false },
      { id: "l12", num: "12", title: "Final Assessment", duration: "1min", completed: false },
    ],
  },
];