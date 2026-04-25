
import Header from "@/components/dashboard/Header";
import ModuleDetailedCard from "@/components/dashboard/ModuleDetailedCard";
import CombinedOverviewPanel from "@/components/dashboard/CombinedOverviewPanel";

export default function DashboardPage() {
  return (
    
    <div className="flex h-screen bg-[white]">
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
      
      {/* MAIN GRID: 3 columns total */}
     <div className="min-h-screen bg-[#FDFCF8] flex flex-col p-6 space-y-6">

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* LEFT COLUMN: Modules (Stacked Vertically) */}
      {/* Column 2 */}
    <div className="flex flex-col gap-3">
      <ModuleDetailedCard
        moduleNumber="Module 1"
        title="Title goes here."
        description="Simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley."
        buttonText="Start"
        buttonVariant="primary"
        src="/images/child.png"
      />
      <ModuleDetailedCard
        moduleNumber="Module 2"
        title="Title goes here."
        description="Simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley."
        buttonText="Start"
        buttonVariant="outline"
        src="/images/child.png"
      />
    </div>

        {/* RIGHT COLUMN: The Overview Panel */}
      
         :
<div className="grid grid-cols-[1fr_300px] gap-6 items-start">
  
  {/* RIGHT: overview — full right side */}
  <CombinedOverviewPanel />

</div>
           </div>
           </div>
    </div>
    </div> );
    }