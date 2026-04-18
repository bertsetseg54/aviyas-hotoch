"use client";

import React, { useState, useEffect } from "react";

export default function Event() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState("all");

  useEffect(() => {
    fetch("/api/event")
      .then((res) => res.json())
      .then((data) => {
        const sortedData = (data || []).sort((a, b) => new Date(a.date) - new Date(b.date));
        setEvents(sortedData);
        setLoading(false);
      });
  }, []);

  const monthNames = [
    "1-р сар", "2-р сар", "3-р сар", "4-р сар", "5-р сар", "6-р сар",
    "7-р сар", "8-р сар", "9-р сар", "10-р сар", "11-р сар", "12-р сар"
  ];

  const filteredEvents = selectedMonth === "all" 
    ? events 
    : events.filter(event => new Date(event.date).getMonth() === parseInt(selectedMonth));

  if (loading) return <div className="p-10 text-[10px] font-black uppercase tracking-widest text-slate-400">Уншиж байна...</div>;

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 md:p-12"> {/* Суурь фоныг бага зэрэг саарал болгож картыг ялгаруулсан */}
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-xl font-black uppercase tracking-tighter text-slate-900">Сургуулийн төлөвлөгөө</h1>
          <select 
            value={selectedMonth} 
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="bg-white border border-slate-200 px-4 py-2 rounded-xl font-black text-[10px] uppercase cursor-pointer shadow-sm outline-none"
          >
            <option value="all">Бүх сар</option>
            {monthNames.map((name, idx) => (
              <option key={idx} value={idx}>{name}</option>
            ))}
          </select>
        </div>

        {/* Grid - Картууд энд байна */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => {
              const date = new Date(event.date);
              return (
                <div 
                  key={event._id} 
                  className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:border-slate-300 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Огноо - Текстээр, маш цэвэрхэн */}
                    <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-4">
                      {date.getFullYear()} / {date.getMonth() + 1} / {date.getDate()}
                    </div>
                    
                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-tight leading-snug mb-3 group-hover:text-slate-900">
                      {event.title}
                    </h3>

                    {event.purpose && (
                      <p className="text-[11px] text-slate-500 font-medium leading-relaxed line-clamp-2">
                        {event.purpose}
                      </p>
                    )}
                  </div>

                  {event.description && (
                    <div className="mt-4 pt-4 border-t border-slate-50">
                      <p className="text-[10px] text-slate-400 italic line-clamp-1">
                        {event.description}
                      </p>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="col-span-full py-20 text-center bg-white rounded-[2.5rem] border border-slate-100 shadow-sm">
               <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Мэдээлэл олдсонгүй.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}