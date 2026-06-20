"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { useCourseStore } from "@/features/courses/course.store";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { modules, fetchModules } = useCourseStore();

  const isMyCoursesActive = pathname.includes("/my-courses");

  const handleMyCoursesClick = async () => {
    let mods = modules;
    if (!mods.length) {
      await fetchModules();
      mods = useCourseStore.getState().modules;
    }
    if (mods.length > 0) {
      router.push(`/modules/${mods[0].id}/my-courses`);
    }
  };

  return (
    <div
      className={`h-screen sticky top-0 bg-[#EFF2FF] shadow-md flex flex-col transition-all duration-300 ${collapsed ? "w-20" : "w-64"}`}
    >
      <div className="flex items-center justify-between p-4">
        {!collapsed && <img src="/images/logo.png" className="h-10" />}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-purple-100"
        >
          ☰
        </button>
      </div>

      <nav className="flex flex-col gap-2 px-3 mt-6">
        <Link href="/dashboard">
          <NavItem
            label="Dashboard"
            collapsed={collapsed}
            active={pathname === "/dashboard"}
          >
            <DashboardIcon />
          </NavItem>
        </Link>

        <button onClick={handleMyCoursesClick} className="w-full text-left">
          <NavItem
            label="My Courses"
            collapsed={collapsed}
            active={isMyCoursesActive}
          >
            <CourseIcon />
          </NavItem>
        </button>

        <Link href="/certificates">
          <NavItem
            label="Certificates"
            collapsed={collapsed}
            active={pathname === "/certificates"}
          >
            <CertificateIcon />
          </NavItem>
        </Link>

        <Link href="/help">
          <NavItem
            label="Help"
            collapsed={collapsed}
            active={pathname === "/help"}
          >
            <SupportIcon />
          </NavItem>
        </Link>
      </nav>
    </div>
  );
}

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
      className={`flex items-center gap-3 px-3 py-3 rounded-lg cursor-pointer transition ${
        active ? "bg-[#822C89] text-white" : "text-[#822C89] hover:bg-gray-100"
      }`}
    >
      <div className="w-6 h-6 flex items-center justify-center">{children}</div>
      {!collapsed && (
        <span
          className={`text-sm font-medium ${active ? "text-white" : "text-black"}`}
        >
          {label}
        </span>
      )}
    </div>
  );
}

function DashboardIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"
        fill="currentColor"
      />
    </svg>
  );
}

function CourseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect
        x="3"
        y="4"
        width="18"
        height="12"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M8 20h8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M11 8l4 3-4 3V8z" fill="currentColor" />
    </svg>
  );
}

function SupportIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
      <path
        d="M6 20c1.5-3 4-5 6-5s4.5 2 6 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M4 10v3a2 2 0 0 0 2 2h1" stroke="currentColor" strokeWidth="2" />
      <path
        d="M20 10v3a2 2 0 0 1-2 2h-1"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

function CertificateIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect
        x="3"
        y="3"
        width="18"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M7 8h10M7 12h6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="17" cy="17" r="3" stroke="currentColor" strokeWidth="2" />
      <path
        d="M14.5 19.5L13 22l2-1 2 1-1.5-2.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
