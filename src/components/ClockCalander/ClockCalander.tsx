"use client";
import React, { useState, useEffect } from "react";

export default function ClockCalendar() {
  const [date, setDate] = useState(new Date());

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Calendar Logic
  const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Format Time Strings
  const timeString = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  }).split(" "); // Split "10:30" and "AM"

  const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
  const fullDate = date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  return (
    <div className="flex flex-col gap-6 w-full max-w-sm mx-auto justify-center items-center">

      {/* ⏰ CLOCK CARD */}
      <div className="relative overflow-hidden rounded-3xl p-6 text-white shadow-2xl transition-all hover:scale-[1.02] duration-300 group">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-linear-to-br from-indigo-600 via-purple-600 to-blue-500 animate-gradient-xy"></div>
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>

        {/* Decorative Circles */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/20 rounded-full blur-2xl group-hover:bg-white/30 transition-all"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl"></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full">
          <h3 className="text-lg font-medium tracking-widest uppercase opacity-80">{dayName}</h3>

          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-6xl font-black tracking-tighter drop-shadow-md">
              {timeString[0]}
            </span>
            <span className="text-xl font-bold text-indigo-200">
              {timeString[1]}
            </span>
          </div>

          <div className="mt-4 flex items-center gap-2 bg-white/20 px-4 py-1.5 rounded-full backdrop-blur-md border border-white/10">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]"></div>
            <span className="text-sm font-semibold">{fullDate}</span>
          </div>
        </div>
      </div>

      {/* 📅 CALENDAR CARD */}
      <div className="bg-white/80 dark:bg-[#161f2b]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
            {date.toLocaleDateString("en-US", { month: "long" })} <span className="text-indigo-600 dark:text-indigo-400">{date.getFullYear()}</span>
          </h2>
        </div>

        <div className="grid grid-cols-7 text-center gap-2">
          {/* Weekday Headers */}
          {weekDays.map((day) => (
            <div key={day} className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
              {day}
            </div>
          ))}

          {/* Empty slots for start of month */}
          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}

          {/* Days */}
          {days.map((day) => {
            const isToday = day === date.getDate();
            return (
              <div
                key={day}
                className={`
                  aspect-square flex items-center justify-center rounded-xl text-sm font-semibold transition-all duration-300 cursor-default
                  ${isToday
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/40 scale-110"
                    : "text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-500/20 hover:text-indigo-600 dark:hover:text-indigo-300"
                  }
                `}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}