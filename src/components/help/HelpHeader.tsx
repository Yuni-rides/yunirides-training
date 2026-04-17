// components/help/HelpHeader.tsx
"use client";

export default function HelpHeader() {
  return (
    <div className="w-full px-8 pt-6 pb-4">
      <div className="bg-[#EFF2FF] rounded-2xl px-6 py-4 flex items-center justify-between shadow-sm border border-[#EFF2FF]">
        {/* Left Side: Title */}
         <h1 className="text-xl font-semibold text-[#1E1B4B]">Help & Support</h1>
         {/* Profile */}
        <div className="flex items-center gap-2 bg-[#EFF2FF] px-3 py-1 rounded-lg shadow-sm">
          <img
           src="/images/profileman.jpg"
            className="w-8 h-8 rounded-full"
          />
          </div>
        </div>
      </div>
  
  );
}