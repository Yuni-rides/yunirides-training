"use client";

import { useState } from "react";
import { Search, Grid, BarChart2, ChevronDown, Download } from "lucide-react";
import CourseCard from "@/components/my-courses/CourseCard";
import { courses } from "@/constants/dashboard";
import { cn } from "@/lib/utils";
import UserMenu from "@/components/UserMenu"; 

const TABS = [
  { id: "all", label: "All" },
  { id: "school-transportation", label: "School Transportation" },
  { id: "non-emergency", label: "Non Emergency Transport", restricted: true },
  { id: "medicine-lab", label: "Medicine & Lab Deliveries" },
  { id: "certificates", label: "Certificates" },
];

// Certificate mock data
const certificates = [
  { id: 1, title: "School transportation safety.", date: "April 22, 2026", status: "Completed" },
  { id: 2, title: "School transportation safety.", date: "April 22, 2026", status: "Completed" },
  { id: 3, title: "School transportation safety.", date: "April 22, 2026", status: "Completed" },
  { id: 4, title: "School transportation safety.", date: "April 22, 2026", status: "Completed" },
  { id: 5, title: "School transportation safety.", date: "April 22, 2026", status: "Completed" },
  { id: 6, title: "School transportation safety.", date: "April 22, 2026", status: "Completed" },
  { id: 7, title: "School transportation safety.", date: "April 22, 2026", status: "Completed" },
  { id: 8, title: "School transportation safety.", date: "April 22, 2026", status: "Completed" },
];

// ── Certificate Card Component ──
function CertificateCard({ title, date }: { title: string; date: string }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all">
      <div className="flex items-center justify-between px-3 pt-3 pb-2">
        <span className="bg-[#22C55E] text-white text-[10px] font-bold px-3 py-1 rounded-full">
          Completed
        </span>
        <button
          onClick={() => alert("Downloading certificate...")}
          className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-[#EFF2FF] transition"
        >
          <Download size={13} className="text-gray-500" />
        </button>
      </div>

      <div className="flex flex-col items-center justify-center px-4 py-5 bg-[#FAFBFF] mx-3 mb-3 rounded-xl border border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <img
            src="/images/logo.png"
            alt="Yuni Rides"
            className="h-10 object-contain"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>
        <div className="w-full border-t border-dashed border-gray-200 mb-4" />
        <p className="text-[12px] font-semibold text-[#1E1B4B] text-center leading-snug mb-2">
          {title}
        </p>
        <p className="text-[11px] text-gray-400">{date}</p>
      </div>
    </div>
  );
}

export default function MyCoursesPage() {
  const [activeTab, setActiveTab] = useState("school-transportation");

  const isRestricted = TABS.find((t) => t.id === activeTab)?.restricted === true;
  const isCertificates = activeTab === "certificates";
  const activeTabLabel = TABS.find((t) => t.id === activeTab)?.label ?? "";

  return (
    <div className="flex h-screen bg-[white]">

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0">

        {/* TOP BAR — Adjusted for Logout Dropdown */}
        <div className="w-full px-6 pt-6 pb-4">
          <div className="bg-[#EFF2FF] rounded-2xl px-6 py-4 flex items-center justify-between shadow-sm border border-[#e2e4f0]">
            <h1 className="text-lg font-semibold text-gray-700">My Courses</h1>
            
            <div className="flex items-center gap-3">
              {/* Profile image with Dropdown logic */}
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

          {/* ── CERTIFICATES VIEW ── */}
          {isCertificates ? (
            <div>
              <div className="flex items-center justify-between mb-6">
                <p className="text-[13px] text-gray-500">
                  View and download all your completed certificates.
                </p>
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 text-[12px] px-4 py-2 border border-gray-200 rounded-xl bg-white text-gray-600 shadow-sm hover:bg-[#EFF2FF] transition">
                    🎖 ALL Certificates
                    <ChevronDown size={14} />
                  </button>
                  <button className="flex items-center gap-2 bg-[#822C89] hover:bg-[#6e2474] text-white text-[12px] font-semibold px-5 py-2.5 rounded-xl transition">
                    Download All
                    <Download size={14} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {certificates.map((cert) => (
                  <CertificateCard
                    key={cert.id}
                    title={cert.title}
                    date={cert.date}
                  />
                ))}
              </div>
            </div>
          ) : (
            /* ── NORMAL COURSES VIEW ── */
            <>
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

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-[#1E1B4B] border-b-2 border-[#635BFF] pb-1">
                    8 Courses
                  </span>
                  <span className="text-sm text-gray-400">/ Yunirides New Driver Training</span>
                </div>
                <button className="flex items-center gap-2 text-[12px] px-4 py-2 border border-gray-200 rounded-xl bg-white text-gray-600 shadow-sm">
                  Recently Accessed
                  <ChevronDown size={14} />
                </button>
              </div>

              <div className="relative">
                <div
                  className={cn(
                    "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",
                    isRestricted && "blur-sm pointer-events-none select-none"
                  )}
                >
                  {[...courses, ...courses].slice(0, 8).map((course, index) => (
                    <CourseCard key={`${course.id}-${index}`} course={course} />
                  ))}
                </div>

                {isRestricted && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center">
                    <div className="bg-white rounded-2xl shadow-xl px-10 py-8 max-w-sm w-full text-center">
                      <h3 className="text-lg font-bold text-gray-900 mb-3">
                        Access Required
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed mb-6">
                        This course is available by request only. To access the{" "}
                        <span className="text-[#822C89] font-semibold">
                          {activeTabLabel}
                        </span>
                        , please submit a request and our team will review your
                        eligibility.
                      </p>
                      <button
                        onClick={() => alert("Request submitted!")}
                        className="w-full bg-[#822C89] hover:bg-[#6e2474] text-white font-semibold py-3 rounded-xl transition"
                      >
                        Request team
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

        </div>
      </main>
    </div>
  );
}