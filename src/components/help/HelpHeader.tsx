// components/help/HelpHeader.tsx
"use client";

import UserMenu from "@/components/UserMenu"; // Ensure path is correct

export default function HelpHeader() {
  return (
    <div className="w-full px-8 pt-6 pb-4">
      <div className="bg-[#EFF2FF] rounded-xl px-6 py-4 flex itemscenter justify-between shadow-sm border border-[#EFF2FF]">
        {/* Left Side: Title */}
         <h1 className="text-xl font-semibold text-[#1E1B4B]">Help & Support</h1>
         {/* Profile */}
        <div className="flex items-center gap-2 bg-[#EFF2FF] px-3 py-1 rounded-lg">
         {/* Right */}
             <div className="flex items-center gap-3">
               {/* Profile Dropdown replaced the static image */}
               <UserMenu />
             </div> 
          </div>
        </div>
      </div>
  
  );
}