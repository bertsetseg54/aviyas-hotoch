import { useState, useEffect } from "react";

export default function Schedule() {
  const [classes, setClasses] = useState([]);
  const [selectClass, setSelectClass] = useState(null);
  const [loading, setLoading] = useState(true);

  // Бүх цагуудыг бүтнээр нь харуулна
  const shifts = {
    morning: ["08:30-09:10", "09:15-09:55", "10:00-10:40", "10:55-11:35", "11:40-12:20", "12:25-13:05", "13:10-13:50"],
    afternoon: ["14:00-14:40", "14:45-15:25", "15:30-16:10", "16:25-17:05", "17:10-17:50", "17:55-18:35", "18:40-19:20"],
    mixed: ["08:30-09:10", "09:15-09:55", "10:00-10:40", "10:55-11:35", "11:40-12:20", "12:25-13:05", "13:10-13:50", "14:00-14:40", "14:45-15:25", "15:30-16:10", "16:25-17:05", "17:10-17:50", "17:55-18:35", "18:40-19:20"]
  };

  useEffect(() => {
    fetch("/api/schedule")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setClasses(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4 font-sans">\
      <div className="flex items-center gap-5 pb-6">
          <div className="h-px flex-1 bg-slate-100"></div>
          <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] px-3">
            Хичээлийн хуваарь
          </h2>
          <div className="h-px flex-1 bg-slate-100"></div>
        </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="w-6 h-6 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {classes.map((item) => (
            <div key={item._id} className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
              <div className="p-8 flex flex-col items-center gap-4 flex-1">
                <div className="w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-xl font-black">{item.className}</span>
                </div>
                <div className="text-center">
                  <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">Ангийн багш</p>
                  <p className="text-[13px] font-bold text-slate-800">{item.aub || "---"}</p>
                </div>
              </div>
              <div className="p-4 pt-0">
                <button
                  onClick={() => setSelectClass(item)}
                  className="w-full py-4 bg-slate-50 hover:bg-slate-100 text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-[0.15em] transition-colors border border-slate-100"
                >
                  Хуваарь үзэх
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VIEW MODAL */}
      {selectClass && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectClass(null)}></div>
          
          <div className="relative bg-white w-full max-w-5xl rounded-[2.5rem] shadow-2xl overflow-hidden">
            <button 
              onClick={() => setSelectClass(null)}
              className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center bg-white hover:bg-rose-50 hover:text-rose-500 rounded-full border border-slate-100 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <div className="p-8 md:p-10">
              <div className="mb-6">
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">Цагийн хуваарь</span>
                <h2 className="text-2xl font-black text-slate-900 uppercase">{selectClass.className} анги</h2>
              </div>

              <div className="overflow-x-auto rounded-3xl border border-slate-50">
                <table className="w-full border-separate border-spacing-1">
                  <thead>
                    <tr>
                      <th className="p-4 bg-slate-50/80 text-[10px] font-black uppercase text-slate-400 w-32">Цаг</th>
                      {["Даваа", "Мягмар", "Лхагва", "Пүрэв", "Баасан"].map((day) => (
                        <th key={day} className="p-4 bg-slate-50/80 text-[10px] font-black uppercase text-slate-400">{day}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {/* Тухайн ангийн ээлжинд тохирох цагуудыг бүтнээр нь харуулна */}
                    {(shifts[selectClass.shift] || shifts.morning).map((timeString, rowIdx) => (
                      <tr key={rowIdx}>
                        <td className="p-3 text-center bg-slate-50/50 rounded-xl">
                          <span className="text-[10px] font-black text-slate-500 whitespace-nowrap">
                            {timeString}
                          </span>
                        </td>
                        {[0, 1, 2, 3, 4].map((colIdx) => {
                          const subject = selectClass.huwaari[rowIdx]?.subjects[colIdx];
                          return (
                            <td key={colIdx} className={`p-3 rounded-xl text-center border ${subject ? 'bg-blue-50/30 border-blue-100/30' : 'bg-transparent border-slate-50'}`}>
                              <span className="text-[11px] font-bold text-slate-800 uppercase tracking-tight">
                                {subject || "-"}
                              </span>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}