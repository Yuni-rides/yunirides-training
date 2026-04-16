"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { courseModules, Lesson } from "@/constants/lessons";



function CheckIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function CourseDetailPage({
  params,
}: {
  params: { courseId: string };
}) {
  const router = useRouter();
  const module = courseModules.find((m) => m.id === params.courseId)
    ?? courseModules[0];

  const [activeLesson, setActiveLesson] = useState<string>(
    module.lessons[0]?.id ?? ""
  );

  return (
    <div className="flex flex-col h-full min-h-0">

      {/* Topbar */}
      <header className="bg-white border-b border-gray-100 px-5 py-2.5 flex items-center justify-between flex-shrink-0">
        <h1 className="text-[15px] font-semibold text-[#1e1b4b]">My courses</h1>
        <div className="flex items-center gap-2.5">
          {/* Calendar */}
          <div className="w-8 h-8 border border-gray-200 rounded-[9px] flex items-center justify-center cursor-pointer">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <rect x="1" y="2" width="13" height="11" rx="2" stroke="#6b7280" strokeWidth="1.2"/>
              <path d="M5 1v2M10 1v2M1 6h13" stroke="#6b7280" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          </div>
          {/* Bell */}
          <div className="w-8 h-8 border border-gray-200 rounded-[9px] flex items-center justify-center cursor-pointer">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M7.5 1.5a5 5 0 015 5c0 2.5-1 4-2.2 5H4.7C3.5 10.5 2.5 9 2.5 6.5a5 5 0 015-5z"
                stroke="#6b7280" strokeWidth="1.2"/>
              <path d="M6 12.5c0 .83.67 1.5 1.5 1.5S9 13.33 9 12.5"
                stroke="#6b7280" strokeWidth="1.2"/>
            </svg>
          </div>
          {/* User */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-[11px] font-semibold">
              JC
            </div>
            <div>
              <p className="text-[11px] font-semibold text-[#1e1b4b]">James Clark</p>
              <p className="text-[10px] text-gray-400">jamesc23@gmail.com</p>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 px-5 py-3 bg-[#f0f0f8] flex-shrink-0">
        <button
          onClick={() => router.back()}
          className="w-7 h-7 rounded-full border border-gray-200 bg-white flex items-center justify-center"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M6.5 2L3.5 5L6.5 8" stroke="#374151" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <span className="text-[13px] font-medium text-[#1e1b4b]">{module.title}</span>
      </div>

      {/* Body */}
      <div className="flex gap-3 px-4 pb-4 flex-1 min-h-0 overflow-hidden">

        {/* Left: video + description */}
        <div className="flex flex-col gap-3 flex-1 min-w-0 overflow-y-auto">

          {/* Video player */}
          <div className="bg-[#1a1535] rounded-xl overflow-hidden flex-shrink-0">
            {/* Thumbnail area */}
            <div className="relative w-full aspect-video bg-[#1a1535] flex items-center justify-center">
              {/* Replace with actual video/thumbnail */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#2a1a4a] to-[#1a3060]" />

              {/* Prev arrow */}
              <button className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M7.5 2L4.5 6L7.5 10" stroke="white" strokeWidth="1.8"
                    strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {/* Play button */}
              <div className="relative z-10 w-14 h-14 rounded-full bg-white/90 flex items-center justify-center cursor-pointer hover:bg-white transition-colors">
                <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
                  <path d="M2 2L16 10L2 18V2Z" fill="#2d2d7a"/>
                </svg>
              </div>

              {/* Next arrow */}
              <button className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M4.5 2L7.5 6L4.5 10" stroke="white" strokeWidth="1.8"
                    strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {/* Controls bar */}
            <div className="flex items-center gap-2.5 px-3 py-2 bg-[#1a1535]">
              {/* Play */}
              <button className="text-white/75 hover:text-white">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 2l10 5-10 5V2z" fill="currentColor"/>
                </svg>
              </button>
              {/* Rewind */}
              <button className="text-white/75 hover:text-white">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 3a5 5 0 100 10M7 3L5 1M7 3L9 1"
                    stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"
                    strokeLinejoin="round" fill="none"/>
                </svg>
              </button>
              {/* Speed */}
              <button className="bg-white/15 text-white text-[10px] font-medium rounded px-1.5 py-0.5">
                1x
              </button>
              {/* Forward */}
              <button className="text-white/75 hover:text-white">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 3a5 5 0 110 10M7 3L9 1M7 3L5 1"
                    stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"
                    strokeLinejoin="round" fill="none"/>
                </svg>
              </button>
              {/* Progress bar */}
              <div className="flex-1 h-1 bg-white/15 rounded-full relative cursor-pointer">
                <div className="w-[35%] h-full bg-purple-500 rounded-full" />
                <div className="absolute top-1/2 left-[35%] -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white" />
              </div>
              {/* Volume */}
              <button className="text-white/75 hover:text-white">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 5H5L9 2v10L5 9H2V5z" stroke="currentColor" strokeWidth="1.2"
                    fill="none" strokeLinejoin="round"/>
                  <path d="M11 4a4 4 0 010 6" stroke="currentColor" strokeWidth="1.2"
                    strokeLinecap="round" fill="none"/>
                </svg>
              </button>
              {/* Settings */}
              <button className="text-white/75 hover:text-white">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2"/>
                  <circle cx="7" cy="7" r="2" fill="currentColor"/>
                </svg>
              </button>
              {/* Fullscreen */}
              <button className="text-white/75 hover:text-white">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 5V1h4M9 1h4v4M13 9v4H9M5 13H1V9"
                    stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"
                    strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Description card */}
          <div className="bg-white rounded-xl border-[1.5px] border-blue-400 p-4 flex-shrink-0">
            <h3 className="text-[13px] font-semibold text-blue-800 mb-2">
              Course 1 welcome to Yunirides
            </h3>
            <div className="text-[11px] text-gray-600 leading-relaxed space-y-2">
              <p>Welcome to the Yuni Rides Driver Training Program.</p>
              <p>
                This course introduces you to our mission, safety standards, and the
                responsibility that comes with transporting children and youth in our communities.
              </p>
              <p>
                At Yuni Rides, every driver plays a vital role in ensuring that students arrive
                safely, comfortably, and on time. Our service goes beyond transportation — we
                provide care, trust, and reliability for families, schools, and the{" "}
                <strong className="text-gray-800">children we serve.</strong>
              </p>
              <p>
                This Course will help you understand the expectations, responsibilities, and
                professional standards required to become a trusted Yuni Rides driver.
              </p>
            </div>
            <p className="text-[12px] font-semibold text-blue-700 mt-3">
              In this course you will learn
            </p>
          </div>
        </div>

        {/* Right: Lesson list */}
        <div className="w-[200px] flex-shrink-0 bg-white rounded-xl flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            {module.lessons.map((lesson: Lesson) => (
              <div
                key={lesson.id}
                onClick={() => setActiveLesson(lesson.id)}
                className={`flex items-start gap-2 px-3 py-2.5 cursor-pointer border-b border-gray-50 transition-colors ${
                  activeLesson === lesson.id ? "bg-purple-50" : "hover:bg-gray-50"
                }`}
              >
                {/* Checkbox */}
                <div className={`w-4 h-4 rounded-[4px] flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                  lesson.completed
                    ? "bg-[#2d2d7a] border-[#2d2d7a]"
                    : "border-[1.5px] border-gray-300"
                }`}>
                  {lesson.completed && <CheckIcon />}
                </div>
                {/* Number */}
                <span className="text-[10px] text-gray-400 font-semibold flex-shrink-0 pt-0.5">
                  {lesson.num}
                </span>
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className={`text-[11px] font-medium leading-snug mb-1 ${
                    activeLesson === lesson.id ? "text-[#2d2d7a]" : "text-[#1e1b4b]"
                  }`}>
                    {lesson.title}
                  </p>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500 flex-shrink-0" />
                    <span className="text-[10px] text-gray-400">{lesson.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Get certificate */}
          <div className="px-3 py-3 border-t border-gray-100 flex items-center gap-2 cursor-pointer hover:bg-gray-50">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="6" r="4" stroke="#7c3aed" strokeWidth="1.3"/>
              <path d="M4 11c0 2 8 2 8 0" stroke="#7c3aed" strokeWidth="1.3" strokeLinecap="round"/>
              <path d="M6 14l2-2 2 2" stroke="#7c3aed" strokeWidth="1.3"
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-[11px] font-medium text-[#1e1b4b]">Get certificate</span>
          </div>
        </div>
      </div>
    </div>
  );
}