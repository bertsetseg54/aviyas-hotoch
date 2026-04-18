import { useState, useEffect } from "react";

export default function Information() {
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    fetch("/api/staff")
      .then(res => res.json())
      .then(data => setStaff(Array.isArray(data) ? data : []));
  }, []);

  return (
    <div className="w-full bg-white py-4 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {staff.map((data) => (
          <div key={data._id} className="w-full bg-white rounded-xl border border-gray-100 p-4 flex flex-col items-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full overflow-hidden mb-3 border border-gray-50">
              <img 
                src={data.image || "/placeholder-avatar.png"} 
                className="w-full h-full object-cover" 
                alt={data.name} 
              />
            </div>

            <div className="text-center w-full">
              <h4 className="text-gray-900 font-bold text-xs uppercase mb-1 leading-tight">
                {data.name}
              </h4>
              <p className="text-blue-600 text-[10px] font-bold uppercase mb-2 tracking-tighter">
                {data.specialty}
              </p>
              <div className="pt-2 border-t border-gray-50 space-y-1">
                <div className="flex justify-between text-[10px] uppercase">
                  <span className="text-gray-300 font-bold">ЗАН:</span>
                  <span className="text-gray-500">{data.zan || "-"}</span>
                </div>
                <div className="flex justify-between text-[10px] uppercase">
                  <span className="text-gray-300 font-bold">Утас:</span>
                  <span className="text-gray-500">{data.number || "-"}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}