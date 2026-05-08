"use client";
import UserMenu from "@/components/UserMenu"; // Ensure path is correct
export default function Header() {
  return (
    <div className="w-full bg-[#EFF2FF] rounded-xl px-6 py-4 flex items-center justify-between">
      
      {/* Left */}
      <h1 className="text-lg font-semibold text-gray-700">
        My Dashboard
      </h1>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* Profile Dropdown replaced the static image */}
        <UserMenu />
      </div>
       
    </div>
  );
}