// components/dashboard/MyCourseHeader.tsx
"use client";
export default function MyCourseHeader() {

  return (
     <div className="w-full px-8 pt-6 pb-2">
      <div className="bg-[#EEF0FB] rounded-2xl px-6 py-4 flex items-center justify-between shadow-sm border border-[#e2e4f0]">
        {/* Left Side: Title */}
        <h1 className="text-xl font-semibold text-[#1E1B4B]">My Courses</h1>

        {/* Right Side: Actions & Profile */}
        <div className="flex items-center gap-5">
         

          {/* User Profile */}
          <div className="flex items-center gap-3 pl-4 border-l border-gray-300/50">
          
            {/* Profile */}
        <div className="flex items-center gap-2 bg-[#EFF2FF] px-3 py-1 rounded-lg shadow-sm">
          <img
           src="/images/profileman.jpg"
            className="w-8 h-8 rounded-full"
          />
         
        </div>
          </div>
        </div>
      </div>
    </div>
  );
};

