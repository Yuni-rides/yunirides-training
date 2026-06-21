"use client";

import Link from "next/link";
import { Lock } from "lucide-react";

type Course = {
  id: string | number;
  title?: string;
  name?: string;
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

export default function CourseCard({
  course,
  moduleId,
  isLocked = false,
}: {
  course: Course;
  moduleId: string;
  isLocked?: boolean;
}) {
  const thumbnail =
    resolveUrl(course.thumbnailUrl) ?? resolveUrl(course.thumbnail);
  const status = course.progress?.status ?? course.status;

  const statusBadge = isLocked ? (
    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-400">
      locked
    </span>
  ) : status ? (
    <span
      className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
        status.toLowerCase() === "passed"
          ? "bg-green-100 text-green-700"
          : status.toLowerCase() === "failed"
            ? "bg-red-100 text-red-600"
            : status.toLowerCase() === "in_progress"
              ? "bg-blue-100 text-blue-600"
              : "bg-gray-100 text-gray-500"
      }`}
    >
      {status.toLowerCase()}
    </span>
  ) : null;

  const cardContent = (
    <div
      className={`rounded-2xl overflow-hidden bg-white shadow-sm transition-all border h-full flex flex-col ${
        isLocked
          ? "opacity-50 cursor-not-allowed border-transparent"
          : "hover:shadow-md cursor-pointer hover:border-purple-200 border-transparent group"
      }`}
    >
      <div className="relative h-[140px] overflow-hidden bg-gray-200">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={course.title}
            className={`w-full h-full object-cover transition-transform duration-500 ${
              !isLocked ? "group-hover:scale-105" : ""
            }`}
          />
        ) : (
          <div className="w-full h-full bg-[#2D1B69]/20" />
        )}

        <div
          className={`absolute inset-0 transition-colors ${
            isLocked
              ? "bg-[#2D1B69]/50"
              : "bg-[#2D1B69]/30 group-hover:bg-[#2D1B69]/10"
          }`}
        />

        <div className="absolute inset-0 flex items-center justify-center">
          {isLocked ? (
            <div className="bg-white/80 rounded-full w-8 h-8 flex items-center justify-center shadow-lg">
              <Lock size={14} className="text-[#7C3AED]" />
            </div>
          ) : (
            <div className="bg-white/90 rounded-full w-8 h-8 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
                <path d="M1 1L9 6L1 11V1Z" fill="#7C3AED" />
              </svg>
            </div>
          )}
        </div>

        {course.duration && (
          <span className="absolute bottom-2 left-2 text-[10px] font-bold px-2 py-1 rounded-lg bg-white/90 text-[#2D1B69] shadow-sm">
            {course.duration}
          </span>
        )}
      </div>

      <div className="p-3 flex-1 flex flex-col justify-between">
        <p
          className={`text-[12px] font-bold text-[#1a1a2e] line-clamp-2 leading-snug transition-colors ${
            !isLocked ? "group-hover:text-purple-700" : ""
          }`}
        >
          {course.title ?? "Yunirides New Driver Training"}
        </p>

        <div className="mt-2">{statusBadge}</div>
      </div>
    </div>
  );

  if (isLocked) return <div className="block h-full">{cardContent}</div>;

  return (
    <Link
      href={`/modules/${moduleId}/my-courses/${course.id}`}
      className="block group h-full"
    >
      {cardContent}
    </Link>
  );
}
