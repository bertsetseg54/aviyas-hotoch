"use client";

import React, { useState, useEffect } from "react";

export default function SchoolCalendarCards() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState("all");

  useEffect(() => {
    fetch("/api/event")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data || []);
        setLoading(false);
      });
  }, []);

  // Саруудын нэрс
  const monthNames = [
    "Нэгдүгээр сар", "Хоёрдугаар сар", "Гуравдугаар сар", "Дөрөвдүгээр сар",
    "Тавдугаар сар", "Зургаадугаар сар", "Долоодугаар сар", "Наймдугаар сар",
    "Есдүгээр сар", "Аравдугаар сар", "Арван нэгдүгээр сар", "Арван хоёрдугаар сар"
  ];

  // Датаг сараар бүлэглэх функц
  const groupedEvents = events.reduce((acc, event) => {
    const monthIndex = new Date(event.date).getMonth();
    if (!acc[monthIndex]) acc[monthIndex] = [];
    acc[monthIndex].push(event);
    return acc;
  }, {});

  // Шүүлтүүр хийх
  const displayedMonths = selectedMonth === "all" 
    ? Object.keys(groupedEvents).sort((a, b) => a - b)
    : [selectedMonth];

  if (loading) return <div className="text-center py-20 text-slate-400 font-black uppercase text-xs animate-pulse">Уншиж байна...</div>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Filter Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4 bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
        <div>
          <h2 className="text-xl font-black uppercase text-slate-900 tracking-tighter">Сургуулийн календарь</h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Нийт {events.length} үйл ажиллагаа бүртгэгдсэн</p>
        </div>
        
        <select 
          value={selectedMonth} 
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="bg-slate-50 border-none outline-none p-4 rounded-2xl font-bold text-xs uppercase tracking-widest cursor-pointer text-slate-600 focus:ring-2 ring-indigo-100 transition-all"
        >
          <option value="all">Бүх сараар харах</option>
          {Object.keys(groupedEvents).map(mIdx => (
            <option key={mIdx} value={mIdx}>{monthNames[mIdx]}</option>
          ))}
        </select>
      </div>

      {/* Calendar Grid */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {displayedMonths.map((mIdx) => (
          <div
            key={mIdx}
            className="bg-white rounded-[2.5rem] border border-slate-100 flex flex-col h-[550px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group"
          >
            {/* Month Header */}
            <div className="bg-slate-900 p-6 text-white text-center">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-50 block mb-1">Сарын хуваарь</span>
              <h3 className="font-black text-lg uppercase tracking-tighter">{monthNames[mIdx]}</h3>
            </div>

            {/* Events List */}
            <div className="p-4 flex-1 overflow-y-auto space-y-4 scrollbar-hide">
              {groupedEvents[mIdx]?.map((event) => (
                <div
                  key={event._id}
                  className="bg-slate-50/50 rounded-3xl p-5 border border-transparent hover:border-indigo-100 hover:bg-white transition-all group/card"
                >
                  {event.imageUrl && (
                    <img src={event.imageUrl} className="w-full h-32 object-cover rounded-2xl mb-4 shadow-sm" alt="" />
                  )}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-indigo-600 text-white text-[8px] font-black px-2 py-1 rounded-md uppercase">
                      {new Date(event.date).getDate()}-ны өдөр
                    </span>
                  </div>
                  <h4 className="font-black text-slate-800 text-sm leading-tight mb-2 group-hover/card:text-indigo-600 transition-colors">
                    {event.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 font-medium leading-relaxed mb-3">
                    {event.purpose}
                  </p>
                  {event.description && (
                    <div className="pt-3 border-t border-slate-100 mt-2">
                      <p className="text-[10px] text-slate-400 italic">
                        {event.description}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {events.length === 0 && (
        <div className="text-center py-40">
          <p className="text-slate-300 font-black uppercase text-xs tracking-[0.2em]">Одоогоор үйл ажиллагаа бүртгэгдээгүй байна</p>
        </div>
      )}
    </div>
  );
}