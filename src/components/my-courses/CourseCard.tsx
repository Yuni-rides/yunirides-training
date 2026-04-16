type Course = {
  id: number;
  title?: string;
  duration?: string;
  status?: string;
  thumbnail: string;
};

export default function CourseCard({ course }: { course: Course }) {
  return (
    <div className="rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition cursor-pointer">

      {/* Thumbnail */}
      <div className="relative h-[140px]">
        <img
          src={course.thumbnail}
          className="w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-[#2D1B69]/40" />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white rounded-full p-2 text-xs shadow">
            ▶
          </div>
        </div>

        {/* Duration */}
        {course.duration && (
          <span className="absolute bottom-2 left-2 text-[10px] px-2 py-1 rounded-full bg-white">
            {course.duration}
          </span>
        )}

        {/* Heart */}
        <div className="absolute top-2 right-2 bg-white/80 rounded-full px-2 py-1 text-[10px]">
          ♡
        </div>
      </div>

      {/* Title */}
      <div className="p-3">
        <p className="text-[12px] font-medium text-[#1a1a2e] line-clamp-2">
          {course.title || "Course title"}
        </p>
      </div>
    </div>
  );
}