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
    </html>
  );
  
}
