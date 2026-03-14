import { useState } from "react";

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const DAYS = ["Su","Mo","Tu","We","Th","Fr","Sa"];

const MiniCalendar = ({ events, onDayClick }) => {
  const today = new Date();
  const [cur, setCur] = useState({ m: today.getMonth(), y: today.getFullYear() });
  const [sel, setSel] = useState(today.getDate());

  const firstDay    = new Date(cur.y, cur.m, 1).getDay();
  const daysInMonth = new Date(cur.y, cur.m + 1, 0).getDate();
  const cells = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const prev = () => setCur((c) => c.m === 0 ? { m: 11, y: c.y - 1 } : { m: c.m - 1, y: c.y });
  const next = () => setCur((c) => c.m === 11 ? { m: 0, y: c.y + 1 } : { m: c.m + 1, y: c.y });

  const makeKey = (day) =>
    `${cur.y}-${String(cur.m + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  const hasEvent = (day) => {
    if (!day) return false;
    return events?.[makeKey(day)]?.length > 0;
  };

  const handleClick = (day) => {
    if (!day) return;
    setSel(day);
    onDayClick?.(makeKey(day), day);
  };

  return (
    <div className="select-none">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={prev}
          className="text-orange-500 text-xl px-2 py-0.5 rounded hover:bg-orange-50 transition-colors border-none bg-transparent cursor-pointer"
        >
          ‹
        </button>
        <span className="font-bold text-sm text-gray-800" style={{ fontFamily: "'Sora', sans-serif" }}>
          {MONTHS[cur.m]} {cur.y}
        </span>
        <button
          onClick={next}
          className="text-orange-500 text-xl px-2 py-0.5 rounded hover:bg-orange-50 transition-colors border-none bg-transparent cursor-pointer"
        >
          ›
        </button>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 gap-0.5 mb-1">
        {DAYS.map((d) => (
          <div key={d} className="text-center text-xs font-bold text-gray-400 py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Date cells */}
      <div className="grid grid-cols-7 gap-0.5">
        {cells.map((day, i) => {
          const isToday = day === today.getDate() && cur.m === today.getMonth() && cur.y === today.getFullYear();
          const isSel   = day === sel;
          const dot     = hasEvent(day);

          return (
            <div
              key={i}
              onClick={() => handleClick(day)}
              className={`text-center text-xs rounded-lg pb-0.5 pt-1 transition-all
                ${day ? "cursor-pointer" : "cursor-default"}
                ${isSel   ? "bg-orange-500 text-white font-bold"
                  : isToday ? "bg-orange-100 text-orange-600 font-semibold"
                  : day    ? "text-gray-700 hover:bg-orange-50"
                  : "invisible"}`}
            >
              {day || ""}
              {dot
                ? <div className={`w-1.5 h-1.5 rounded-full mx-auto mt-0.5 ${isSel ? "bg-white" : "bg-orange-500"}`} />
                : <div className="h-2" />
              }
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MiniCalendar;