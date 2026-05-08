'use client';

import CertificatesHeader from "@/components/certificates/certificatesHeader";
import CertificatesPage from "@/components/certificates/certificatesPage";

export default function Page() {
  return (
    /* Changed bg-white to bg-[#F8FAFC] (the soft dashboard gray) 
       Increased the px-10 to match the wider margins of your dashboard screenshot
    */
    <div className="flex flex-col min-h-screen bg-white w-full overflow-y-auto px-10 pt-6 pb-10">
      
      {/* The Header now has the blue background from the component above */}
      <CertificatesHeader />

      {/* Spacing between Header and the Grid below */}
      <div className="mt-10">
        <CertificatesPage />
      </div>
      
    </div>
  );
}