import { useState, useEffect } from "react";

export default function AdminSchedule() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const shifts = {
    morning: ["08:30-09:10", "09:15-09:55", "10:00-10:40", "10:55-11:35", "11:40-12:20", "12:25-13:05", "13:10-13:50"],
    afternoon: ["14:00-14:40", "14:45-15:25", "15:30-16:10", "16:25-17:05", "17:10-17:50", "17:55-18:35", "18:40-19:20"],
    mixed: ["08:30-09:10", "09:15-09:55", "10:00-10:40", "10:55-11:35", "11:40-12:20", "12:25-13:05", "13:10-13:50", "14:00-14:40", "14:45-15:25", "15:30-16:10", "16:25-17:05", "17:10-17:50", "17:55-18:35", "18:40-19:20"]
  };

  useEffect(() => { fetchClasses(); }, []);

  const fetchClasses = async () => {
    try {
      const res = await fetch("/api/schedule");
      const data = await res.json();
      if (Array.isArray(data)) setClasses(data);
    } catch (err) { setStatus({ type: "error", msg: "Өгөгдөл татахад алдаа гарлаа" }); }
  };

  const handleCreateNew = () => {
    setSelectedClass({
      className: "",
      aub: "",
      shift: "morning",
      huwaari: Array(7).fill(null).map(() => ({ subjects: ["", "", "", "", ""] }))
    });
    setIsModalOpen(true);
  };

  // Шинээр нэмэгдсэн функц: Ээлж солиход хүснэгтийн мөрийг тааруулна
  const handleShiftChange = (newShift) => {
    const rowCount = shifts[newShift].length;
    const currentHuwaari = [...selectedClass.huwaari];
    
    let newHuwaari;
    if (currentHuwaari.length < rowCount) {
      const extraRows = Array(rowCount - currentHuwaari.length).fill(null)
        .map(() => ({ subjects: ["", "", "", "", ""] }));
      newHuwaari = [...currentHuwaari, ...extraRows];
    } else {
      newHuwaari = currentHuwaari.slice(0, rowCount);
    }

    setSelectedClass({
      ...selectedClass,
      shift: newShift,
      huwaari: newHuwaari
    });
  };

  const handleSave = async () => {
    if (!selectedClass.className) return setStatus({ type: "error", msg: "Ангийн нэрийг оруулна уу" });
    setLoading(true);
    try {
      const res = await fetch("/api/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedClass),
      });
      if (res.ok) {
        setIsModalOpen(false);
        fetchClasses();
        setStatus({ type: "success", msg: "Амжилттай хадгалагдлаа" });
      }
    } catch (err) { 
      setStatus({ type: "error", msg: "Хадгалахад алдаа гарлаа" }); 
    } finally { 
      setLoading(false); 
      setTimeout(() => setStatus(null), 3000);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Энэ ангийн хуваарийг устгах уу?")) return;
    await fetch(`/api/schedule?id=${id}`, { method: "DELETE" });
    fetchClasses();
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 font-sans">
      {status && (
        <div className={`fixed top-10 left-1/2 -translate-x-1/2 z-[200] px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-2xl animate-bounce ${status.type === 'success' ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}>
          {status.msg}
        </div>
      )}

      <div className="flex justify-between items-center mb-10 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-black uppercase text-slate-900 tracking-tighter">Удирдах хэсэг</h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Хичээлийн хуваарь зохицуулах</p>
        </div>
        <button onClick={handleCreateNew} className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-blue-600 transition-all active:scale-95 shadow-xl shadow-slate-100">
          Шинэ анги нэмэх
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((c) => (
          <div key={c._id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col gap-6 transition-all">
            <div className="flex justify-between items-start">
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center">
                <span className="text-xl font-black text-slate-900">{c.className}</span>
              </div>
              <span className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest ${
                c.shift === 'morning' ? 'bg-amber-100 text-amber-600' : c.shift === 'afternoon' ? 'bg-indigo-100 text-indigo-600' : 'bg-emerald-100 text-emerald-600'
              }`}>
                {c.shift === 'morning' ? 'Өглөө' : c.shift === 'afternoon' ? 'Өдөр' : 'Холимог'}
              </span>
            </div>
            
            <div>
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Анги удирдсан багш</p>
              <p className="font-bold text-slate-800">{c.aub || "Тодорхойгүй"}</p>
            </div>

            <div className="flex gap-2">
              <button onClick={() => { setSelectedClass(c); setIsModalOpen(true); }} className="flex-1 bg-slate-100 text-slate-900 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-slate-200 transition-all"> Засах </button>
              <button onClick={() => handleDelete(c._id)} className="px-6 bg-rose-50 text-rose-500 py-4 rounded-2xl font-black uppercase text-[10px] hover:bg-rose-500 hover:text-white transition-all"> Устгах </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && selectedClass && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] shadow-2xl animate-in zoom-in duration-200">
            <div className="p-8 border-b border-slate-50">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Хуваарь засах</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-900 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase text-slate-400 ml-1 tracking-widest">Ангийн нэр</label>
                  <input value={selectedClass.className} onChange={e => setSelectedClass({...selectedClass, className: e.target.value})} placeholder="12А" className="w-full bg-slate-50 p-3.5 rounded-xl outline-none font-bold text-sm border-2 border-transparent focus:border-blue-500 transition-all" />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase text-slate-400 ml-1 tracking-widest">Багш</label>
                  <input value={selectedClass.aub} onChange={e => setSelectedClass({...selectedClass, aub: e.target.value})} placeholder="Нэр" className="w-full bg-slate-50 p-3.5 rounded-xl outline-none font-bold text-sm border-2 border-transparent focus:border-blue-500 transition-all" />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase text-slate-400 ml-1 tracking-widest">Ээлж</label>
                  <select value={selectedClass.shift} onChange={e => handleShiftChange(e.target.value)} className="w-full bg-slate-50 p-3.5 rounded-xl outline-none font-bold text-sm border-2 border-transparent focus:border-blue-500 appearance-none cursor-pointer">
                    <option value="morning">Өглөө</option>
                    <option value="afternoon">Өдөр</option>
                    <option value="mixed">Ахлах анги</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="p-6 overflow-x-auto">
              <table className="w-full border-separate border-spacing-1">
                <thead>
                  <tr>
                    <th className="p-3 bg-slate-50 rounded-lg text-[9px] font-black uppercase text-slate-400 w-24">Цаг</th>
                    {["Дав", "Мяг", "Лха", "Пүр", "Баа"].map(d => <th key={d} className="p-3 bg-slate-50 rounded-lg text-[9px] font-black uppercase text-slate-400">{d}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {(shifts[selectedClass.shift] || []).map((time, rowIdx) => (
                    <tr key={rowIdx}>
                      <td className="p-2 text-center bg-slate-50/30 rounded-lg">
                        <span className="text-[9px] font-black text-slate-400">{time}</span>
                      </td>
                      {[0, 1, 2, 3, 4].map(colIdx => (
                        <td key={colIdx} className="p-0.5">
                          <input 
                            value={selectedClass.huwaari[rowIdx]?.subjects[colIdx] || ""} 
                            onChange={(e) => {
                              const newH = [...selectedClass.huwaari];
                              if (!newH[rowIdx]) newH[rowIdx] = { subjects: ["", "", "", "", ""] };
                              newH[rowIdx].subjects[colIdx] = e.target.value;
                              setSelectedClass({...selectedClass, huwaari: newH});
                            }}
                            className="w-full p-3 bg-transparent hover:bg-slate-50 focus:bg-blue-50/50 rounded-lg outline-none text-[10px] font-bold text-center uppercase transition-all"
                            placeholder="---"
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-8 bg-slate-50/30 flex gap-3">
              <button onClick={handleSave} disabled={loading} className="flex-1 bg-slate-900 text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-blue-600 disabled:bg-slate-200 transition-all shadow-lg shadow-slate-100">
                {loading ? "Хадгалж байна..." : "Хуваарь хадгалах"}
              </button>
              <button onClick={() => setIsModalOpen(false)} className="px-10 bg-white text-slate-400 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-slate-100 border border-slate-100 transition-all">
                Болих
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}