import { useState, useEffect } from "react";

export default function Food() {
  const [selectItem, setSelectItem] = useState(null);
  const [foodData, setFoodData] = useState([]);

  useEffect(() => {
    fetch("/api/food")
      .then(res => res.json())
      .then(data => setFoodData(data));
  }, []);

  const weeks = [
    { title: "1-р долоо хоног", id: 1 },
    { title: "2-р долоо хоног", id: 2 },
    { title: "3-р долоо хоног", id: 3 },
    { title: "4-р долоо хоног", id: 4 },
  ];

  const days = [
    { id: 1, name: "Даваа" }, { id: 2, name: "Мягмар" },
    { id: 3, name: "Лхагва" }, { id: 4, name: "Пүрэв" }, { id: 5, name: "Баасан" }
  ];

  return (
    <div className="w-full bg-white py-12 px-6 font-sans antialiased">
      <div className="max-w-7xl mx-auto flex flex-col gap-20">
        {weeks.map((week) => (
          <div key={week.id} className="flex flex-col gap-10">
            {/* Гарчиг */}
            <div className="flex items-center gap-5">
              <div className="h-px flex-1 bg-slate-100"></div>
              <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] px-3">
                {week.title}
              </h2>
              <div className="h-px flex-1 bg-slate-100"></div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {days.map((day) => {
                const dayData = foodData.find(f => f.week === week.id && f.day === day.id);

                return (
                  <div key={day.id} className="group flex flex-col gap-3.5 bg-white rounded-3xl p-3 border border-slate-50 shadow-sm shadow-slate-100/50">
                    <div className="flex justify-between items-center px-1.5 pt-0.5">
                      <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{day.name} гариг</span>
                      <div className={`w-1.5 h-1.5 rounded-full ${dayData ? 'bg-emerald-500' : 'bg-slate-200'}`} />
                    </div>

                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-50 border border-slate-100">
                      {dayData?.foodPic ? (
                        <img
                          src={dayData.foodPic}
                          alt={day.name}
                          className={`w-full h-full object-cover transition-transform duration-500`}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                           <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Цэс ороогүй</span>
                        </div>
                      )}
                    </div>
                    
                    <button 
                      disabled={!dayData}
                      onClick={() => setSelectItem(dayData)}
                      className={`w-full py-3.5 text-[10px] font-black uppercase tracking-[0.15em] rounded-xl transition-all ${
                        dayData 
                        ? "bg-slate-900 text-white shadow-md shadow-slate-200 active:scale-[0.98]" 
                        : "bg-slate-50 text-slate-200 cursor-not-allowed border border-slate-100"
                      }`}
                    >
                      {dayData ? "Дэлгэрэнгүй" : "Хоосон"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selectItem && (
        <div className="fixed inset-0 z-[1000] flex justify-center items-center p-6 bg-slate-900/60 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="absolute inset-0" onClick={() => setSelectItem(null)}></div>
          
          <div className="relative z-[1001] bg-white rounded-[2.5rem] shadow-2xl overflow-hidden max-w-xl w-full animate-in zoom-in duration-300 flex flex-col max-h-[92vh]">
            
            {/* Зургийн хэсэг overlays-тэй */}
            <div className="relative w-full bg-slate-950 aspect-video overflow-hidden">
              <img 
                src={selectItem.foodPic} 
                className={`w-full h-full ${selectItem.imageFit === 'contain' ? 'object-contain' : 'object-cover'}`} 
                alt="Хоол" 
              />
              {/* Градиент маск - доороос гарчиг тодруулах */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent z-10" />
              {/* Градиент маск - дээрээс товчлуур тодруулах */}
              <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/50 to-transparent z-10" />

              {/* Хаах товч - Зургийн дээр */}
              <button 
                onClick={() => setSelectItem(null)}
                className="absolute top-5 right-5 z-20 bg-white/20 backdrop-blur-sm shadow-sm p-2 rounded-full text-white hover:bg-white hover:text-slate-900 transition-all border border-white/20"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Гарчиг зургийн дээр */}
              <div className="absolute bottom-6 left-8 z-20 space-y-0.5">
                <span className="text-[10px] font-black text-blue-300 uppercase tracking-[0.3em]">Цэсний мэдээлэл</span>
                <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Өдрийн хоол</h3>
              </div>
            </div>

            {/* Агуулга */}
            <div className="p-8 space-y-6 overflow-y-auto bg-white">
              {/* Хоолнуудын жагсаалт ба Тайлбар */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { icon: "🍲", label: "Шөл", val: selectItem.name[0] },
                  { icon: "🍱", label: "Үндсэн хоол", val: selectItem.name[1] },
                  { icon: "🥗", label: "Салат / Зууш", val: selectItem.name[2] },
                  { icon: "🥤", label: "Ундаа / Уух зүйл", val: selectItem.name[3] }
                ].map((item, i) => (
                  item.val && (
                    <div key={i} className="flex items-center gap-4 p-4 bg-slate-50/50 rounded-2xl border border-slate-100/50 transition-all hover:bg-slate-50">
                      <span className="text-2xl">{item.icon}</span>
                      <div className="flex flex-col">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{item.label}</span>
                        <span className="text-[12px] font-bold text-slate-800 uppercase tracking-tight">{item.val}</span>
                      </div>
                    </div>
                  )
                ))}

                {/* Тайлбар хэсэг - Бусадтай адилхан загвартай болгов */}
                {selectItem.description && (
                  <div className="flex items-start gap-4 p-4 bg-slate-50/50 rounded-2xl border border-slate-100/50 transition-all hover:bg-slate-50 md:col-span-2">
                    <span className="text-2xl mt-0.5">📝</span>
                    <div className="flex flex-col flex-1">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Нэмэлт тайлбар</span>
                      <p className="text-[12px] text-slate-700 font-medium leading-relaxed tracking-tight">
                        {selectItem.description}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}