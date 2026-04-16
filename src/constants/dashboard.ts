export const user = {
  name: "James Clark",
  email: "jamesc23@gmail.com",
  avatar: "/images/profileimage.png",
};

export const courses = [
  {
    id: 1,
   
    duration: "15 min",
    status: "Active",
    thumbnail: "/images/course4.png",
  },
  {
    id: 2,
   
    duration: "20 min",
    status: "Not Started",
    thumbnail: "/images/course4.png",
  },
];

export const courseModules = [
  {
    id: 1,
   
    thumbnail: "/images/course1.png",
  },
  {
    id: 2,
   
    thumbnail: "/images/course2.png",
  },
  {
    id: 3,
    
    thumbnail: "/images/course3.png",
  },
  {
    id: 4,
   
    thumbnail: "/images/course2.png",
  },
  {
    id: 5,
   
    thumbnail: "/images/course1.png",
  },
  {
    id: 6,
   
    thumbnail: "/images/course2.png",
  },
];

export const upcomingEvents = [
  {
    id: 1,
    title: "Special needs safety training",
    date: "MAR 28",
    time: "10AM - 11:30AM",
    type: "Online training",
  },
  {
    id: 2,
    title: "Vehicle safety inspection reminder",
    date: "APR 01",
    time: "Deadline 5:00AM",
    type: "Checklist",
  },
];


export const calendarDays = Array.from({ length: 31 }, (_, i) => i + 1);

// constants/dashboard.ts — add this to your courses data
export interface Course {
  id: number;
  title: string;
  desc: string;
  thumbnail?: string;
  status: "active" | "inactive";
  duration: string;
  isFavorited?: boolean;
}

export const course: Course[] = [
  { id: 101, title: "Yunirides new driver training module 1", desc: "MODULE 1 WELCOME Purpose: The purpose of this module is...", status: "active", duration: "15 min" },
  { id: 102, title: "Yunirides new driver training module 1", desc: "MODULE 1 WELCOME Purpose: The purpose of this module is...", status: "inactive", duration: "15 min" },
  { id: 103, title: "Yunirides new driver training module 1", desc: "MODULE 1 WELCOME Purpose: The purpose of this module is...", status: "inactive", duration: "15 min" },
  { id: 104, title: "Yunirides new driver training module 1", desc: "MODULE 1 WELCOME Purpose: The purpose of this module is...", status: "inactive", duration: "15 min" },
  { id: 105, title: "Yunirides new driver training module 1", desc: "MODULE 1 WELCOME Purpose: The purpose of this module is...", status: "inactive", duration: "15 min" },
  { id: 106, title: "Yunirides new driver training module 1", desc: "MODULE 1 WELCOME Purpose: The purpose of this module is...", status: "inactive", duration: "15 min" },
  { id: 107, title: "Yunirides new driver training module 1", desc: "MODULE 1 WELCOME Purpose: The purpose of this module is...", status: "inactive", duration: "15 min" },
  { id: 108, title: "Yunirides new driver training module 1", desc: "MODULE 1 WELCOME Purpose: The purpose of this module is...", status: "inactive", duration: "15 min" },
];
