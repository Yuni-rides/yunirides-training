// "use client";

// import { useState } from "react";
// import DonutChart from "@/components/charts/DonutChart";
// import {
//   GraduationCap,
//   Briefcase,
//   Heart,
//   Users,
//   School,
//   BellRing,
// } from "lucide-react";

// const modules = [
//   {
//     label: "Module 1",
//     pct: 80,
//     color: "#822C89",
//     categories: [
//       {
//         icon: <Briefcase className="w-4 h-4 text-[#822C89]" />,
//         name: "Onboarding",
//         progress: 100,
//         color: "#822C89",
//       },
//       {
//         icon: <Heart className="w-4 h-4 text-[#822C89]" />,
//         name: "Greeting",
//         progress: 90,
//         color: "#822C89",
//       },
//       {
//         icon: <Users className="w-4 h-4 text-[#822C89]" />,
//         name: "Welcome",
//         progress: 20,
//         color: "#822C89",
//       },
//     ],
//   },
//   {
//     label: "Module 2",
//     pct: 22,
//     color: "#1E3A8A",
//     categories: [
//       {
//         icon: <School className="w-4 h-4 text-[#1E3A8A]" />,
//         name: "School Transportation",
//         progress: 15,
//         color: "#1E3A8A",
//       },
//       {
//         icon: <BellRing className="w-4 h-4 text-[#1E3A8A]" />,
//         name: "Non-Emergency Transport",
//         progress: 5,
//         color: "#1E3A8A",
//       },
//       {
//         icon: <GraduationCap className="w-4 h-4 text-[#1E3A8A]" />,
//         name: "Medicine & Lab Deliveries",
//         progress: 2,
//         color: "#1E3A8A",
//       },
//     ],
//   },
// ];

// const overallScore = 80;
// const certPct = 80;
// const certEarned = 8;
// const certTotal = 10;

// export default function CombinedOverviewOverall() {
//   return (
//     <div
//       className="rounded-[24px] p-5 flex flex-col gap-5 w-full max-w-[360px] h-fit sticky top-4 font-sans border border-slate-100 shadow-sm"
//       style={{ background: "#F4F6FF" }}
//     >
//       {/* Title */}
//       <div>
//         <h2 className="text-[19px] font-semibold text-[#1F2937] tracking-tight">
//           Overall Overview
//         </h2>
//       </div>

//       {/* ── INNER CONTAINER CARD ── */}
//       <div className="rounded-[20px] p-5 flex flex-col gap-6 bg-[#EAEDFF]/60 flex-1">
//         {/* Top Section: Donut Chart on Left, Modules Summary on Right */}
//         <div className="flex items-center justify-between gap-2">
//           {/* Donut Chart container with absolute centered labels */}
//           <div className="relative w-fit flex-shrink-0">
//             <DonutChart
//               score={overallScore}
//               size={125}
//               strokeWidth={14}
//               color="#822C89"
//               bgColor="#E2E8F0"
//             />
//             <div
//               className="absolute pointer-events-none flex items-baseline justify-center"
//               style={{
//                 top: "50%",
//                 left: "50%",
//                 transform: "translate(-50%, -50%)",
//               }}
//             >
//               <span className="text-[22px] font-bold text-[#1F2937]">
//                 {overallScore}
//               </span>
//               <span className="text-[12px] font-semibold text-[#9CA3AF] ml-0.5">
//                 %
//               </span>
//             </div>
//           </div>

//           {/* Module Right Legends */}
//           <div className="flex flex-col gap-4 flex-1 pl-4">
//             {modules.map((mod) => (
//               <div key={mod.label} className="flex items-start gap-2.5">
//                 {/* Vertical Pill Line indicator */}
//                 <div
//                   className="w-[3.5px] h-9 rounded-full shrink-0 mt-0.5"
//                   style={{ background: mod.color }}
//                 />
//                 <div className="flex flex-col">
//                   <span className="text-[13px] font-semibold text-[#2563EB]">
//                     {mod.label}
//                   </span>
//                   <span className="text-[12px] font-bold text-[#374151] flex items-baseline mt-0.5">
//                     {mod.pct}
//                     <span className="text-[9px] font-medium text-[#9CA3AF] ml-0.5">
//                       %
//                     </span>
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Section Heading: Courses */}
//         <div className="mt-1">
//           <h3 className="text-[14px] font-bold text-[#2563EB]">Courses</h3>
//         </div>

//         {/* ── Two-Column Interleaved Layout matching image_8272e0.png ── */}
//         <div className="grid grid-cols-2 gap-x-3 gap-y-4">
//           {/* Column 1: Render Module 1 Items */}
//           <div className="flex flex-col gap-4">
//             {modules[0]?.categories.map((cat) => (
//               <div key={cat.name} className="flex items-start gap-2 min-w-0">
//                 {/* Clean White square card holding the icon with subtle shadow */}
//                 <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-[0_2px_8px_rgba(130,44,137,0.08)] border border-purple-50/40">
//                   {cat.icon}
//                 </div>
//                 <div className="min-w-0 flex flex-col justify-center pt-0.5">
//                   <div className="text-[11px] font-semibold text-[#6B7280] truncate leading-tight">
//                     {cat.name}
//                   </div>
//                   <div className="text-[11px] font-bold text-[#1F2937] mt-0.5">
//                     {cat.progress}%
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Column 2: Render Module 2 Items */}
//           <div className="flex flex-col gap-4">
//             {modules[1]?.categories.map((cat) => (
//               <div key={cat.name} className="flex items-start gap-2 min-w-0">
//                 <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-[0_2px_8px_rgba(30,58,138,0.06)] border border-blue-50/40">
//                   {cat.icon}
//                 </div>
//                 <div className="min-w-0 flex flex-col justify-center pt-0.5">
//                   <div className="text-[11px] font-semibold text-[#9CA3AF] line-clamp-2 leading-tight">
//                     {cat.name}
//                   </div>
//                   <div className="text-[11px] font-bold text-[#374151] mt-0.5">
//                     {cat.progress}%
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Bottom Horizontal Separation Rule */}
//         <div className="border-t border-slate-300/60 my-1" />

//         {/* ── CERTIFICATE COMPLETION SECTION ── */}
//         <div className="flex flex-col gap-1.5 -mt-1">
//           <div className="flex items-center justify-between text-[12px]">
//             <span className="font-semibold text-[#9CA3AF]">
//               Certificate Complete ratio
//             </span>
//             <span className="font-bold text-[#2563EB]">{certPct}%</span>
//           </div>

//           {/* Clean Thin Pill Tracker Fill */}
//           <div className="w-full h-2.5 bg-slate-200/70 rounded-full overflow-hidden relative">
//             <div
//               className="h-full rounded-full transition-all duration-500 ease-out"
//               style={{
//                 width: `${certPct}%`,
//                 background: "#822C89",
//               }}
//             />
//           </div>

//           <div className="text-[10.5px] font-semibold text-[#9CA3AF] text-right mt-0.5">
//             {certEarned}/{certTotal} Certificates Earned
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import DonutChart from "@/components/charts/DonutChart";
import { useDriverDashboardStore } from "@/features/dashboard/dashboard.store";
import {
  GraduationCap,
  Briefcase,
  Heart,
  Users,
  School,
  BellRing,
  HelpCircle,
} from "lucide-react";

// Dynamic operational icons binding function based on code identifier
const getOperationIcon = (code: string | null, moduleType: "MODULE_1" | "MODULE_2") => {
  const activeColor = moduleType === "MODULE_1" ? "text-[#822C89]" : "text-[#1E3A8A]";
  
  if (!code) {
    // General fallback items matching your payload
    return <Briefcase className={`w-4 h-4 ${activeColor}`} />;
  }

  switch (code.toUpperCase()) {
    case "SCHOOL_TRANSPORTATION":
      return <School className={`w-4 h-4 ${activeColor}`} />;
    case "NEMT":
      return <BellRing className={`w-4 h-4 ${activeColor}`} />;
    case "MEDICINE_LAB_DELIVERIES":
      return <GraduationCap className={`w-4 h-4 ${activeColor}`} />;
    case "ONBOARDING":
      return <Briefcase className={`w-4 h-4 ${activeColor}`} />;
    case "GREETING":
      return <Heart className={`w-4 h-4 ${activeColor}`} />;
    default:
      return <HelpCircle className={`w-4 h-4 ${activeColor}`} />;
  }
};

export default function CombinedOverviewOverall() {
  const { dashboardData, loading } = useDriverDashboardStore();

  if (loading && !dashboardData) {
    return (
      <div className="rounded-[24px] p-5 w-full bg-[#F4F6FF] border border-slate-100 shadow-sm text-center italic text-slate-400">
        Loading...
      </div>
    );
  }

  const overallScore = dashboardData?.overallProgress ?? 0;
  const certPct = dashboardData?.certificateCompleteRatio ?? 0;
  const certEarned = dashboardData?.totalCertificatesEarned ?? 0;
  const certTotal = dashboardData?.totalCertificatesPossible ?? 0;
  const apiModules = dashboardData?.modules || [];

  const module1 = apiModules.find((m) => m.type === "MODULE_1");
  const module2 = apiModules.find((m) => m.type === "MODULE_2");

  return (
    <div
      className="rounded-[24px] p-5 flex flex-col gap-5 w-full max-w-[360px] h-fit sticky top-4 font-sans border border-slate-100 shadow-sm"
      style={{ background: "#F4F6FF" }}
    >
      <div>
        <h2 className="text-[19px] font-semibold text-[#1F2937] tracking-tight">
          Overall Overview
        </h2>
      </div>

      <div className="rounded-[20px] p-5 flex flex-col gap-6 bg-[#EAEDFF]/60 flex-1">
        <div className="flex items-center justify-between gap-2">
          <div className="relative w-fit flex-shrink-0">
            <DonutChart
              score={overallScore}
              size={125}
              strokeWidth={14}
              color="#822C89"
              bgColor="#E2E8F0"
            />
            <div
              className="absolute pointer-events-none flex items-baseline justify-center"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <span className="text-[22px] font-bold text-[#1F2937]">
                {overallScore}
              </span>
              <span className="text-[12px] font-semibold text-[#9CA3AF] ml-0.5">
                %
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-4 flex-1 pl-4">
            {apiModules.map((mod) => (
              <div key={mod.id} className="flex items-start gap-2.5">
                <div
                  className="w-[3.5px] h-9 rounded-full shrink-0 mt-0.5"
                  style={{ background: mod.type === "MODULE_1" ? "#822C89" : "#1E3A8A" }}
                />
                <div className="flex flex-col">
                  <span className="text-[13px] font-semibold text-[#2563EB] truncate max-w-[120px]">
                    {mod.title}
                  </span>
                  <span className="text-[12px] font-bold text-[#374151] flex items-baseline mt-0.5">
                    {mod.moduleProgressPercent}
                    <span className="text-[9px] font-medium text-[#9CA3AF] ml-0.5">
                      %
                    </span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section Heading: Courses */}
        <div className="mt-1">
          <h3 className="text-[14px] font-bold text-[#2563EB]">Courses</h3>
        </div>

        {/* ── Two-Column Interleaved Layout matching incoming categories data ── */}
        <div className="grid grid-cols-2 gap-x-3 gap-y-4">
          {/* Column 1: Render Module 1 Categories */}
          <div className="flex flex-col gap-4">
            {module1?.categories.map((cat) => (
              <div key={cat.id} className="flex items-start gap-2 min-w-0">
                <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-[0_2px_8px_rgba(130,44,137,0.08)] border border-purple-50/40">
                  {getOperationIcon(cat.operation?.code || null, "MODULE_1")}
                </div>
                <div className="min-w-0 flex flex-col justify-center pt-0.5">
                  <div className="text-[11px] font-semibold text-[#6B7280] truncate leading-tight" title={cat.name}>
                    {cat.name}
                  </div>
                  <div className="text-[11px] font-bold text-[#1F2937] mt-0.5">
                    {cat.progressPercent}%
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Column 2: Render Module 2 Categories */}
          <div className="flex flex-col gap-4">
            {module2?.categories.map((cat) => (
              <div key={cat.id} className="flex items-start gap-2 min-w-0">
                <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-[0_2px_8px_rgba(30,58,138,0.06)] border border-blue-50/40">
                  {getOperationIcon(cat.operation?.code || null, "MODULE_2")}
                </div>
                <div className="min-w-0 flex flex-col justify-center pt-0.5">
                  <div className="text-[11px] font-semibold text-[#9CA3AF] line-clamp-2 leading-tight" title={cat.name}>
                    {cat.name}
                  </div>
                  <div className="text-[11px] font-bold text-[#374151] mt-0.5">
                    {cat.progressPercent}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Horizontal Separation Rule */}
        <div className="border-t border-slate-300/60 my-1" />

        {/* ── CERTIFICATE COMPLETION SECTION ── */}
        <div className="flex flex-col gap-1.5 -mt-1">
          <div className="flex items-center justify-between text-[12px]">
            <span className="font-semibold text-[#9CA3AF]">
              Certificate Complete ratio
            </span>
            <span className="font-bold text-[#2563EB]">{certPct}%</span>
          </div>

          {/* Clean Thin Pill Tracker Fill */}
          <div className="w-full h-2.5 bg-slate-200/70 rounded-full overflow-hidden relative">
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${certPct}%`,
                background: "#822C89",
              }}
            />
          </div>

          <div className="text-[10.5px] font-semibold text-[#9CA3AF] text-right mt-0.5">
            {certEarned}/{certTotal} Certificates Earned
          </div>
        </div>
      </div>
    </div>
  );
}
