"use client";

import { useState } from "react";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={`h-screen bg-[#EFF2FF] shadow-md flex flex-col transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Top */}
      <div className="flex items-center justify-between p-4">
        {!collapsed && (
          <img src="/images/logo.png" className="h-10" />
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          ☰
        </button>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-2 px-3 mt-6">

        {/* Dashboard */}
        <NavItem
          label="Dashboard"
          collapsed={collapsed}
          active
        >
          <DashboardIcon />
        </NavItem>

        {/* Courses (PC + Play icon) */}
        <NavItem
          label="My Courses"
          collapsed={collapsed}
        >
          <CourseIcon />
        </NavItem>

        {/* Help (Support Agent icon) */}
        <NavItem
          label="Help"
          collapsed={collapsed}
        >
          <SupportIcon />
        </NavItem>

      </nav>
    </div>
  );
}

/* =========================
   NAV ITEM
========================= */
function NavItem({
  label,
  collapsed,
  active = false,
  children,
}: {
  label: string;
  collapsed: boolean;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`flex items-center gap-3 px-3 py-3 rounded-lg cursor-pointer transition
      ${
        active
          ? "bg-[#822C89] text-white"
          : "text-black hover:bg-gray-100"
      }`}
    >
      {/* ICON */}
      <div className="w-6 h-6 flex items-center justify-center">
        {children}
      </div>

      {/* LABEL */}
      {!collapsed && (
        <span className="text-sm font-medium">{label}</span>
      )}
    </div>
  );
}

/* =========================
   FIGMA STYLE ICONS (SVG)
========================= */

function DashboardIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"
        fill="#822C89"
      />
    </svg>
  );
}

/* PC Screen + Play (COURSES ICON) */
function CourseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      {/* Screen */}
      <rect
        x="3"
        y="4"
        width="18"
        height="12"
        rx="2"
        stroke="#822C89"
        strokeWidth="2"
      />

      {/* Stand */}
      <path
        d="M8 20h8"
        stroke="#822C89"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Play Button */}
      <path
        d="M11 8l4 3-4 3V8z"
        fill="#822C89"
      />
    </svg>
  );
}

/* CUSTOMER SERVICE AGENT (HELP ICON) */
function SupportIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      {/* Head */}
      <circle
        cx="12"
        cy="8"
        r="4"
        stroke="#822C89"
        strokeWidth="2"
      />

      {/* Body */}
      <path
        d="M6 20c1.5-3 4-5 6-5s4.5 2 6 5"
        stroke="#822C89"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Headset */}
      <path
        d="M4 10v3a2 2 0 0 0 2 2h1"
        stroke="#822C89"
        strokeWidth="2"
      />
      <path
        d="M20 10v3a2 2 0 0 1-2 2h-1"
        stroke="#822C89"
        strokeWidth="2"
      />
    </svg>
  );
}