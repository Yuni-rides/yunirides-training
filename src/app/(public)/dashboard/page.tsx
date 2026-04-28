'use client';
import { useEffect, useState } from "react";
import Header from "@/components/dashboard/Header";
import ModuleDetailedCard from "@/components/dashboard/ModuleDetailedCard";
import CombinedOverviewPanel from "@/components/dashboard/CombinedOverviewPanel";
import { trainingClient } from "@/lib/axios";

export default function DashboardPage() {
  // 1. States hamesha function ke shuru mein honi chahiye
  const [modules, setModules] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // 2. Fetch logic return se pehle
 // page.tsx ka useEffect wala part
useEffect(() => {
  const fetchModules = async () => {
    try {
      // BaseURL: http://localhost:5000/api
      // Endpoint: /training/courses
      const response = await trainingClient.get("/training/courses");
      
      console.log("Check this in Browser Console:", response.data);

      if (response.data && response.data.data) {
        const allCourses = response.data.data;
        const uniqueCategories: string[] = Array.from(
          new Set(allCourses.map((c: any) => c.category))
        );
        setModules(uniqueCategories);
      }
    } catch (error) {
      console.error("Backend connect nahi ho raha:", error);
    } finally {
      setLoading(false);
    }
  };
  fetchModules();
}, []);

  return (
    <div className="flex h-screen bg-white">
      <div className="flex-1 p-6 space-y-6 overflow-y-auto">
        <Header />

        {/* Banner */}
        <div className="bg-[#EFF2FF] rounded-xl p-6 flex justify-between items-center shadow-sm">
          <div className="max-w-md">
            <h2 className="text-xl font-semibold text-blue-800">
              Safe & Compassionate Transportation for Every Child.
            </h2>
            <p className="text-sm text-blue-500 mt-2">
              Providing transportation for children with special needs requires patience, awareness, and responsibility. Your care makes a lasting difference.
            </p>
          </div>
          <img
            src="/images/child.png"
            alt="banner"
            className="w-48 rounded-lg"
          />
        </div>

        {/* MAIN GRID: 3 columns total */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* LEFT SIDE: Modules (Takes up the remaining space) */}
          <div className="flex-1 flex flex-col gap-4">
            <h3 className="text-lg font-bold text-gray-700">Training Modules</h3>
            {loading ? (
              <p>Loading...</p>
            ) : modules.length > 0 ? (
              modules.map((moduleName, index) => (
                <ModuleDetailedCard
                  key={index}
                  moduleNumber={`Module ${index + 1}`}
                  title={moduleName}
                  description={`Complete training and certification for ${moduleName}.`}
                  buttonText="Start"
                  buttonVariant={index === 0 ? "primary" : "outline"}
                  src="/images/child.png"
                  onClick={() => { window.location.href = `/my-courses?module=${moduleName}`;}}                />
              ))
            ) : (
              <div className="p-4 text-gray-500">No modules found. Ensure backend is running and seeded.</div>
            )}
          </div>

          {/* RIGHT COLUMN: The Overview Panel */}
     {/* RIGHT SIDE: Overview Panel (Fixed Width + Sticky) */} :
          <div className="w-500 lg:w-[350px] lg:sticky lg:top-6">
            <CombinedOverviewPanel />
          </div>
        </div>
       </div>
        </div>
      
  );
}