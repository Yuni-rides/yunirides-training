"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";


const TABS = [
  { id: "all", label: "All" },
  { id: "school-transportation", label: "School Transportation" },
  { id: "non-emergency", label: "Non-Emergency Transport", restricted: true },
  { id: "medicine-lab", label: "Medicine & Lab Deliveries" },
  { id: "certificates", label: "Certificates" },
];

// MOCK_COURSES ko 'any' rakha hai taake interface strict hone par bhi error na aaye
const MOCK_COURSES: unknown[] = [
  {
    id: "new-driver-training-1",
    title: "Yunirides New Driver Training",
    category: "School Transportation",
    thumbnail: "/images/course1.png",
    description: "Standard training for new drivers.",
    duration: "15 min",
    status: "active"
  },
  {
    id: "new-driver-training-2",
    title: "Yunirides New Driver Training",
    category: "School Transportation",
    thumbnail: "/images/course1.png",
    description: "Advanced safety protocols.",
    duration: "20 min",
    status: "active"
  }
];

export default function CourseOverview() {
  const [activeTab, setActiveTab] = useState("all");
  const [courses, setCourses] = useState<any[]>([]); // 'any' taake fallback data accept ho sake
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        
        // Fetch call for courses
        const response = await fetch(`${baseUrl}/api/training/courses`);
        
        if (!response.ok) throw new Error("Backend connection failed");

        const result = await response.json();
        const actualData = Array.isArray(result) ? result : result.data;
        
        if (Array.isArray(actualData) && actualData.length > 0) {
          setCourses(actualData);
        } else {
          setCourses(MOCK_COURSES);
        }
      } catch (error) {
        // Agar backend offline hai (404/500), toh logs mein warning aaye par UI na phate
        console.warn("Backend not reachable. Loading safe mock data.");
        setCourses(MOCK_COURSES);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Filter matching logic based on PostgreSQL category names
  const filteredCourses = (courses || []).filter((course) => {
    if (activeTab === "all") return true;
    if (activeTab === "school-transportation") return course.category === "School Transportation";
    if (activeTab === "medicine-lab") return course.category === "Medicine & Lab Deliveries";
    return false;
  });

  const isRestricted = TABS.find((t) => t.id === activeTab)?.restricted === true;

  return (
    <div className="bg-[#EFF2FF] rounded-2xl shadow-sm overflow-hidden border border-slate-100">
      {/* Tabs Navigation */}
      <div className="flex gap-1 border-b border-gray-200 px-5 pt-4 overflow-x-auto no-scrollbar">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "whitespace-nowrap pb-3 px-3 text-[13px] font-bold transition-all border-b-2 -mb-px uppercase tracking-tight",
              activeTab === tab.id
                ? "border-[#822C89] text-[#822C89]"
                : "border-transparent text-gray-400 hover:text-gray-600"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="relative p-5">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <h3 className="text-[15px] font-black text-[#2C3979] italic uppercase">Course overview</h3>
            <span className="text-[12px] text-gray-400 font-bold uppercase tracking-tighter">
              / {filteredCourses.length} Courses / Yunirides Academy
            </span>
          </div>
        </div>

        {/* Courses Grid */}
        <div className={cn(
          "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-300",
          isRestricted && "blur-md pointer-events-none select-none scale-[0.98]"
        )}>
          {loading ? (
            <div className="col-span-full py-20 text-center flex flex-col items-center gap-2">
              <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" />
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Syncing Academy...</p>
            </div>
          ) : filteredCourses.length > 0 ? (
            filteredCourses.map((item) => (
              <Link key={item.id} href={`/my-courses/${item.id}`} className="group block">
                <div className="rounded-[28px] overflow-hidden bg-white border-2 border-transparent hover:border-purple-200 shadow-sm hover:shadow-xl transition-all duration-500 p-1">
                  <div className="relative w-full aspect-video bg-gray-100 rounded-[22px] overflow-hidden">
                    <img
                      src={item.thumbnail || "/images/course1.png"}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      alt={item.title}
                    />
                    <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full">
                       <p className="text-[9px] font-black text-purple-600 italic uppercase">
                         {item.duration || "15 min"}
                       </p>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-[12px] font-black text-[#1a1a2e] line-clamp-2 leading-tight uppercase italic mb-1">
                      {item.title}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                        <span className="text-[10px] text-gray-400 font-bold uppercase">{item.category}</span>
                        <div className="bg-green-100 px-2 py-0.5 rounded-md">
                           <span className="text-[8px] font-bold text-green-600 uppercase">
                             {item.status || "Active"}
                           </span>
                        </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full py-16 text-center text-gray-400 font-bold italic uppercase tracking-widest bg-white/50 rounded-[24px]">
              No courses found in this category.
            </div>
          )}
        </div>

        {/* Locked/Restricted Category Overlay */}
        {isRestricted && (
          <div className="absolute inset-0 z-20 flex items-center justify-center p-4">
            <div className="bg-white/90 backdrop-blur-sm rounded-[32px] shadow-2xl p-8 max-w-sm w-full text-center border border-white">
              <h3 className="text-lg font-black text-slate-900 mb-2 uppercase italic">Locked Category</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-6 font-bold uppercase">
                Access required for {TABS.find(t => t.id === activeTab)?.label}
              </p>
              <button className="w-full bg-[#822C89] text-white font-black py-3.5 rounded-xl shadow-lg hover:bg-purple-800 transition-all uppercase italic text-sm active:scale-95">
                Request Authorization
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}