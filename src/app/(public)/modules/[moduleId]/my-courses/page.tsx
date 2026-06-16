"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Monitor } from "lucide-react";
import CourseCard from "@/components/my-courses/CourseCard";
import UserMenu from "@/components/UserMenu";
import { useCourseStore } from "@/features/courses/course.store";

const MOCK_COURSES = [
  {
    id: "c1",
    name: "Yunirides New Driver Training",
    description: "Standard driver onboarding modules.",
    status: "completed",
  },
  {
    id: "c2",
    name: "Yunirides New Driver Training",
    description: "How to interact with Yunirides riders.",
    status: "completed",
  },
  {
    id: "c3",
    name: "Yunirides New Driver Training",
    description: "Safety and emergency protocols.",
    status: "pending",
  },
  {
    id: "c4",
    name: "Yunirides New Driver Training",
    description: "How to use the Yunirides driver application.",
    status: "pending",
  },
];

function AssessmentCard({
  title,
  value,
  subtext,
}: {
  title: string;
  value: string;
  subtext: string;
}) {
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
  const params = useParams();
  const moduleId = params?.moduleId as string;

  const [activeTab, setActiveTab] = useState<number | null>(null);
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);

  const {
    modules,
    categories,
    loading,
    error,
    fetchModules,
    fetchCategoriesByModule,
  } = useCourseStore();

  useEffect(() => {
    fetchModules();
  }, []);

  useEffect(() => {
    if (!modules.length || !moduleId) return;
    const idx = modules.findIndex((m) => m.id === moduleId);
    setActiveTab(idx !== -1 ? idx : 0);
  }, [modules, moduleId]);

  useEffect(() => {
    if (activeTab === null) return;
    const mod = modules[activeTab];
    if (!mod?.id) return;
    fetchCategoriesByModule(mod.id);
  }, [activeTab]);

  useEffect(() => {
    if (categories.length > 0) {
      setActiveCategoryId(categories[0].id);
    } else {
      setActiveCategoryId(null);
    }
  }, [categories]);

  const completed = MOCK_COURSES.filter((c) => c.status === "completed").length;
  const pending = MOCK_COURSES.length - completed;

  return (
    <div className="flex h-screen bg-white">
      <div className="flex-1 p-6 space-y-6 overflow-y-auto no-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-black text-[#2C3979] uppercase italic">
            My Courses
          </h1>
          <UserMenu />
        </div>

        <div className="flex gap-2 bg-[#EFF2FF] p-1 rounded-xl w-fit">
          {modules.map((mod, idx) => (
            <button
              key={mod.id}
              onClick={() => setActiveTab(idx)}
              className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${
                activeTab === idx
                  ? "bg-[#2C3979] text-white shadow"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {mod.title}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-sm text-slate-400 italic animate-pulse">
            Loading...
          </p>
        ) : error ? (
          <p className="text-sm text-red-500 font-semibold">{error}</p>
        ) : (
          <div className="flex gap-6 border-b border-slate-100">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategoryId(cat.id)}
                className={`pb-2 text-sm font-semibold transition-all border-b-2 ${
                  activeCategoryId === cat.id
                    ? "border-[#822C89] text-[#822C89]"
                    : "border-transparent text-slate-400 hover:text-slate-600"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}

        <div>
          <h2 className="text-base font-black text-[#2C3979] uppercase italic mb-3">
            Assessments
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <AssessmentCard
              title="Overall Score"
              value="80%"
              subtext="Avg all score"
            />
            <AssessmentCard
              title="Course Completed"
              value={String(completed)}
              subtext={`Out of ${MOCK_COURSES.length}`}
            />
            <AssessmentCard
              title="Passed"
              value={String(completed)}
              subtext="Verified logs"
            />
            <AssessmentCard
              title="Pending Course"
              value={String(pending)}
              subtext="Needs attention"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-[#1E1B4B] border-b-2 border-[#635BFF] pb-1">
            {MOCK_COURSES.length} Courses
          </span>
          <span className="text-sm text-gray-400">
            / {activeTab !== null ? (modules[activeTab]?.title ?? "") : ""}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {MOCK_COURSES.map((course, index) => (
            <CourseCard key={`${course.id}-${index}`} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
}
