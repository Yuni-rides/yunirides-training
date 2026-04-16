"use client";

import { useState } from "react";
import { courseModules } from "@/constants/dashboard"; //
import { LayoutGrid, ChevronDown } from "lucide-react";
import Link from "next/link"; // Required for navigation

export default function CourseOverview() {
  const [selectedFilter, setSelectedFilter] = useState("All courses");

  return (
    <div className="bg-[#EFF2FF] p-5 rounded-2xl shadow-sm">
      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <h3 className="text-[15px] font-bold text-[#2C3979]">
            Course overview
          </h3>
          <span className="text-[13px] text-gray-400 font-normal">
            / Yunirides New Driver Training
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 bg-[#2D1B69] text-white text-[12px] font-medium px-3 py-2 rounded-lg hover:bg-[#3d2a7a] transition">
            <span className="flex items-center justify-center w-5 h-5 bg-white/20 rounded-md">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <rect x="1" y="1" width="6" height="4" rx="1" fill="white"/>
                <rect x="9" y="1" width="6" height="4" rx="1" fill="white"/>
                <rect x="1" y="7" width="6" height="4" rx="1" fill="white" opacity="0.6"/>
                <rect x="9" y="7" width="6" height="4" rx="1" fill="white" opacity="0.6"/>
                <rect x="1" y="13" width="6" height="2" rx="1" fill="white" opacity="0.4"/>
                <rect x="9" y="13" width="6" height="2" rx="1" fill="white" opacity="0.4"/>
              </svg>
            </span>
            {selectedFilter}
            <ChevronDown size={14} />
          </button>

          <button className="flex items-center justify-center w-9 h-9 bg-[#EFF2FF] rounded-lg hover:bg-[#e0e5ff] transition">
            <LayoutGrid size={16} className="text-[#2D1B69]" />
          </button>
        </div>
      </div>

      {/* ── Course grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {courseModules.map((item) => (
          /* Link connects Dashboard directly to your [courseId] folder */
          <Link 
            key={item.id} 
            href={`/my-courses/${item.id}`} 
            className="group block"
          >
            <div className="rounded-4xl overflow-hidden shadow-sm hover:shadow-md transition bg-[#EFF2FF] cursor-pointer">
              {/* Thumbnail */}
             <div className="relative w-full aspect-[4/4] bg-purple-300 overflow-hidden">
                <img
                  src={item.thumbnail}
                 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
               
               
              </div>

            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}