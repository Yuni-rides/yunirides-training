export const user = {
  name: "James Clark",
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
  desc: string;
  thumbnail?: string;
  status: "active" | "inactive";
  duration: string;
  isFavorited?: boolean;
  title: string;
}

export const course: Course[] = [
  
  { id: 1, title: "Yunirides new driver training module 1", desc: "MODULE 1 WELCOME Purpose: The purpose of this module is...", status: "active", duration: "15 min" },
  { id: 2, title: "Yunirides new driver training module 2", desc: "MODULE 2 WELCOME Purpose: The purpose of this module is...", status: "inactive", duration: "15 min" },
  { id: 3, title: "Yunirides new driver training module 3", desc: "MODULE 3 WELCOME Purpose: The purpose of this module is...", status: "inactive", duration: "15 min" },
  { id: 4, title: "Yunirides new driver training module 4", desc: "MODULE 4 WELCOME Purpose: The purpose of this module is...", status: "inactive", duration: "15 min" },
 
];
