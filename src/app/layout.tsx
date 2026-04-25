import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "../styles/globals.css";
import Sidebar from "../components/dashboard/Sidebar"; 
import MobileNavigation from "@/components/MobileNavigation";


const geist = Geist({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geist.className} overflow-x-hidden`}>
        {/* The Shell */}
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] min-h-screen w-full">
          {/* Sidebar sits in the first column (hidden on mobile) */}
          <div className="hidden lg:block border-r border-gray-200 bg-[#EFF2FF]">
            <Sidebar />
          </div>

          {/* Content sits in the second column */}
          <div className="flex flex-col min-w-0 w-full">
            {children}
          </div>
        </div>

        {/* Floating Mobile Nav - Only shows on < 1024px */}
        <MobileNavigation /> 
      </body>
    </html>
  );
}
