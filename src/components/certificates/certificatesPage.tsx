"use client";

import { useState } from "react";
import { Search, ChevronDown, Download } from "lucide-react";

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
      {/* Completed badge + download */}
      <div className="flex items-center justify-between px-3 pt-3 pb-1">
        <span className="bg-[#22C55E] text-white text-[10px] font-bold px-3 py-1 rounded-full">
          Completed
        </span>
        <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-[#EFF2FF] transition">
          <Download size={13} className="text-gray-400" />
        </button>
      </div>

      {/* Logo + title + date */}
      <div className="flex flex-col items-center justify-center px-4 py-5 mx-3 mb-3 rounded-xl bg-[#FAFBFF] border border-gray-100">
        <img
          src="/images/logo.png"
          alt="Yuni Rides"
          className="h-10 object-contain mb-4"
        />
        <div className="w-full border-t border-dashed border-gray-200 mb-3" />
        <p className="text-[12px] font-semibold text-[#1E1B4B] text-center leading-snug mb-1">
          {title}
        </p>
        <p className="text-[11px] text-gray-400">{date}</p>
      </div>
    </div>
  );
}

// ── Main Page Component (Exported for Next.js) ──
export default function CertificatesPage() {
  const [search, setSearch] = useState("");
  const [moduleFilter] = useState("ALL Certificates");

  const filtered = certificates.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col min-w-0">
      {/* CONTENT */}
      <div className="px-8 pb-10 overflow-y-auto flex-1">
        
        {/* Filters row */}
        <div className="flex items-center gap-3 mb-8 flex-wrap pt-6">
          <p className="text-[13px] text-gray-500">
            View and download all your completed certificates.
          </p>

          <div className="ml-auto flex items-center gap-3">
            {/* Module filter */}
            <button className="flex items-center gap-2 text-[12px] px-4 py-2 border border-gray-200 rounded-xl bg-white text-gray-600 shadow-sm hover:bg-[#EFF2FF] transition">
              🎖 {moduleFilter}
              <ChevronDown size={13} />
            </button>

            {/* Search */}
            <div className="flex items-center bg-[#EFF2FF] border border-[#e2e4f0] rounded-xl overflow-hidden w-48">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
                className="bg-transparent px-4 py-2 text-[12px] outline-none flex-1 placeholder:text-gray-400"
              />
              <button className="bg-[#1E1B4B] text-white p-2 mx-1 my-1 rounded-lg">
                <Search size={13} />
              </button>
            </div>

            {/* Download All */}
            <button className="flex items-center gap-2 bg-[#822C89] hover:bg-[#6e2474] text-white text-[12px] font-semibold px-5 py-2.5 rounded-xl transition">
              Download All
              <Download size={14} />
            </button>
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((cert) => (
            <CertificateCard
              key={cert.id}
              title={cert.title}
              date={cert.date}
            />
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-400 text-sm">
            No certificates found.
          </div>
        )}
      </div>
    </div>
  );
}