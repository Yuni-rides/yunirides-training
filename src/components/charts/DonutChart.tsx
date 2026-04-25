"use client";

interface DonutChartProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  bgColor?: string;
}

export default function DonutChart({
  score,
  size = 180,
  strokeWidth = 20,
  color = "#2D4A8F",
  bgColor = "#D1D5DB",
}: DonutChartProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const center = size / 2;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ transform: "rotate(-90deg)" }}
    >
      {/* Background ring */}
      <circle
        cx={center} cy={center} r={radius}
        fill="none" stroke={bgColor} strokeWidth={strokeWidth}
      />
      {/* Progress ring */}
      <circle
        cx={center} cy={center} r={radius}
        fill="none" stroke={color} strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        style={{ transition: "stroke-dashoffset 1s ease" }}
      />
    </svg>
  );
}