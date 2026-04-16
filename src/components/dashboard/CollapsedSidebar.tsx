"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="1" y="1" width="6.5" height="6.5" rx="1.5" fill="currentColor" opacity="0.7"/>
        <rect x="10.5" y="1" width="6.5" height="6.5" rx="1.5" fill="currentColor" opacity="0.7"/>
        <rect x="1" y="10.5" width="6.5" height="6.5" rx="1.5" fill="currentColor" opacity="0.7"/>
        <rect x="10.5" y="10.5" width="6.5" height="6.5" rx="1.5" fill="currentColor" opacity="0.7"/>
      </svg>
    ),
  },
  {
    label: "My Courses",
    href: "/dashboard/my-courses",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="1" y="2" width="16" height="2.5" rx="1.25" fill="currentColor"/>
        <rect x="1" y="7.5" width="16" height="2.5" rx="1.25" fill="currentColor"/>
        <rect x="1" y="13" width="10" height="2.5" rx="1.25" fill="currentColor"/>
      </svg>
    ),
  },
  {
    label: "Help",
    href: "/dashboard/help",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M7 7c0-1.1.9-2 2-2s2 .9 2 2c0 .9-.5 1.5-1.2 1.9C9.3 9.2 9 9.6 9 10v.5"
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="9" cy="12.5" r="0.75" fill="currentColor"/>
      </svg>
    ),
  },
];

export default function CollapsedSidebar() {
  const [expanded, setExpanded] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      className={`flex-shrink-0 bg-white border-r border-gray-100 flex flex-col items-center py-4 transition-all duration-200 ${
        expanded ? "w-[180px] items-start px-3" : "w-14 items-center px-0"
      }`}
    >
      {/* Logo */}
      <div className={`mb-4 ${expanded ? "px-2" : ""}`}>
        <div className="w-9 h-9 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="white">
            <path d="M10 3a7 7 0 100 14A7 7 0 0010 3zm0 2.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm0 10c-1.75 0-3.29-.9-4.2-2.26.02-.74.84-1.24 2.2-1.24h4c1.36 0 2.18.5 2.2 1.24C13.29 14.6 11.75 15.5 10 15.5z"/>
          </svg>
        </div>
      </div>

      {/* Nav items */}
      {navItems.map((item) => {
        const isActive = pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            title={item.label}
            className={`flex items-center gap-2.5 rounded-xl transition-colors mb-1
              ${expanded ? "w-full px-2.5 py-2.5" : "w-10 h-10 justify-center"}
              ${isActive ? "bg-[#2d2d7a] text-white" : "text-gray-400 hover:bg-gray-50"}`}
          >
            {item.icon}
            {expanded && (
              <span className="text-[12px] font-medium whitespace-nowrap">{item.label}</span>
            )}
          </Link>
        );
      })}

      {/* Expand toggle — pushed to bottom */}
      <button
        onClick={() => setExpanded(!expanded)}
        className={`mt-auto flex items-center rounded-xl text-gray-400 hover:bg-gray-50 transition-colors
          ${expanded ? "w-full px-2.5 py-2.5 gap-2" : "w-10 h-10 justify-center"}`}
      >
        <svg
          width="16" height="16" viewBox="0 0 16 16" fill="none"
          className={`transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
        >
          <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        {expanded && <span className="text-[12px] font-medium">Collapse</span>}
      </button>
    </aside>
  );
}