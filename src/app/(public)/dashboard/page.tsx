"use client";
import Header from "@/components/dashboard/Header";
import ModuleDetailedCard from "@/components/dashboard/ModuleDetailedCard";
import CombinedOverviewPanel from "@/components/dashboard/CombinedOverviewPanel";

const MOCK_MODULES = [
  {
    moduleNumber: "Module 01",
    title: "Title goes here.",
    description:
      "Simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley.",
    buttonText: "Start",
    buttonVariant: "primary" as const,
    href: "/my-courses?module=module-1",
  },
  {
    moduleNumber: "Module 02",
    title: "Title goes here.",
    description:
      "Simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley.",
    buttonText: "Start",
    buttonVariant: "outline" as const,
    href: "/my-courses?module=module-2",
  },
];

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-white">
      <div className="flex-1 p-6 space-y-6 overflow-y-auto no-scrollbar">
        <Header />

        {/* Banner */}
        <div className="bg-[#EFF2FF] rounded-[32px] overflow-hidden flex flex-col md:flex-row items-stretch shadow-sm border border-blue-50 min-h-[220px]">
          <div className="flex-1 p-8 flex flex-col justify-center">
            <h2 className="text-2xl lg:text-3xl font-black text-[#2C3979] leading-[1.1] uppercase italic">
              Safe & Compassionate <br />
              Transportation for Every Child.
            </h2>
            <p className="text-sm text-slate-500 mt-4 font-bold max-w-sm leading-relaxed">
              Providing transportation for children with special needs requires
              patience, awareness, and responsibility. As a Yuni Rides driver,
              always prioritize safety, communicate calmly, and ensure each
              child feels secure and supported throughout their journey. Your
              care makes a lasting difference.
            </p>
          </div>
          <div className="relative w-full md:w-[350px] lg:w-[400px] h-48 md:h-auto overflow-hidden">
            <img
              src="/images/child.png"
              alt="banner"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          </div>
        </div>

        {/* Main Grid */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left: Modules */}
          <div className="flex-1 flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-black text-[#2C3979] uppercase italic">
                Training Modules
              </h3>
              <div className="h-px flex-1 bg-slate-100"></div>
            </div>

            {MOCK_MODULES.map((mod, index) => (
              <ModuleDetailedCard
                key={index}
                moduleNumber={mod.moduleNumber}
                title={mod.title}
                description={mod.description}
                buttonText={mod.buttonText}
                buttonVariant={mod.buttonVariant}
                src="/images/login-hero.png"
                onClick={() => {
                  window.location.href = mod.href;
                }}
              />
            ))}
          </div>

          {/* Right: Overview Panel */}
          <div className="w-full lg:w-[380px] lg:sticky lg:top-6">
            <CombinedOverviewPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
