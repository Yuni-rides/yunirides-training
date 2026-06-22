export const dynamic = "force-dynamic";

import SidebarWrapper from "@/components/dashboard/SidebarWrapper";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SidebarWrapper>{children}</SidebarWrapper>;
}
