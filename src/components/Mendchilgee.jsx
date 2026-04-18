import { useEffect, useState } from "react";

export default function Mendchilgee() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/introduction/mendchilgee")
      .then((res) => res.json())
      .then((val) => setData(val));
  }, []);

  if (!data) return <div className="h-64 animate-pulse bg-slate-50 rounded-3xl" />;

  return (
    <div className="max-w-6xl mx-auto px-2 py-4">
      <div className="flex flex-col md:flex-row items-start gap-6">
        <div className="w-full md:w-1/3 flex flex-col items-center">
          <div className="relative w-56 h-72 rounded-xl overflow-hidden shadow-lg mb-3 border-2 border-white">
            <img 
              src={data.image || "/images/principal.jpg"} 
              alt={data.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-900">{data.name}</h3>
            <p className="text-blue-600 text-sm font-medium uppercase tracking-wide">{data.role}</p>
          </div>
        </div>

        <div className="w-full md:w-2/3 bg-slate-50 p-6 md:p-8 rounded-2xl relative">
          <h1 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2 border-blue-100">
            Захирлын мэндчилгээ
          </h1>

          <div className="space-y-4 text-gray-700 leading-snug text-base md:text-[17px]">
            {data.content && data.content.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-lg italic font-serif text-gray-800 text-right">
              Хүндэтгэсэн, {data.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}