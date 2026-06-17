"use client";

import Link from "next/link";

type Course = {
  id: string | number;
  title?: string;
  name?: string; // Fallback mapping link
  duration?: string;
  status?: string;
  thumbnail?: string;
  thumbnailUrl?: string | null;
  videoUrl?: string;
  progress?: {
    status?: string;
  };
    moduleId?: string;

};

const S3 = process.env.NEXT_PUBLIC_S3_BUCKET_URL;

function resolveUrl(url?: string | null): string | undefined {
  if (!url) return undefined;
  if (url.startsWith("http")) return url;
  return `${S3}/${url}`;
}

export default function CourseCard({ course, moduleId }: { course: Course; moduleId: string }) {
  const thumbnail =
    resolveUrl(course.thumbnailUrl) ?? resolveUrl(course.thumbnail);
  const status = course.progress?.status ?? course.status;

  return (
    <Link href={`/modules/${moduleId}/my-courses/${course.id}`} className="block group h-full">
      <div className="rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all cursor-pointer border border-transparent hover:border-purple-200 h-full flex flex-col">
        <div className="relative h-[140px] overflow-hidden bg-gray-200">
          {thumbnail ? (
            <img
              src={thumbnail}
              alt={course.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-[#2D1B69]/20" />
          )}

          <div className="absolute inset-0 bg-[#2D1B69]/30 group-hover:bg-[#2D1B69]/10 transition-colors" />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/90 rounded-full w-8 h-8 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
                <path d="M1 1L9 6L1 11V1Z" fill="#7C3AED" />
              </svg>
            </div>
          </div>

          {course.duration && (
            <span className="absolute bottom-2 left-2 text-[10px] font-bold px-2 py-1 rounded-lg bg-white/90 text-[#2D1B69] shadow-sm">
              {course.duration}
            </span>
          )}
        </div>

        <div className="p-3 flex-1 flex flex-col justify-between">
          <p className="text-[12px] font-bold text-[#1a1a2e] line-clamp-2 leading-snug group-hover:text-purple-700 transition-colors">
            {course.title ?? "Yunirides New Driver Training"}
          </p>

          {status && (
            <div className="mt-2">
              <span
                className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                  status.toLowerCase() === "completed"
                    ? "bg-green-100 text-green-700"
                    : status.toLowerCase() === "failed"
                      ? "bg-red-100 text-red-600"
                      : "bg-gray-100 text-gray-500"
                }`}
              >
                {status.toLowerCase()}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
