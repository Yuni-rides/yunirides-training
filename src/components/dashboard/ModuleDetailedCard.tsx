"use client";

import { cn } from "@/lib/utils";

interface ModuleProps {
  moduleNumber: string;
  title: string;
  description: string;
  buttonText: string;
  buttonVariant: "primary" | "secondary" | "outline";
  src: string;
  onClick?: () => void;
 
}

export default function ModuleDetailedCard({
  moduleNumber,
  title,
  description,
  buttonText,
  buttonVariant,
  src,
  onClick, // <--- Destructure onClick here
  
}: ModuleProps) {
  return (
    <div className="bg-white rounded-2xl border border-[#e8eaf6] overflow-hidden flex items-stretch shadow-sm w-full">
   
   {/* ── LEFT: Purple tinted image ── */}
<div
  className="flex-shrink-0 relative overflow-hidden rounded-xl"
  style={{ width: "160px", minHeight: "180px" }}
>
  <div
    className="absolute inset-0 z-10"
    style={{ background: "#822C89", opacity: 0.50 }}
  />
  <img
    src={src}
    alt={moduleNumber}
    className="w-full h-full object-cover"
  />
</div>

      {/* ── RIGHT: Content ── */}
      <div className="flex-1 flex flex-col justify-between px-5 py-4">
        <div className="flex flex-col gap-1.5">
          {/* Module number */}
          <h3 className="text-[13px] font-bold text-[#822C89]">
            {moduleNumber}
          </h3>
          {/* Title */}
          <h4 className="text-[12px] font-semibold text-[#822C89]">
            {title}
          </h4>
          {/* Description */}
          <p className="text-[11px] text-[#6B7280] leading-relaxed line-clamp-3">
            {description}
          </p>
        </div>

        {/* ── Button ── */}
        <button
        onClick={onClick}
          className={cn(
            "w-full py-2.5 rounded-xl text-[12px] font-semibold transition mt-3",
            buttonVariant === "primary"
              ? "bg-[#822C89] hover:bg-[#6e2474] text-white"
              : "bg-transparent text-[#9CA3AF] hover:bg-[#EFF2FF] border border-[#e8eaf6]"
          )}
        >
          {buttonText}
        </button>
      </div>

    </div>
  );
}