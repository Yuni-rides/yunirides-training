"use client";

import Link from 'next/link';

// 1. Updated type to include videoUrl and ensure thumbnail is present
type Course = {
  id: string | number;
  title?: string;
  duration?: string;
  status?: string;
  thumbnail: string;
  videoUrl?: string; // Added for the background video
};


export default function CourseCard({ course }: { course: Course }) {
  return (
    <Link 
      href={`/my-courses/${course.id}`} 
      className="block group h-full"
    >
      <div className="rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all cursor-pointer border border-transparent hover:border-purple-200 h-full flex flex-col">
        
        {/* Thumbnail/Video Section */}
        <div className="relative h-[140px] overflow-hidden bg-gray-200">
          {course.videoUrl ? (
            <video
              src={course.videoUrl}
              poster={course.thumbnail}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              
            />
          ) : (
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          )}
          

          {/* Overlay - darkened purple effect */}
          <div className="absolute inset-0 bg-[#2D1B69]/30 group-hover:bg-[#2D1B69]/10 transition-colors" />

          {/* Play button UI */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/90 rounded-full w-8 h-8 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
                <path d="M1 1L9 6L1 11V1Z" fill="#7C3AED"/>
              </svg>
            </div>
          </div>

          {/* Duration Badge */}
          {course.duration && (
            <span className="absolute bottom-2 left-2 text-[10px] font-bold px-2 py-1 rounded-lg bg-white/90 text-[#2D1B69] shadow-sm">
               {course.duration}
            </span>
          )}

          {/* Favorite/Heart Icon */}
          <div className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full p-1.5 shadow-sm transition-colors">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.84-8.84 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </div>
        </div>

        {/* Text Content */}
        <div className="p-3 flex-1 flex flex-col justify-between">
          <p className="text-[12px] font-bold text-[#1a1a2e] line-clamp-2 leading-snug group-hover:text-purple-700 transition-colors">
            {course.title || "Yunirides New Driver Training"}
          </p>
          
          {course.status && (
            <div className="mt-2">
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                course.status.toLowerCase() === 'active' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-gray-100 text-gray-500'
              }`}>
                {course.status}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}