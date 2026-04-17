import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "../styles/globals.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Yuni Rides Training",
  description: "Driver training portal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={geist.className}>{children}</body>
     {/* Added 'max-w-full overflow-x-hidden' to prevent global dragging */}
      <body className={`${geist.className} max-w-full overflow-x-hidden`}>
        {children}
      </body>
    
    </html>
  );
  
}
