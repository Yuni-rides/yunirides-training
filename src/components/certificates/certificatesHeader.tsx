"use client";
import UserMenu from "@/components/UserMenu";

export default function CertificatesHeader() {
  return (
    /* This outer div creates the "Blue Shell" you see on the Dashboard */
    <div className="w-full bg-[#EFF2FF] rounded-2xl px-6 py-4 flex items-center justify-between border border-transparent shadow-sm">
      
      {/* Left Side: Page Title */}
      <h1 className="text-lg font-semibold text-[#1E1B4B]">
        My Certificates
      </h1>

      {/* Right Side: User Profile / Menu */}
      <div className="flex items-center gap-3">
        <UserMenu />
      </div>
        
    </div>
  );
}