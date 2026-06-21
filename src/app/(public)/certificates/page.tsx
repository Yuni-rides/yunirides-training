"use client";
export const dynamic = "force-dynamic";

import CertificatesHeader from "@/components/certificates/certificatesHeader";
import CertificatesPage from "@/components/certificates/certificatesPage";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen bg-white w-full overflow-y-auto px-10 pt-6 pb-10">
      <CertificatesHeader />

      <div className="mt-10">
        <CertificatesPage />
      </div>
    </div>
  );
}
