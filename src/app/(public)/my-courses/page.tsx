"use client";

import { useState } from "react";
import { Search, Grid, BarChart2, ChevronDown, Monitor } from "lucide-react"; 
import CourseCard from "@/components/my-courses/CourseCard";
import { courses } from "@/constants/dashboard";
import { cn } from "@/lib/utils";
import UserMenu from "@/components/UserMenu"; 

const TABS = [
  { id: "all", label: "All" },
  { id: "school-transportation", label: "Onboarding" },
  { id: "non-emergency", label: "Greeting"},
  { id: "medicine-lab", label: "Welcome" },
];

function AssessmentCard({ title, value, subtext }: { title: string; value: string; subtext: string }) {
  return (
    <div className="flex items-center gap-4 bg-[#EFF2FF] p-4 rounded-xl border border-white shadow-sm w-full">
      <div className="bg-white p-2.5 rounded-lg shadow-sm flex items-center justify-center">
        <Monitor size={20} className="text-[#822C89]" />
      </div>
      <div className="flex flex-col">
        <span className="text-[11px] text-gray-500 font-medium uppercase tracking-tight leading-none mb-1">
          {title}
        </span>
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-bold text-[#822C89] leading-none">
            {value}
          </span>
          <span className="text-[10px] text-gray-400 whitespace-nowrap">
            {subtext}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function MyCoursesPage() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="flex h-screen bg-white">
      <main className="flex-1 flex flex-col min-w-0">

        {/* TOP BAR */}
        <div className="w-full px-6 pt-6 pb-4">
          <div className="bg-[#EFF2FF] rounded-2xl px-6 py-4 flex items-center justify-between shadow-sm border border-[#e2e4f0]">
            <h1 className="text-lg font-semibold text-gray-700">My Courses</h1>
            <div className="flex items-center gap-3">
              <UserMenu />
            </div>
          </div>
        </div>

        {/* PAGE CONTENT */}
        <div className="px-8 pb-10 overflow-y-auto">

          {/* TABS */}
          <div className="flex gap-8 border-b border-gray-200 mb-6">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 text-[13px] font-medium transition-all relative ${
                  activeTab === tab.id
                    ? "text-[#1E1B4B] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#1E1B4B]"
                    : "text-gray-400 hover:text-purple-600"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* ASSESSMENTS */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-[#1E1B4B] mb-4">Assessments</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <AssessmentCard title="Over all score" value="80%" subtext="Avg all score" />
              <AssessmentCard title="Course completed" value="6" subtext="Out of 8" />
              <AssessmentCard title="Passed" value="3" subtext="1 need retry" />
              <AssessmentCard title="Pending course" value="3" subtext="1 need retry" />
            </div>
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

          {/* COURSE HEADER */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-[#1E1B4B] border-b-2 border-[#635BFF] pb-1">
                4 Courses
              </span>
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