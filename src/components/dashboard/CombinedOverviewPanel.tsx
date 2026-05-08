"use client";

import { useState } from "react";
import DonutChart from "@/components/charts/DonutChart";

const modules = [
  {
    label: "Module 1 (Categories)",
    pct: 63,
    color: "#822C89",
    categories: [
      {
        icon: "🧪",
        name: "Category A: Foundation",
        description: "Description for fonditive of Foundation",
        progress: 75,
        color: "#822C89",
      },
      {
        icon: "💼",
        name: "Category B: Implementation",
        description: "Description for avat Implementation",
        progress: 55,
        color: "#822C89",
      },
      {
        icon: "📋",
        name: "Category C: Assessment",
        description: "Description for progress: Assessment",
        progress: 40,
        color: "#822C89",
      },
    ],
  },
  {
    label: "Module 2",
    pct: 22,
    color: "#2D4A8F",
    categories: [
      {
        icon: "🎓",
        name: "Category D: Advanced Study",
        description: "Description that Advanced Study",
        progress: 22,
        color: "#2D4A8F",
      },
    ],
  },
];

const overallScore = 22;
const certPct = 30;
const certEarned = 3;
const certTotal = 10;
const dateRange = "From 4-10 Sep, 2025";

export default function CombinedOverviewOverall() {
  const [expanded, setExpanded] = useState<{ [key: number]: boolean }>({
    0: true,
    1: true,
  });

  const toggle = (idx: number) =>
    setExpanded((prev) => ({ ...prev, [idx]: !prev[idx] }));

  return (
    <div
      className="rounded-3xl p-5 flex flex-col gap-4 w-full h-fit sticky top-4"
      style={{ background: "#F0F2FF" }}
    >
      {/* ── Title + date OUTSIDE inner card ── */}
      <div>
        <h2 className="text-[17px] font-bold text-[#1E1B4B]">Overall Overview</h2>
        <p className="text-[11px] text-[#1E1B4B] mt-0.5">{dateRange}</p>
      </div>

      {/* ── INNER CARD ── */}
      <div
        className="rounded-2xl p-4 flex flex-col gap-4"
        style={{ background: "#DDE1F5" }}
      >
        {/* Donut chart — correct score 42.5 */}
        <div className="relative w-fit mx-auto">
          <DonutChart
            score={overallScore}
            size={170}
            strokeWidth={20}
            color="#2D4A8F"
            bgColor="#C8CDD8"
          />
          {/* Center label — positioned absolutely over SVG */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <span className="text-[22px] font-bold text-[#1E1B4B]">
              {overallScore}
              <span className="text-[13px] font-semibold text-[#6B7280]">%</span>
            </span>
          </div>
        </div>

        {/* Divider line */}
        <div style={{ borderTop: "1px solid #C0C5DC" }} />

        {/* ── Module 1 + Module 2 SIDE BY SIDE ── */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-0">
          {modules.map((mod, idx) => (
            <div key={mod.label} className="flex flex-col gap-2">

              {/* Module header row — vertical bar + label + chevron */}
              <button
                onClick={() => toggle(idx)}
                className="flex items-start gap-1.5 w-full text-left"
              >
                {/* Vertical color bar */}
                <div
                  style={{
                    width: "3px",
                    minHeight: "32px",
                    borderRadius: "99px",
                    background: mod.color,
                    flexShrink: 0,
                    marginTop: "2px",
                  }}
                />
                <div className="flex-1 min-w-0">
                  <div className="text-[10.5px] font-semibold text-[#1E1B4B] leading-tight">
                    {mod.label}
                  </div>
                  <div
                    className="text-[13px] font-bold leading-tight"
                    style={{ color: mod.color }}
                  >
                    {mod.pct}%
                  </div>
                </div>
                <span
                  className="text-[10px] text-[#9CA3AF] flex-shrink-0"
                  style={{
                    display: "inline-block",
                    transition: "transform 0.2s",
                    transform: expanded[idx] ? "rotate(180deg)" : "rotate(0deg)",
                    marginTop: "4px",
                  }}
                >
                  ▾
                </span>
              </button>

              {/* Categories — shown when expanded */}
              {expanded[idx] && (
                <div className="flex flex-col gap-3">
                  {mod.categories.map((cat) => (
                    <div key={cat.name} className="flex flex-col gap-1.5">

                      {/* Icon + name + description */}
                      <div className="flex items-center gap-1.5">
                        <div
                          className="w-6 h-6 rounded-md flex items-center justify-center text-[11px] flex-shrink-0"
                          style={{ background: cat.color }}
                        >
                          {cat.icon}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-[9.5px] font-semibold text-[#1E1B4B] leading-tight">
                            {cat.name}
                          </div>
                          <div className="text-[8px] text-[#1E1B4B] leading-tight">
                            {cat.description}
                          </div>
                        </div>
                      </div>

                      {/* Progress bar — FULL width, visible */}
                      <div
                        style={{
                          height: "4px",
                          background: "#C0C5DC",
                          borderRadius: "99px",
                          overflow: "hidden",
                          width: "100%",
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            width: `${cat.progress}%`,
                            background: cat.color,
                            borderRadius: "99px",
                          }}
                        />
                      </div>

                    </div>
                  ))}
                </div>
              )}

            </div>
          ))}
        </div>
      </div>

      {/* ── CERTIFICATE COMPLETION — outside inner card ── */}
      <div className="flex flex-col gap-2">
        <h3 className="text-[15px] font-bold text-[#1E1B4B]">Certificate Completion</h3>
        <p className="text-[11px] text-[#1E1B4B]">Certificate Completion Ratio</p>

        {/* Teal gradient bar */}
        <div
          style={{
            position: "relative",
            height: "28px",
            background: "#D1D5DB",
            borderRadius: "99px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${certPct}%`,
              background: "linear-gradient(90deg, #06B6A8, #10D9CA)",
              borderRadius: "99px",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              paddingRight: "10px",
              transition: "width 0.7s ease",
            }}
          >
            <span style={{ color: "white", fontSize: "11px", fontWeight: "700" }}>
              {certPct}%
            </span>
          </div>
        </div>

        <div
          style={{
            fontSize: "10px",
            color: "#1E1B4B",
            textAlign: "right",
          }}
        >
          {certEarned}/{certTotal} Certificates Earned
        </div>
      </div>

    </div>
  );
}
