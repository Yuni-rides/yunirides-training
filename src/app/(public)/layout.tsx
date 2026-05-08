
"use client";

import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import { Menu, X } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex bg-[#f0f0f8] min-h-screen">
      {/* Mobile Overlay Background */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Wrapper */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 transform bg-white transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        {/* Optional: Close button inside sidebar for mobile */}
        <div className="lg:hidden absolute right-4 top-4">
          <button onClick={() => setIsSidebarOpen(false)}>
             <X size={24} className="text-gray-500" />
          </button>
        </div>
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Mobile Navbar Trigger */}
        <header className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 text-[#1E1B4B] hover:bg-gray-100 rounded-lg"
          >
            <Menu size={24} />
          </button>
          <span className="font-bold text-sm text-[#1E1B4B]">Yunirides Training</span>
          <div className="w-10" /> {/* Spacer for centering title */}
        </header>

        {/* Global Page Content Container */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}