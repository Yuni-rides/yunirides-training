  import type { Metadata } from "next";
  import { Geist } from "next/font/google";
  import "@/styles/globals.css";

  import MobileNavigation from "@/components/MobileNavigation";
  import { Toaster } from "@/components/ui/Toaster";

  const geist = Geist({ subsets: ["latin"] });

  export const metadata: Metadata = {
    title: "Yuni Rides Training",
    description: "Training Portal",
  };

  export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (

      <html lang="en">
        <body className={`${geist.className}`}>
          <main className="w-full min-h-screen">
            {children}
            <Toaster />
          </main>

          <MobileNavigation /> 
        </body>
      </html>
    );
  }
      