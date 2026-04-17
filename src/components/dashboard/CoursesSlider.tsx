"use client";

import { courses } from "@/constants/dashboard";
import Link from "next/link"; // Ensure Link is imported

export default function CourseCard() {
  return (
    <div className="card">
      <h3 className="font-medium text-[#2C3979] mb-4">My courses</h3>

      <div className="flex items-center gap-2">
        {/* Left arrow */}
        <button className="w-7 h-7 flex-shrink-0 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M6.5 2L3.5 5L6.5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Course list */}
        <div className="flex gap-3 flex-1 overflow-hidden">
          {courses.map((course) => (
            /* 1. WRAP CARD IN LINK */
            <Link 
              key={course.id} 
              href={`/my-courses/${course.id}`}
              className="flex-1 min-w-[300px] group block"
            >
              <div className="bg-purple-50 rounded-xl flex gap-3 items-center p-3 h-full border border-transparent hover:border-purple-200 transition-all">
                
                {/* Thumbnail */}
                <div className="relative w-20 h-[72px] rounded-xl overflow-hidden flex-shrink-0 bg-purple-400">
                  <img
                    src={course.thumbnail}
                
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-sm">
                      <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
                        <path d="M1 1L9 6L1 11V1Z" fill="#7C3AED"/>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Info Section */}
                <div className="flex-1 min-w-0">
                  {/* 2. ADDED TITLE HERE */}
                  <p className="text-xs font-bold text-purple-900 mb-2 leading-snug line-clamp-2">
                   
                  </p>

                  <div className="flex gap-3 items-center flex-wrap">
                    <div>
                      <p className="text-[10px] text-purple-600 font-medium mb-1">Duration</p>
                      <span className="inline-flex items-center gap-1 bg-white border border-purple-200 rounded-full px-2.5 py-0.5 text-[11px] text-purple-800 font-medium">
                        🕐 {course.duration}
                      </span>
                    </div>

                    <div>
                      <p className="text-[10px] text-purple-600 font-medium mb-1">Program status</p>
                      <span
                        className={`inline-block rounded-full px-3 py-0.5 text-[11px] font-medium ${
                          course.status === "Active"
                            ? "bg-green-500 text-white"
                            : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        {course.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Right arrow */}
        <button className="w-7 h-7 flex-shrink-0 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M3.5 2L6.5 5L3.5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

// ... ICONS remain same below ...