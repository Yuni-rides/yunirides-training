
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import CourseCard from "@/components/dashboard/CourseCard";
import CourseOverview from "@/components/dashboard/CourseOverview";
import CalendarCard from "@/components/dashboard/CalendarCard";
import UpcomingEvents from "@/components/dashboard/UpcomingEvents";

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-[white]">
      <Sidebar />

      <div className="flex-1 p-6 space-y-6 overflow-y-auto">
        <Header />

        {/* Banner */}
        <div className="bg-[#EFF2FF] rounded-xl p-6 flex justify-between items-center shadow-sm">
          <div className="max-w-md">
            <h2 className="text-xl font-semibold text-blue-800">
              Safe & Compassionate Transportation for Every Child.
            </h2>
            <p className="text-sm text-blue-500 mt-2">
              Providing transportation for children with special needs requires patience, awareness, and responsibility. As a Yuni Rides driver, always prioritize safety, communicate calmly, and ensure each child feels secure and supported throughout their journey. Your care makes a lasting difference.
            </p>
          </div>

          <img
            src="/images/child.png"
            alt="banner"
            className="w-150 rounded-lg"
          />
        </div>

        {/* Middle */}
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            <CourseCard />
            <CourseOverview />
          </div>

          <div className="space-y-6">
            <CalendarCard />
            <UpcomingEvents />
          </div>
        </div>
      </div>
    </div>
  );
}