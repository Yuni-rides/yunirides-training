"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCourseStore } from "@/features/courses/course.store";

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
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
      setIsOpen(false);
    }
  };

  return (
    <div className="lg:hidden">
      <div className="fixed top-0 left-0 right-0 h-16 bg-white border-b px-4 flex items-center justify-between z-[100]">
        <img src="/images/logo.png" className="h-8" alt="Logo" />
        <button
          onClick={() => setIsOpen(true)}
          className="text-2xl text-[#822C89]"
        >
          ☰
        </button>
      </div>

      <div
        className={`fixed inset-0 bg-black/50 z-[110] transition-opacity ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsOpen(false)}
      />

      <div
        className={`fixed top-0 left-0 bottom-0 w-72 bg-[#EFF2FF] z-[120] transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-6">
          <button
            onClick={() => setIsOpen(false)}
            className="mb-8 text-2xl text-gray-900"
          >
            ✕
          </button>
          <nav className="flex flex-col gap-4">
            <Link
              href="/dashboard"
              className={`text-lg font-medium ${pathname === "/dashboard" ? "text-[#822C89]" : "text-gray-900"}`}
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>

            <button
              onClick={handleMyCoursesClick}
              className={`text-lg font-medium text-left ${isMyCoursesActive ? "text-[#822C89]" : "text-gray-900"}`}
            >
              My Courses
            </button>

            <Link
              href="/certificates"
              className={`text-lg font-medium ${pathname === "/certificates" ? "text-[#822C89]" : "text-gray-900"}`}
              onClick={() => setIsOpen(false)}
            >
              Certificates
            </Link>

            <Link
              href="/help"
              className={`text-lg font-medium ${pathname === "/help" ? "text-[#822C89]" : "text-gray-900"}`}
              onClick={() => setIsOpen(false)}
            >
              Help
            </Link>
          </nav>
        </div>
      </div>

      <div className="h-16" />
    </div>
  );
}
