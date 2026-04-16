// app/my-courses/page.tsx  (or your route file)
"use client";

import { useState } from "react";
import CourseCard from "@/components/my-courses/CourseCard";
import { courses } from "@/constants/dashboard";


const TABS = [
  "All",
  "School Transportation",
  "Non-Emergency Transport",
  "Medicine & Lab Deliveries",
  "Certificates",
];

export default function MyCourses() {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <div className="flex bg-[#f0f0f8] min-h-screen">

      {/* Main */}
      <div className="flex flex-col flex-1 min-w-0">

        {/* Top Header */}
        <header className="bg-white border-b border-gray-100 px-5 py-3.5 flex items-center justify-between">
          <h1 className="text-[16px] font-semibold text-[#1e1b4b]">
            My courses
          </h1>

          <div className="flex items-center gap-3">
            <input
              placeholder="Search"
              className="border border-gray-200 rounded-xl px-3 py-1.5 text-[12px] w-44 outline-none"
            />

            <div className="w-[34px] h-[34px] rounded-full bg-purple-600 flex items-center justify-center text-white text-[11px]">
              JC
            </div>
          </div>
        </header>

        <div className="p-5">

          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-4 overflow-x-auto">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-[12px] whitespace-nowrap border-b-2 transition ${
                  activeTab === tab
                    ? "text-[#2d2d7a] border-[#2d2d7a] font-semibold"
                    : "text-gray-400 border-transparent"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 mb-5">

  {/* Categories */}
  <button className="flex items-center gap-2 bg-[#eef0fb] px-4 py-2 rounded-xl text-[12px] text-gray-700">
    <span>⬛</span>
    Categories
    <span>⌄</span>
  </button>

  {/* Progress */}
  <button className="flex items-center gap-2 bg-[#eef0fb] px-4 py-2 rounded-xl text-[12px] text-gray-700">
    <span>📊</span>
    Progress
    <span>⌄</span>
  </button>

  {/* Search */}
  <div className="ml-auto flex items-center bg-[#eef0fb] rounded-xl overflow-hidden">
    <input
      placeholder="Search"
      className="bg-transparent px-4 py-2 text-[12px] outline-none w-48"
    />
    <button className="bg-[#2d2d7a] text-white px-3 py-2">
      🔍
    </button>
  </div>
</div>

          {/* Title Row */}
          <div className="flex items-center justify-between mb-4">
            <div className="text-[13px] font-semibold text-[#1e1b4b]">
              8 Courses / Yunirides New Driver Training
            </div>

            <button className="text-[11px] px-3 py-1.5 border rounded-lg bg-white">
              Recently Accessed
            </button>
          </div>

        
          <div className="grid grid-cols-4 gap-5">
  {[...courses, ...courses].slice(0, 8).map((course) => (
    <CourseCard key={course.id + Math.random()} course={course} />
  ))}
</div>
        </div>
      </div>
    </div>
  );
}