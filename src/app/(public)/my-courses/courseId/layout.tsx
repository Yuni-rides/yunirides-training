import CollapsedSidebar from "@/components/dashboard/CollapsedSidebar";

export default function CourseDetailLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#f0f0f8]">
      <CollapsedSidebar />
      <main className="flex-1 min-w-0 flex flex-col">{children}</main>
    </div>
  );
}