"use client";

import { useState, useEffect, useRef } from "react";
import { Search, ChevronDown, Download, AlertCircle } from "lucide-react";
import Loader from "@/components/ui/Loader";
import { useCourseStore } from "@/features/courses/course.store";

function CertificateCard({
  title,
  date,
  url,
}: {
  title: string;
  date: string;
  url: string;
}) {
  const handleDownload = () => {
    if (!url) return;
    const bucketUrl = process.env.NEXT_PUBLIC_S3_BUCKET_URL || "";
    const cleanedBucketUrl = bucketUrl.endsWith("/")
      ? bucketUrl.slice(0, -1)
      : bucketUrl;
    const cleanedRawUrl = url.startsWith("/") ? url : `/${url}`;
    const fullUrl = url.startsWith("http")
      ? url
      : `${cleanedBucketUrl}${cleanedRawUrl}`;

    window.open(fullUrl, "_blank");
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all">
      <div className="flex items-center justify-between px-3 pt-3 pb-1">
        <span className="bg-[#22C55E] text-white text-[10px] font-bold px-3 py-1 rounded-full">
          Completed
        </span>
        <button
          onClick={handleDownload}
          className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-[#EFF2FF] transition cursor-pointer"
        >
          <Download size={13} className="text-gray-400" />
        </button>
      </div>

      <div className="flex flex-col items-center justify-center px-4 py-5 mx-3 mb-3 rounded-xl bg-[#FAFBFF] border border-gray-100">
        <img
          src="/images/logo.png"
          alt="Yuni Rides"
          className="h-10 object-contain mb-4"
        />
        <div className="w-full border-t border-dashed border-gray-200 mb-3" />
        <p className="text-[12px] font-semibold text-[#1E1B4B] text-center leading-snug mb-1">
          {title}
        </p>
        <p className="text-[11px] text-gray-400">{date}</p>
      </div>
    </div>
  );
}

export default function CertificatesPage() {
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<{
    label: string;
    id: string | undefined;
  }>({
    label: "ALL Certificates",
    id: undefined,
  });
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const {
    certificates,
    certificatesLoading: loading,
    modules,
    error,
    fetchModules,
    fetchDriverCertificates,
  } = useCourseStore();

  useEffect(() => {
    fetchModules();
  }, [fetchModules]);

  useEffect(() => {
    fetchDriverCertificates(selectedFilter.id);
  }, [selectedFilter, fetchDriverCertificates]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filterOptions = [
    { label: "ALL Certificates", id: undefined },
    ...modules.map((m) => ({ label: m.title, id: m.id })),
  ];

  const filtered = certificates.filter(
    (c) =>
      c.category?.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.certificateCode?.toLowerCase().includes(search.toLowerCase()),
  );

  const handleDownloadAll = () => {
    filtered.forEach((cert) => {
      if (cert.certificateUrl) {
        const bucketUrl = process.env.NEXT_PUBLIC_S3_BUCKET_URL || "";
        const cleanedBucketUrl = bucketUrl.endsWith("/")
          ? bucketUrl.slice(0, -1)
          : bucketUrl;
        const cleanedRawUrl = cert.certificateUrl.startsWith("/")
          ? cert.certificateUrl
          : `/${cert.certificateUrl}`;
        const fullUrl = cert.certificateUrl.startsWith("http")
          ? cert.certificateUrl
          : `${cleanedBucketUrl}${cleanedRawUrl}`;
        window.open(fullUrl, "_blank");
      }
    });
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 relative">
      {loading && <Loader />}

      <div className="px-8 pb-10 overflow-y-auto flex-1">
        <div className="flex items-center gap-3 mb-8 flex-wrap pt-6">
          <p className="text-[13px] text-gray-500">
            View and download all your completed certificates.
          </p>

          <div className="ml-auto flex items-center gap-3 relative">
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 text-[12px] px-4 py-2 border border-gray-200 rounded-xl bg-white text-gray-600 shadow-sm hover:bg-[#EFF2FF] transition cursor-pointer"
              >
                🎖 {selectedFilter.label}
                <ChevronDown
                  size={13}
                  className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-100 rounded-xl shadow-lg py-1 z-50 animate-in fade-in slide-in-from-top-1 duration-200">
                  {filterOptions.map((option) => (
                    <button
                      key={option.label}
                      onClick={() => {
                        setSelectedFilter(option);
                        setIsOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-[12px] transition-colors cursor-pointer
                        ${
                          selectedFilter.label === option.label
                            ? "bg-[#EFF2FF] text-[#1E1B4B] font-bold"
                            : "text-gray-600 hover:bg-slate-50"
                        }`}
                    >
                      {option.label === "ALL Certificates"
                        ? "🎖 ALL Certificates"
                        : option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={handleDownloadAll}
              disabled={filtered.length === 0}
              className="flex items-center gap-2 bg-[#822C89] hover:bg-[#6e2474] text-white text-[12px] font-semibold px-5 py-2.5 rounded-xl transition cursor-pointer disabled:opacity-50"
            >
              Download All
              <Download size={14} />
            </button>
          </div>
        </div>

        {error && (
          <div className="p-4 max-w-xl mx-auto mb-6 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-red-800 text-xs">
                Failed to load certificates
              </h3>
              <p className="text-[11px] text-red-600 mt-0.5">{error}</p>
            </div>
          </div>
        )}

        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((cert) => (
              <CertificateCard
                key={cert.id}
                title={cert.category?.name || "Training Certificate"}
                date={formatDate(cert.issuedAt)}
                url={cert.certificateUrl}
              />
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-20 text-gray-400 text-sm">
            No certificates found.
          </div>
        )}
      </div>
    </div>
  );
}
