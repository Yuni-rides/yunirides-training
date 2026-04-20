"use client";

import { useState, useRef, useEffect } from "react";
import { useLogout } from "@/hooks/useLogout";
import { LogOut } from "lucide-react";

const PROFILE_IMAGE_PATH = "/images/profileman.jpg";

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { handleLogout } = useLogout();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* 1. The Trigger Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center focus:outline-none hover:opacity-80 transition-opacity"
      >
        <img
          src={PROFILE_IMAGE_PATH}
          className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
          alt="Driver Profile"
        />
      </button>

      {/* 2. The Simplified Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-[999]">
        
          {/* Section: Logout Action Only */}
          <div className="p-2">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg font-semibold transition-colors"
            >
              <LogOut size={16} />
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}