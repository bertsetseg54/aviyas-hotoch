"use client";

import React from "react";
import { useCalendar } from "../../context/CalenderContext";

export default function SchoolCalendarCards() {
  const { calendar } = useCalendar();

  return (
    <div className="p-5 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {calendar.map((month) => (
        <div
          key={month.month}
          className="bg-white rounded-xl shadow-md border border-gray-200 flex flex-col h-[480px] hover:shadow-lg transition-shadow duration-200"
        >
          {/* Month Header */}
          <div className="bg-indigo-100 text-[black] p-4 rounded-t-xl font-semibold text-lg">
            {month.name}
          </div>

          {/* Events List */}
          <div className="p-4 flex-1 flex flex-col gap-3 overflow-auto scroll-smooth">
            {month.events.map((event, idx) => (
              <div
                key={event.id || idx}
                className="bg-indigo-50 rounded-lg p-3 border border-indigo-100 flex flex-col"
              >
                <h3 className="font-medium text-gray-800">{event.title}</h3>
                <p className="text-xs text-gray-500 mt-1">
                  {event.start} - {event.end}
                </p>
                <p className="text-sm mt-2 text-gray-700">
                  {event.description}
                </p>
                {event.responsible && event.responsible.length > 0 && (
                  <p className="text-xs mt-1 italic text-gray-500">
                    Хариуцсан: {event.responsible.join(", ")}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
