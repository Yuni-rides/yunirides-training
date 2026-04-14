const DAYS = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];

interface CalDay {
  d: number;
  other?: boolean;
  today?: boolean;
  sun?: boolean;
}

const weeks: CalDay[][] = [
  [{ d: 26, other: true }, { d: 27, other: true }, { d: 28, other: true }, { d: 29, other: true }, { d: 30, other: true }, { d: 31, other: true }, { d: 1, other: true, sun: true }],
  [{ d: 2 }, { d: 3 }, { d: 4 }, { d: 5 }, { d: 6 }, { d: 7 }, { d: 8, sun: true }],
  [{ d: 9 }, { d: 10 }, { d: 11 }, { d: 12 }, { d: 13 }, { d: 14 }, { d: 15, sun: true }],
  [{ d: 16 }, { d: 17 }, { d: 18 }, { d: 19 }, { d: 20 }, { d: 21 }, { d: 22, sun: true }],
  [{ d: 23 }, { d: 24, today: true }, { d: 25 }, { d: 26 }, { d: 27 }, { d: 28 }, { d: 29, sun: true }],
  [{ d: 30 }, { d: 1, other: true }, { d: 2, other: true }, { d: 3, other: true }, { d: 4, other: true }, { d: 5, other: true }, { d: 6, other: true, sun: true }],
];

export default function CalendarCard() {
  return (
    <div className="bg-[#EFF2FF] rounded-2xl p-4 border border-gray-100 w-[280px]">
      {/* Header */}
      <div className="bg-[#2d2d7a] rounded-xl flex items-center justify-between px-3 py-2 mb-4">
        <button className="w-7 h-7 bg-white/20 rounded-md text-white flex items-center justify-center text-sm">‹</button>
        <span className="text-white text-sm font-medium">March 2026</span>
        <button className="w-7 h-7 bg-white/20 rounded-md text-white flex items-center justify-center text-sm">›</button>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 text-center mb-1">
        {DAYS.map((d) => (
          <div key={d} className={`text-[11px] font-medium pb-1 ${d === "SU" ? "text-red-500" : "text-gray-400"}`}>{d}</div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-y-1">
        {weeks.flat().map((cell, i) => (
          <div
            key={i}
            className={`text-center text-[12px] py-1 rounded-md font-medium
              ${cell.today ? "bg-[#2d2d7a] text-white" : ""}
              ${cell.other ? "text-gray-300" : ""}
              ${cell.sun && !cell.today && !cell.other ? "text-red-500" : ""}
              ${!cell.today && !cell.other && !cell.sun ? "text-[#1e1b4b]" : ""}
            `}
          >
            {String(cell.d).padStart(2, "0")}
          </div>
        ))}
      </div>
    </div>
  );
}