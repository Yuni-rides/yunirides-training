"use client";

import { useState } from "react";
import { courseModules } from "@/constants/dashboard";
import { LayoutGrid, ChevronDown } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// ── Tab config — add restricted: true to any locked tab ──
const TABS = [
  { id: "all", label: "All" },
  { id: "school-transportation", label: "School Transportation" },
  { id: "non-emergency", label: "Non-Emergency Transport", restricted: true },
  { id: "medicine-lab", label: "Medicine & Lab Deliveries" },
  { id: "certificates", label: "Certificates" },
];

export default function CourseOverview() {
  const [selectedFilter, setSelectedFilter] = useState("All courses");
  const [activeTab, setActiveTab] = useState("all");

  const isRestricted = TABS.find((t) => t.id === activeTab)?.restricted === true;
  const activeTabLabel = TABS.find((t) => t.id === activeTab)?.label ?? "";

  return (
    <div className="bg-[#EFF2FF] rounded-2xl shadow-sm overflow-hidden">

      {/* ── Tab Navigation ── */}
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

      {/* ── Body (header + grid) wrapped for blur + modal ── */}
      <div className="relative p-5">

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
                  <rect x="1" y="1" width="6" height="4" rx="1" fill="white" />
                  <rect x="9" y="1" width="6" height="4" rx="1" fill="white" />
                  <rect x="1" y="7" width="6" height="4" rx="1" fill="white" opacity="0.6" />
                  <rect x="9" y="7" width="6" height="4" rx="1" fill="white" opacity="0.6" />
                  <rect x="1" y="13" width="6" height="2" rx="1" fill="white" opacity="0.4" />
                  <rect x="9" y="13" width="6" height="2" rx="1" fill="white" opacity="0.4" />
                </svg>
              </span>
              {selectedFilter}
              <ChevronDown size={14} />
            </button>

            <button className="flex items-center justify-center w-9 h-9 bg-white rounded-lg hover:bg-[#e0e5ff] transition shadow-sm">
              <LayoutGrid size={16} className="text-[#2D1B69]" />
            </button>
          </div>
        </div>

        {/* ── Course Grid — blurred when restricted ── */}
        <div
          className={cn(
            "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-200",
            isRestricted && "blur-sm pointer-events-none select-none"
          )}
        >
          {courseModules.map((item) => (
            <Link
              key={item.id}
              href={`/my-courses/${item.id}`}
              className="group block"
            >
              <div className="rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all bg-white border border-transparent hover:border-purple-200 p-1">
                <div className="relative w-full object-cover bg-gray-200 overflow-hidden rounded-xl">
                  <img
                    src={item.thumbnail}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-3">
                  <p className="text-[11px] font-bold text-[#1a1a2e] line-clamp-2 leading-tight">
                  
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* ── Access Required Modal — only on restricted tabs ── */}
        {isRestricted && (
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-xl px-10 py-8 max-w-sm w-full text-center mx-4">
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
                onClick={() => {
                  // TODO: replace with real API call when backend ready
                  // await apiClient.post("/api/courses/request-access", {
                  //   courseType: activeTab,
                  //   userId: user?.id
                  // });
                  alert("Request submitted!");
                }}
                className="w-full bg-[#822C89] hover:bg-[#6e2474] text-white font-semibold py-3 rounded-xl transition"
              >
                Request team
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}