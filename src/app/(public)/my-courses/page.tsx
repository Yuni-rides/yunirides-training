"use client";

import { useState } from "react";
import { Search, Grid, BarChart2, Bell, Calendar, ChevronDown } from "lucide-react";
// Assuming these exist in your project based on your snippet
import CourseCard from "@/components/my-courses/CourseCard";
import { courses } from "@/constants/dashboard";

const TABS = [
  "All",
  "School Transportation",
  "Non Emergency Transport",
  "Medicine & Lab Deliveries",
  "Certificates",
];

export default function MyCoursesPage() {
  const [activeTab, setActiveTab] = useState("School Transportation");

  return (
   <div className="flex h-screen bg-[white]">
      
      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* TOP BAR - FIGMA DASHBOARD STYLE */}
        <div className="w-full px-6 pt-6 pb-4">
          <div className="bg-[#EFF2FF] rounded-2xl px-6 py-4 flex items-center justify-between shadow-sm border border-[#e2e4f0]">
            {/* Title */}
            <h1 className="text-lg font-semibold text-gray-700">My Courses</h1>
             <div className="flex items-center gap-3 pl-4 border-gray-300/50">
                
                <div className="flex items-center gap-2 bg-[#EFF2FF] px-3 py-1 rounded-lg shadow-sm">
          <img
           src="/images/profileman.jpg"
            className="w-8 h-8 rounded-full"
          />
         
        </div>
             </div>
             </div>
        </div>

        {/* PAGE CONTENT BELOW TOP BAR */}
        <div className="px-8 pb-10">
          {/* TABS */}
          <div className="flex gap-8 border-b border-gray-200 mb-6">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-[13px] font-medium transition-all relative ${
                  activeTab === tab
                    ? "text-[#1E1B4B] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#1E1B4B]"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* FILTERS & SEARCH */}
          <div className="flex items-center gap-3 mb-8">
            <button className="flex items-center gap-2 bg-[#E8EAF6] px-4 py-2.5 rounded-xl text-[12px] font-medium text-[#4F3E9C]">
              <Grid size={14} />
              Categories
              <ChevronDown size={14} />
            </button>

            <button className="flex items-center gap-2 bg-[#E8EAF6] px-4 py-2.5 rounded-xl text-[12px] font-medium text-[#4F3E9C]">
              <BarChart2 size={14} />
              Progress
              <ChevronDown size={14} />
            </button>

            <div className="ml-auto flex items-center bg-[#E8EAF6] rounded-xl overflow-hidden w-64">
              <input
                placeholder="Search"
                className="bg-transparent px-4 py-2.5 text-[12px] outline-none flex-1 placeholder:text-gray-400"
              />
              <button className="bg-[#1E1B4B] text-white p-2.5 mx-1 my-1 rounded-lg">
                <Search size={14} />
              </button>
            </div>
          </div>

          {/* SUB-HEADER */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
               <span className="text-sm font-bold text-[#1E1B4B] border-b-2 border-[#635BFF] pb-1">8 Courses</span>
               <span className="text-sm text-gray-400">/ Yunirides New Driver Training</span>
            </div>

            <button className="flex items-center gap-2 text-[12px] px-4 py-2 border border-gray-200 rounded-xl bg-white text-gray-600 shadow-sm">
              Recently Accessed
              <ChevronDown size={14} />
            </button>
          </div>

          {/* COURSE GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...courses, ...courses].slice(0, 8).map((course, index) => (
              <CourseCard key={`${course.id}-${index}`} course={course} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}