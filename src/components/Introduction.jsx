import { useState } from "react";
import Aviyasinbaharhal from "./Aviyasinbaharhal";
import Mendchilgee from "./Mendchilgee";
import Namtar from "./Namtar";
import Information from "./Information";

export default function Introduction() {
  const [medeelel, setMedeelel] = useState("zmendchilgee");

  // Товчнуудын датаг массив болгож авснаар код илүү цэгцтэй болно
  const tabs = [
    { id: "zmendchilgee", label: "МЭНДЧИЛГЭЭ" },
    { id: "baharhal", label: "АВЬЯАСЫН БАХАРХАЛ" },
    { id: "namtar", label: "СУРГУУЛИЙН ЗАМНАЛ" },
    { id: "taniltsuulga", label: "АЖИЛЧДЫН МЭДЭЭЛЭЛ" },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-2 py-8">
      {/* Tab Navigation */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-10 border-b border-gray-200 pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setMedeelel(tab.id)}
            className={`
              relative px-6 py-3 text-sm font-bold transition-all duration-300 ease-in-out
              ${medeelel === tab.id 
                ? "text-blue-600 border-b-2 border-blue-600" 
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-t-lg"}
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Section - Зөөлөн эффекттэй харагдуулах */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10 min-h-[400px] transition-all duration-500">
        {medeelel === "zmendchilgee" && <Mendchilgee />}
        {medeelel === "baharhal" && <Aviyasinbaharhal />}
        {medeelel === "namtar" && <Namtar />}
        {medeelel === "taniltsuulga" && <Information />}
      </div>
    </div>
  );
}