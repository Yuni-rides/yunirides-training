"use client";

import { useState, useEffect } from "react";
import { LayoutGrid, ChevronDown } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { CourseModule } from "@/constants/courses";

const TABS = [
  { id: "all", label: "All" },
  { id: "school-transportation", label: "School Transportation" },
  { id: "non-emergency", label: "Non-Emergency Transport", restricted: true },
  { id: "medicine-lab", label: "Medicine & Lab Deliveries" },
  { id: "certificates", label: "Certificates" },
];

export default function CourseOverview() {
  const [activeTab, setActiveTab] = useState("all");
  const [courses, setCourses] = useState<CourseModule[]>([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/training/courses");
        const result = await response.json();
        
        // FIX 1: Handle both { data: [] } and raw [...] responses
        const actualData = Array.isArray(result) ? result : result.data;
        
        if (Array.isArray(actualData)) {
          setCourses(actualData);
        }
      } catch (error) {
        console.error("Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  // FIX 2: Matching logic using exact strings from your PostgreSQL database
  const filteredCourses = courses.filter((course) => {
    if (activeTab === "all") return true;
    if (activeTab === "school-transportation") return course.category === "School Transportation";
    if (activeTab === "medicine-lab") return course.category === "Medicine & Lab Deliveries";
    return false;
  });

  const isRestricted = TABS.find((t) => t.id === activeTab)?.restricted === true;

  return (
    <div className="bg-[#EFF2FF] rounded-2xl shadow-sm overflow-hidden">
      <div className="flex gap-1 border-b border-gray-200 px-5 pt-4 overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "whitespace-nowrap pb-3 px-3 text-[13px] font-medium transition border-b-2 -mb-px",
              activeTab === tab.id
                ? "border-[#822C89] text-[#822C89] font-semibold"
                : "border-transparent text-gray-500 hover:text-gray-700"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="relative p-5">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <h3 className="text-[15px] font-bold text-[#2C3979]">Course overview</h3>
            <span className="text-[13px] text-gray-400 font-normal">
              / {filteredCourses.length} Courses / Yunirides New Driver Training
            </span>
          </div>
        </div>

        {/* Dynamic Grid Mapping */}
        <div className={cn(
          "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-200",
          isRestricted && "blur-sm pointer-events-none select-none"
        )}>
          {loading ? (
            <div className="col-span-full py-10 text-center text-gray-400">Loading courses...</div>
          ) : filteredCourses.length > 0 ? (
            filteredCourses.map((item) => (
              <Link key={item.id} href={`/my-courses/${item.id}`} className="group block">
                <div className="rounded-2xl overflow-hidden shadow-sm bg-white border border-transparent hover:border-purple-200 p-1">
                  <div className="relative w-full aspect-video bg-gray-200 rounded-xl overflow-hidden">
                    <img
                      src={item.thumbnail || "/images/course1.png"}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      alt={item.title}
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-[11px] font-bold text-[#1a1a2e] line-clamp-2 leading-tight">
                      {item.title}
                    </p>
                    <p className="text-[10px] text-gray-400 mt-1 uppercase">{item.category}</p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full py-10 text-center text-gray-400 italic">
              No courses found. Ensure category names in DB match the tabs.
            </div>
          )}
        </div>

        {isRestricted && (
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-xl px-10 py-8 max-w-sm w-full text-center mx-4">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Access Required</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-6">
                This course is available by request only for <span className="text-[#822C89] font-semibold">{TABS.find(t => t.id === activeTab)?.label}</span>.
              </p>
              <button className="w-full bg-[#822C89] text-white font-semibold py-3 rounded-xl">
                Request team
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}