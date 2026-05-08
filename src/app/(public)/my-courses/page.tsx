"use client";

import { useState, useEffect } from "react"; // 1. useEffect aur useState dynamic fetch ke liye add kiya
import { Search, Grid, BarChart2, ChevronDown, Monitor } from "lucide-react"; 
import CourseCard from "@/components/my-courses/CourseCard";
import UserMenu from "@/components/UserMenu"; 

const TABS = [
  { id: "all", label: "All" },
  { id: "school-transportation", label: "Onboarding" },
  { id: "non-emergency", label: "Greeting"},
  { id: "medicine-lab", label: "Welcome" },
];

function AssessmentCard({ title, value, subtext }: { title: string; value: string; subtext: string }) {
  return (
    <div className="flex items-center gap-4 bg-[#EFF2FF] p-4 rounded-xl border border-white shadow-sm w-full">
      <div className="bg-white p-2.5 rounded-lg shadow-sm flex items-center justify-center">
        <Monitor size={20} className="text-[#822C89]" />
      </div>
      <div className="flex flex-col">
        <span className="text-[11px] text-gray-500 font-medium uppercase tracking-tight leading-none mb-1">
          {title}
        </span>
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-bold text-[#822C89] leading-none">
            {value}
          </span>
          <span className="text-[10px] text-gray-400 whitespace-nowrap">
            {subtext}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function MyCoursesPage() {
  const [activeTab, setActiveTab] = useState("all");
  
  // 2. Real-time categories (courses) load karne ke liye states
  const [coursesList, setCoursesList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // 3. Overall statistics dynamic show karne ke liye (Aapki driver progress column ke hisab se)
  const [stats, setStats] = useState({
    overallScore: "80%",
    completed: "0",
    total: "8",
    passed: "0",
    pending: "8",
  });
useEffect(() => {
  const fetchDashboardData = async () => {
    try {
      // 1. Asli backend endpoint jo aapke terminal par mapped hai:
      const response = await fetch("http://localhost:5000/api/training/courses"); 
      
      if (!response.ok) {
        throw new Error("Local backend response was not ok");
      }
      
      const rawData = await response.json();
      
      // Safe check for Array:
      const actualCoursesArray = Array.isArray(rawData) 
        ? rawData 
        : (rawData.data || rawData.courses || []);

      setCoursesList(actualCoursesArray);

      // Dynamic assessments calculation
      const totalCourses = actualCoursesArray.length || 8;
      const completedCount = actualCoursesArray.filter((c: any) => c.status === "completed").length;
      const pendingCount = totalCourses - completedCount;

      setStats({
        overallScore: "80%", // Ye static ya separate API report se aayega
        completed: String(completedCount),
        total: String(totalCourses),
        passed: String(completedCount),
        pending: String(pendingCount),
      });

    } catch (error) {
      console.log("Backend offline or API structure mismatched, using local fallback.");
      
      // Safe local fallback jo pehle humne banaya tha
      const mockCategories = [
        { id: "1", name: "Onboarding Training", description: "Standard driver onboarding modules.", status: "completed" },
        { id: "2", name: "Greeting & Professionalism", description: "How to interact with Yunirides riders.", status: "completed" },
        { id: "3", name: "Safety & Emergency Protocols", description: "Safety and emergency protocols.", status: "pending" },
        { id: "4", name: "App & Navigation Guide", description: "How to use the Yunirides driver application.", status: "pending" },
      ];

      setCoursesList(mockCategories);
      setStats({
        overallScore: "80%",
        completed: "2",
        total: "4",
        passed: "2",
        pending: "2",
      });
    } finally {
      setLoading(false);
    }
  };

  fetchDashboardData();
}, []);

  return (
    <div className="flex h-screen bg-white">
      <main className="flex-1 flex flex-col min-w-0">

        {/* TOP BAR */}
        <div className="w-full px-6 pt-6 pb-4">
          <div className="bg-[#EFF2FF] rounded-2xl px-6 py-4 flex items-center justify-between shadow-sm border border-[#e2e4f0]">
            <h1 className="text-lg font-semibold text-gray-700">My Courses</h1>
            <div className="flex items-center gap-3">
              <UserMenu />
            </div>
          </div>
        </div>

        {/* PAGE CONTENT */}
        <div className="px-8 pb-10 overflow-y-auto">

          {/* TABS */}
          <div className="flex gap-8 border-b border-gray-200 mb-6">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 text-[13px] font-medium transition-all relative ${
                  activeTab === tab.id
                    ? "text-[#1E1B4B] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#1E1B4B]"
                    : "text-gray-400 hover:text-purple-600"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* ASSESSMENTS (Dynamic from stats state) */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-[#1E1B4B] mb-4">Assessments</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <AssessmentCard title="Over all score" value={stats.overallScore} subtext="Avg all score" />
              <AssessmentCard title="Course completed" value={stats.completed} subtext={`Out of ${stats.total}`} />
              <AssessmentCard title="Passed" value={stats.passed} subtext="1 need retry" />
              <AssessmentCard title="Pending course" value={stats.pending} subtext="1 need retry" />
            </div>
          </div>

          {/* FILTERS & SEARCH */}
          <div className="flex items-center gap-3 mb-8">
            <button className="flex items-center gap-2 bg-[#E8EAF6] px-4 py-2.5 rounded-xl text-[12px] font-medium text-[#4F3E9C]">
              <Grid size={14} />
              Categories
              <ChevronDown size={14} />
            </button>

            <button className="flex items-center gap-2 bg-[#E8EAF6] px-4 py-2.5 rounded-xl text-[12px] font-medium text-[#4F3E9C]">
              <BarChart2 size={14} />
              Progress
              <ChevronDown size={14} />
            </button>

            <div className="ml-auto flex items-center bg-[#E8EAF6] rounded-xl overflow-hidden w-64">
              <input
                placeholder="Search"
                className="bg-transparent px-4 py-2.5 text-[12px] outline-none flex-1 placeholder:text-gray-400"
              />
              <button className="bg-[#1E1B4B] text-white p-2.5 mx-1 my-1 rounded-lg">
                <Search size={14} />
              </button>
            </div>
          </div>

          {/* COURSE HEADER */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-[#1E1B4B] border-b-2 border-[#635BFF] pb-1">
                {/* Real-time length directly from DB Categories fetch */}
                {loading ? "Loading..." : `${coursesList.length} Courses`}
              </span>
              <span className="text-sm text-gray-400">/ Yunirides New Driver Training</span>
            </div>
            <button className="flex items-center gap-2 text-[12px] px-4 py-2 border border-gray-200 rounded-xl bg-white text-gray-600 shadow-sm">
              Recently Accessed
              <ChevronDown size={14} />
            </button>
          </div>

          {/* COURSE GRID */}
          {loading ? (
            <div className="flex justify-center items-center h-48">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1E1B4B]"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {coursesList.map((course, index) => (
                <CourseCard key={`${course.id || course._id}-${index}`} course={course} />
              ))}
            </div>
          )}
         </div>
      </main>
    </div>
  );
}