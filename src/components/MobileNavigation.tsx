"use client";
import { useState } from "react";
import Link from "next/link";

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden">
      {/* 1. Top Bar for Mobile only */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-white border-b px-4 flex items-center justify-between z-[100]">
        <img src="/images/logo.png" className="h-8" alt="Logo" />
        <button onClick={() => setIsOpen(true)} className="text-2xl text-[#822C89]">☰</button>
      </div>

      {/* 2. Slide-over Menu */}
      <div className={`fixed inset-0 bg-black/50 z-[110] transition-opacity ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`} 
           onClick={() => setIsOpen(false)} />
      
      <div className={`fixed top-0 left-0 bottom-0 w-72 bg-[#EFF2FF] z-[120] transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-6">
          <button onClick={() => setIsOpen(false)} className="mb-8 text-2xl">✕</button>
          <nav className="flex flex-col gap-4">
             <Link href="/dashboard" className="text-lg font-medium">Dashboard</Link>
             <Link href="/my-courses" className="text-lg font-medium">My Courses</Link>
             <Link href="/help" className="text-lg font-medium">Help</Link>
          </nav>
        </div>
      </div>
      
      {/* 3. Spacer to push content down so header doesn't cover it */}
      <div className="h-16" />
    </div>
  );
}