"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/dashboard/Header";
import ModuleDetailedCard from "@/components/dashboard/ModuleDetailedCard";
import CombinedOverviewOverall from "@/components/dashboard/CombinedOverviewPanel";
import Loader from "@/components/ui/Loader";
import { useDriverDashboardStore } from "@/features/dashboard/dashboard.store";

export default function DashboardPage() {
  const router = useRouter();
  const { dashboardData, fetchDashboardMetrics, loading, error } =
    useDriverDashboardStore();

  useEffect(() => {
    fetchDashboardMetrics();
  }, [fetchDashboardMetrics]);

  const modulesList = dashboardData?.modules || [];

  const handleModuleNavigation = (mod: any) => {
    router.push(`/modules/${mod.id}/my-courses`);
  };

  return (
    <div className="flex h-screen bg-white">
      <div className="flex-1 p-6 space-y-6 overflow-y-auto no-scrollbar relative">
        {loading && <Loader />}
        <Header />

        <div className="bg-[#EFF2FF] rounded-[32px] overflow-hidden flex flex-col md:flex-row items-stretch shadow-sm border border-blue-50 min-h-[220px]">
          <div className="flex-1 p-8 flex flex-col justify-center">
            <h2 className="text-2xl lg:text-3xl font-black text-[#2C3979] leading-[1.1] uppercase italic">
              Safe & Compassionate <br /> Transportation for Every Child.
            </h2>
            <p className="text-sm text-slate-500 mt-4 font-bold max-w-sm leading-relaxed">
              Providing transportation for children with special needs requires
              patience, awareness, and responsibility.
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

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="flex-1 flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-black text-[#2C3979] uppercase italic">
                Training Modules
              </h3>
              <div className="h-px flex-1 bg-slate-100"></div>
            </div>

            {error && (
              <p className="text-sm font-semibold text-red-500 bg-red-50 p-3 rounded-xl">
                {error}
              </p>
            )}

            {modulesList.length === 0 && !loading ? (
              <p className="text-sm text-slate-400 italic">
                No operational modules found.
              </p>
            ) : (
              modulesList.map((mod) => (
                <ModuleDetailedCard
                  key={mod.id}
                  title={mod.title}
                  subTitle={mod.subTitle}
                  description={mod.description}
                  buttonText={
                    mod.moduleProgressPercent === 100
                      ? "Completed"
                      : "Start Learning"
                  }
                  buttonVariant={
                    mod.moduleProgressPercent === 100 ? "secondary" : "primary"
                  }
                  src={
                    mod.thumbnailUrl
                      ? `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/${mod.thumbnailUrl}`
                      : "/images/login-hero.png"
                  }
                  onClick={() => handleModuleNavigation(mod)}
                />
              ))
            )}
          </div>

          <div className="w-full lg:w-[380px] lg:sticky lg:top-6">
            <CombinedOverviewOverall />
          </div>
        </div>
      </div>
    </div>
  );
}
