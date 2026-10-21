"use client";

import DonutChart from "@/components/charts/DonutChart";
import { useDriverDashboardStore } from "@/features/dashboard/dashboard.store";
import {
  GraduationCap,
  Briefcase,
  Heart,
  School,
  BellRing,
  HelpCircle,
} from "lucide-react";

const getOperationIcon = (
  code: string | null,
  moduleType: "MODULE_1" | "MODULE_2",
) => {
  const activeColor =
    moduleType === "MODULE_1" ? "text-[#822C89]" : "text-[#1E3A8A]";

  if (!code) {
    return <Briefcase className={`w-4 h-4 ${activeColor}`} />;
  }

  switch (code.toUpperCase()) {
    case "SCHOOL_TRANSPORTATION":
      return <School className={`w-4 h-4 ${activeColor}`} />;
    case "NEMT":
      return <BellRing className={`w-4 h-4 ${activeColor}`} />;
    case "DELIVERIES":
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
              color="#D85A44"
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
              <span className="text-[22px] font-bold text-secondary">
                {overallScore}
              </span>
              <span className="text-[12px] font-semibold text-secondary ml-0.5">
                %
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-4 flex-1 pl-4">
            {apiModules.map((mod) => (
              <div key={mod.id} className="flex items-start gap-2.5">
                <div
                  className="w-[3.5px] h-9 rounded-full shrink-0 mt-0.5"
                  style={{
                    background: mod.type === "MODULE_1" ? "#D85A44" : "#151D32",
                  }}
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

        <div className="mt-1">
          <h3 className="text-[14px] font-bold text-[#2563EB]">Courses</h3>
        </div>

        <div className="grid grid-cols-2 gap-x-3 gap-y-4">
          <div className="flex flex-col gap-4">
            {module1?.categories.map((cat) => (
              <div key={cat.id} className="flex items-start gap-2 min-w-0">
                <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-[0_2px_8px_rgba(130,44,137,0.08)] border border-purple-50/40 overflow-hidden">
                  {cat.thumbnailUrl ? (
                    <img
                      src={`${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/${cat.thumbnailUrl}`}
                      alt={cat.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    getOperationIcon(cat.operation?.code || null, "MODULE_1")
                  )}
                </div>
                <div className="min-w-0 flex flex-col justify-center pt-0.5">
                  <div
                    className="text-[11px] font-semibold text-[#6B7280] truncate leading-tight"
                    title={cat.name}
                  >
                    {cat.name}
                  </div>
                  <div className="text-[11px] font-bold text-[#1F2937] mt-0.5">
                    {cat.progressPercent}%
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            {module2?.categories.map((cat) => (
              <div key={cat.id} className="flex items-start gap-2 min-w-0">
                <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-[0_2px_8px_rgba(30,58,138,0.06)] border border-blue-50/40 overflow-hidden">
                  {cat.thumbnailUrl ? (
                    <img
                      src={`${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/${cat.thumbnailUrl}`}
                      alt={cat.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    getOperationIcon(cat.operation?.code || null, "MODULE_2")
                  )}
                </div>
                <div className="min-w-0 flex flex-col justify-center pt-0.5">
                  <div
                    className="text-[11px] font-semibold text-[#9CA3AF] line-clamp-2 leading-tight"
                    title={cat.name}
                  >
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

        <div className="border-t border-slate-300/60 my-1" />

        <div className="flex flex-col gap-1.5 -mt-1">
          <div className="flex items-center justify-between text-[12px]">
            <span className="font-semibold text-[#9CA3AF]">
              Certificate Complete ratio
            </span>
            <span className="font-bold text-[#2563EB]">{certPct}%</span>
          </div>

          <div className="w-full h-2.5 bg-slate-200/70 rounded-full overflow-hidden relative">
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${certPct}%`,
                background: "#D85A44",
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
