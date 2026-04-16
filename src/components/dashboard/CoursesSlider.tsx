import { courses } from "@/constants/dashboard";

export default function CourseCard() {
  return (
    <div className="card">
      <h3 className="font-medium text-[#2C3979] mb-4 ">My courses</h3>

      <div className="flex items-center gap-2">

        {/* Left arrow */}
        <button className="w-7 h-7 flex-shrink-0 rounded-full border border-[#EFF2FF]-200 flex items-center justify-center text-gray-400 hover:bg-gray-50">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M6.5 2L3.5 5L6.5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Course list */}
        <div className="flex gap-3 flex-1 overflow-hidden">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-purple-50 rounded-xl flex gap-3 items-center p-3 flex-1 min-w-0"
            >
              <div className="relative w-20 h-[72px] rounded-xl overflow-hidden flex-shrink-0 bg-purple-400">
                <img
                  src={course.thumbnail}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center">
                    <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
                      <path d="M1 1L9 6L1 11V1Z" fill="#7C3AED"/>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-purple-900 mb-2 leading-snug line-clamp-2"></p>

                <div className="flex gap-3 items-center flex-wrap">
                  <div>
                    <p className="text-[10px] text-purple-600 font-medium mb-1">Duration</p>
                    <span className="inline-flex items-center gap-1 bg-white border border-purple-200 rounded-full px-2.5 py-0.5 text-[11px] text-purple-800 font-medium">
                      🕐 {course.duration}
                    </span>
                  </div>

                  <div>
                    <p className="text-[10px] text-purple-600 font-medium mb-1">Program status</p>
                    <span
                      className={`inline-block rounded-full px-3 py-0.5 text-[11px] font-medium ${
                        course.status === "Active"
                          ? "bg-green-500 text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {course.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right arrow */}
        <button className="w-7 h-7 flex-shrink-0 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M3.5 2L6.5 5L3.5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

      </div>
    </div>
  );
}

/* =========================
   ICONS (MOVED OUTSIDE JSX)
   ========================= */

function PlayIcon() {
  return (
    <svg width="11" height="13" viewBox="0 0 11 13" fill="none">
      <path d="M1 1.2L10 6.5 10 11.8V1.2Z" fill="#6b5fc7" />
    </svg>
  );
}

function HeartIcon({ filled }: { filled?: boolean }) {
  return (
    <svg width="11" height="10" viewBox="0 0 12 11" fill="none">
      <path
        d="M6 10S1 6.8 1 3.5A2.5 2.5 0 016 3.5 2.5 2.5 0 0111 3.5C11 6.8 6 10 6 10z"
        fill={filled ? "white" : "none"}
        stroke={filled ? "none" : "#9ca3af"}
        strokeWidth="1.2"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
      <circle cx="5" cy="5" r="4" stroke="white" strokeWidth="1" />
      <path d="M5 3v2.2l1.3 1.3" stroke="white" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}