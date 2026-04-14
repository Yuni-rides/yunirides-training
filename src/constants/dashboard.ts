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