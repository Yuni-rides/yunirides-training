"use client";

import { useState, useRef, useEffect } from "react";
import { useAuthStore } from "@/features/auth/auth.store";
import { LogOut, User } from "lucide-react";

const S3 = process.env.NEXT_PUBLIC_S3_BUCKET_URL;

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { user,logout } = useAuthStore();
  const menuRef = useRef<HTMLDivElement>(null);

  const profileImageUrl = user?.profileImg
    ? user.profileImg.startsWith("http")
      ? user.profileImg
      : `${S3}/${user.profileImg}`
    : null;

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
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center focus:outline-none hover:opacity-80 transition-opacity"
      >
        {profileImageUrl ? (
          <img
            src={profileImageUrl}
            className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover"
            alt="Driver Profile"
          />
        ) : (
          <div className="w-10 h-10 rounded-full border-2 border-white shadow-sm bg-[#EFF2FF] flex items-center justify-center">
            <User size={20} className="text-[#822C89]" />
          </div>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-[999]">
          {user && (
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-sm font-bold text-[#1E1B4B] truncate">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-xs text-gray-400 truncate">{user.email}</p>
            </div>
          )}
          <div className="p-2">
            <button
              onClick={() => logout()}
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