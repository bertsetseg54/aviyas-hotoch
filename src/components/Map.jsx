import { useState, useEffect } from "react";

export default function MapView() {
  const [mapUrl, setMapUrl] = useState("");

  useEffect(() => {
    fetch("/api/map")
      .then((res) => res.json())
      .then((data) => { if (data.url) setMapUrl(data.url); });
  }, []);

  return (
    <div className="w-full p-4 font-sans antialiased">
      <div className="max-w-7xl mx-auto">
        {/* Гарчиг хэсэг */}
        <div className="flex items-center gap-5 pb-6">
          <div className="h-px flex-1 bg-slate-100"></div>
          <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] px-3">
            Сургуулийн дотоод бүтэц
          </h2>
          <div className="h-px flex-1 bg-slate-100"></div>
        </div>

        {/* Зураг харуулах хэсэг */}
        <div className="relative rounded-[3rem] p-4  overflow-hidden min-h-[500px] flex items-center justify-center">
          {mapUrl ? (
            <div className="group relative w-full h-full overflow-hidden rounded-[2rem]">
              <img 
                src={mapUrl} 
                className="w-full h-auto object-contain max-h-[80vh] transition-transform duration-700" 
                alt="School Map" 
              />
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center animate-pulse">
                <span className="text-xl">📍</span>
              </div>
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest text-center">
                Зураг хараахан ороогүй байна
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}