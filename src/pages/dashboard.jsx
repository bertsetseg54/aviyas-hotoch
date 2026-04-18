"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const menuItems = [
    { title: "Танилцуулга", desc: "Сургуулийн мэдээлэл засах", icon: "🏢", link: "/crud/introduction", color: "bg-blue-50 text-blue-600" },
    { title: "Цайны газар", desc: "Хоолны цэс шинэчлэх", icon: "🍱", link: "/food", color: "bg-orange-50 text-orange-600" },
    { title: "Үйл ажиллагаа", desc: "Календарь болон төлөвлөгөө", icon: "🗓️", link: "/event", color: "bg-purple-50 text-purple-600" },
    { title: "Хуваарь", desc: "Хичээлийн цагийн хуваарь", icon: "⏱️", link: "/schedule", color: "bg-emerald-50 text-emerald-600" },
    { title: "Хүсэлтүүд", desc: "Ирсэн санал гомдол", icon: "📩", link: "/feedback", color: "bg-rose-50 text-rose-600" },
    { title: "Хэрэглэгчид", desc: "Системийн эрх удирдах", icon: "👥", link: "/users", color: "bg-slate-50 text-slate-600" },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 md:p-12 pt-28">
      <div className="max-w-7xl mx-auto">
        
        {/* Welcome Section */}
        <div className="mb-10">
          <h1 className="text-2xl font-black uppercase tracking-tighter text-slate-900">
            Сайн байна уу, {user?.username || "Ажилтан"}?
          </h1>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-2">
            Сургуулийн удирдлагын нэгдсэн систем
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { label: "Нийт хандалт", val: "1,240", change: "+12%" },
            { label: "Шинэ хүсэлт", val: "14", change: "Шинэ" },
            { label: "Өнөөдрийн хоол", val: "Тефтель", change: "Цэс" }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</span>
              <div className="flex justify-between items-end mt-2">
                <span className="text-2xl font-black text-slate-900 tracking-tighter">{stat.val}</span>
                <span className="text-[9px] font-black px-2 py-1 bg-blue-50 text-blue-600 rounded-lg uppercase">{stat.change}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Action Grid */}
        <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-6 ml-2">Үндсэн удирдлага</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item, idx) => (
            <Link href={item.link} key={idx}>
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 group cursor-pointer h-full flex flex-col items-start">
                <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-2">
                  {item.title}
                </h3>
                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wide leading-relaxed">
                  {item.desc}
                </p>
                <div className="mt-auto pt-6 flex items-center gap-2 text-[9px] font-black text-blue-600 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  Удирдах 
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer info */}
        <div className="mt-16 text-center">
          <div className="inline-block px-6 py-2 bg-slate-100 rounded-full">
            <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.3em]">Системийн хувилбар v2.0.1</p>
          </div>
        </div>

      </div>
    </div>
  );
}