'use client';
import { useEffect, useState } from "react";
import Header from "@/components/dashboard/Header";
import ModuleDetailedCard from "@/components/dashboard/ModuleDetailedCard";
import CombinedOverviewPanel from "@/components/dashboard/CombinedOverviewPanel";
import { trainingClient } from "@/lib/axios";

// Dashboard fallback data taake live par ya offline mode mein empty na dikhay
const DASHBOARD_FALLBACK = [
  "School Transportation",
  "Medicine & Lab Deliveries",
  "Safety Protocols"
];

export default function DashboardPage() {
  const [modules, setModules] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        // Axios instance ka use (Jo aapne pehle fixed kiya hai)
        const response = await trainingClient.get("/training/courses");
        
        const result = response.data;
        const actualData = Array.isArray(result) ? result : result.data;

        if (Array.isArray(actualData) && actualData.length > 0) {
          const uniqueCategories: string[] = Array.from(
            new Set(actualData.map((c: any) => c.category))
          );
          setModules(uniqueCategories);
        } else {
          setModules(DASHBOARD_FALLBACK);
        }
      } catch {
        console.warn("Dashboard Backend Offline: Using fallback modules.");
        setModules(DASHBOARD_FALLBACK);
      } finally {
        setLoading(false);
      }
    };
    fetchModules();
  }, []);

  return (
    <div className="flex h-screen bg-white">
      <div className="flex-1 p-6 space-y-6 overflow-y-auto no-scrollbar">
        <Header />

       {/* Banner Section - Refined for Alignment & Size */}
<div className="bg-[#EFF2FF] rounded-[32px] overflow-hidden flex flex-col md:flex-row items-stretch shadow-sm border border-blue-50 min-h-[220px]">
  {/* Text Content */}
  <div className="flex-1 p-8 flex flex-col justify-center">
    <h2 className="text-2xl lg:text-3xl font-black text-[#2C3979] leading-[1.1] uppercase italic">
      Safe & Compassionate <br /> 
      Transportation for Every Child.
    </h2>
    <p className="text-sm text-slate-500 mt-4 font-bold max-w-sm leading-relaxed">
      Providing transportation for children with special needs requires patience, awareness, and responsibility. Your care makes a lasting difference.
    </p>
  </div>

  {/* Image Content - Adjusted to fit right side properly */}
  <div className="relative w-full md:w-[350px] lg:w-[400px] h-48 md:h-auto overflow-hidden">
    <img
      src="/images/child.png"
      alt="banner"
      className="absolute inset-0 w-full h-full object-cover object-center"
    />
  </div>
</div>

        {/* MAIN GRID */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* LEFT SIDE: Modules List */}
          <div className="flex-1 flex flex-col gap-6">
            <div className="flex items-center gap-2">
               <h3 className="text-lg font-black text-[#2C3979] uppercase italic">Training Modules</h3>
               <div className="h-px flex-1 bg-slate-100"></div>
            </div>

            {loading ? (
              <div className="flex flex-col gap-4">
                {[1, 2].map((n) => (
                  <div key={n} className="h-32 w-full bg-slate-50 animate-pulse rounded-[28px]"></div>
                ))}
              </div>
            ) : (
              modules.map((moduleName, index) => (
                <ModuleDetailedCard
                  key={index}
                  moduleNumber={`Module 0${index + 1}`}
                  title={moduleName}
                  description={`Complete professional training and enterprise-level certification for ${moduleName}.`}
                  buttonText="Start"
                  buttonVariant={index === 0 ? "primary" : "outline"}
                  src="/images/login-hero.png" // Figma style thumbnail
                  onClick={() => { 
                    window.location.href = `/my-courses?module=${encodeURIComponent(moduleName)}`;
                  }}
                />
              ))
            )}
          </div>

          {/* RIGHT COLUMN: The Overview Panel (Sticky) */}
          <div className="w-full lg:w-[380px] lg:sticky lg:top-6">
            <CombinedOverviewPanel />
          </div>
        </div>
      </div>
    </div>
  );
}