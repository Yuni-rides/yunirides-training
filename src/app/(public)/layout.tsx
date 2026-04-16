import CollapsedSidebar from "@/components/dashboard/CollapsedSidebar";
import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-[#f0f0f8] min-h-screen">
      <Sidebar />
  

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {children}
      </div>
    </div>
  );
}