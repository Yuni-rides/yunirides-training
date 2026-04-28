import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "../styles/globals.css";

import MobileNavigation from "@/components/MobileNavigation";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Yuni Rides Training",
  description: "Senior Developer Training Portal",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (

    <html lang="en">
      <body className={`${geist.className} overflow-x-hidden`}>
        {/* Sirf main content aur naya navigation rakhein */}
        <main className="w-full min-h-screen">
          {children}
        </main>

        {/* Naya UI navigation */}
        <MobileNavigation /> 
      </body>
    </html>
  );
}
    