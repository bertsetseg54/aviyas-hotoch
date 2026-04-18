import AdminMendchilgee from "@/components/AdminMendchilgee";
import AdminProud from "@/components/AdminProud";
import AdminNamtar from "@/components/AdminNamtar"; // Шинэ компонентоо импортлох
import AdminNav from "@/components/AdminNav";
import { useState } from "react";
import Namtar from "@/components/Namtar";
import AdminStaff from "@/components/AdminStaff";

export default function AdminIntroduction() {
  const [activeTab, setActiveTab] = useState("mendchilgee");

  const tabs = [
    { id: "mendchilgee", label: "Мэндчилгээ засах" },
    { id: "baharhal", label: "Бахархал засах" },
    { id: "namtar", label: "Замнал засах" },
    { id: "taniltsuulga", label: "Ажилчид засах" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      <AdminNav />

      <div className="max-w-7xl mx-auto px-4">
        {/* Багшийн Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 bg-white p-2 rounded-2xl shadow-sm border border-slate-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                px-6 py-3 text-[10px] md:text-xs font-black uppercase tracking-widest transition-all duration-300 rounded-xl
                ${activeTab === tab.id 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-200" 
                  : "text-slate-500 hover:bg-slate-100"}
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Section */}
        <div className="transition-all duration-500">
          {/* 1. Мэндчилгээ */}
          {activeTab === "mendchilgee" && <AdminMendchilgee />}
          
          {/* 2. Бахархал */}
          {activeTab === "baharhal" && <AdminProud />}
          
          {/* 3. Замнал - Одоо ажилладаг боллоо */}
          {activeTab === "namtar" && <Namtar />}

          {/* 4. Ажилчид - Түр хүлээгдэж байна */}
          {activeTab === "taniltsuulga" && <AdminStaff />}
        </div>
      </div>
    </div>
  );
}