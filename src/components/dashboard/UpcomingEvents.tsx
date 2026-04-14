const events = [
  {
    id: 1,
    month: "MAR",
    day: "28",
    title: "Special needs safety Training",
    desc: "Driver training session for assisting children with special needs.",
    meta: [
      { type: "time", label: "10AM – 11:30AM" },
      { type: "online", label: "Online training" },
    ],
  },
  {
    id: 2,
    month: "APR",
    day: "01",
    title: "Vehicle safety inspection reminder",
    desc: "Driver training session for assisting children with special needs.",
    meta: [
      { type: "deadline", label: "Deadline 5:00AM" },
      { type: "link", label: "View checklist" },
    ],
  },
];

export default function UpcomingEvents() {
  return (
    <div className="bg-[#EFF2FF] rounded-2xl p-4 border border-gray-100 w-[280px]">
      <h3 className="text-[15px] font-medium text-[#1e1b4b] mb-3">Upcoming events</h3>

      <div className="space-y-3">
        {events.map((ev) => (
          <div key={ev.id} className="flex gap-3 bg-white rounded-xl p-3">
            {/* Date badge */}
            <div className="bg-[#2d2d7a] rounded-lg w-11 min-w-[44px] flex flex-col items-center justify-center py-2">
              <span className="text-[10px] text-indigo-300 uppercase tracking-wide font-medium">{ev.month}</span>
              <span className="text-xl text-white font-medium leading-none">{ev.day}</span>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium text-[#1e1b4b] mb-1 leading-snug">{ev.title}</p>
              <p className="text-[11px] text-gray-400 mb-2 leading-snug">{ev.desc}</p>

              <div className="flex items-center gap-2 flex-wrap">
                {ev.meta.map((m, i) => (
                  m.type === "link" ? (
                    <a key={i} href="#" className="text-[11px] text-[#2d2d7a] font-medium">{m.label}</a>
                  ) : m.type === "deadline" ? (
                    <span key={i} className="flex items-center gap-1 text-[11px] text-gray-500">
                      <span className="w-2 h-2 rounded-full bg-orange-400 inline-block" />
                      {m.label}
                    </span>
                  ) : (
                    <span key={i} className="flex items-center gap-1 text-[11px] text-gray-500 bg-white border border-gray-200 rounded-full px-2 py-0.5">
                      {m.label}
                    </span>
                  )
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}