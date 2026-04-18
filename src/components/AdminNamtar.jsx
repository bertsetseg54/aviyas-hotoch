import { useState, useEffect } from "react";

export default function AdminNamtar() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    timeline: [],
    stats: [],
    slogan: ""
  });

  useEffect(() => {
    fetch("/api/namtar").then(res => res.json()).then(val => setData(val));
  }, []);

  // Timeline нэмэх
  const addTimeline = () => {
    setData({
      ...data,
      timeline: [...data.timeline, { title: "", content: "", color: "blue" }]
    });
  };

  // Timeline устгах
  const removeTimeline = (index) => {
    const newTimeline = data.timeline.filter((_, i) => i !== index);
    setData({ ...data, timeline: newTimeline });
  };

  // Stats-ыг өөрчлөх
  const handleStatChange = (index, field, value) => {
    const newStats = [...data.stats];
    newStats[index][field] = value;
    setData({ ...data, stats: newStats });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/namtar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) alert("Амжилттай хадгалагдлаа!");
    } catch (err) {
      alert("Алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* ЗҮҮН ТАЛ: TIMELINE ЗАСАХ */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-black uppercase text-slate-800 italic">Түүхэн замнал</h2>
            <button onClick={addTimeline} className="bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold uppercase">+ Нэмэх</button>
          </div>
          
          <div className="space-y-6">
            {data.timeline.map((item, index) => (
              <div key={index} className="relative pl-6 border-l-2 border-blue-100 space-y-2">
                <button onClick={() => removeTimeline(index)} className="absolute -left-3 top-0 bg-red-500 text-white w-6 h-6 rounded-full text-[10px]">×</button>
                <input 
                  type="text" placeholder="Гарчиг (Жишээ: Эхлэл)" 
                  value={item.title} onChange={e => {
                    const newList = [...data.timeline];
                    newList[index].title = e.target.value;
                    setData({...data, timeline: newList});
                  }}
                  className="w-full p-2 bg-slate-50 rounded-lg outline-none font-bold text-sm"
                />
                <textarea 
                  placeholder="Тайлбар текст..." 
                  value={item.content} onChange={e => {
                    const newList = [...data.timeline];
                    newList[index].content = e.target.value;
                    setData({...data, timeline: newList});
                  }}
                  className="w-full p-2 bg-slate-50 rounded-lg outline-none text-xs h-20 resize-none"
                />
              </div>
            ))}
          </div>
        </div>

        {/* БАРУУН ТАЛ: STATS ЗАСАХ */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h2 className="text-xl font-black uppercase text-slate-800 italic mb-6">Тоон үзүүлэлтүүд</h2>
            <div className="grid grid-cols-2 gap-4">
              {data.stats.map((stat, index) => (
                <div key={index} className="p-4 bg-slate-50 rounded-2xl space-y-2">
                   <input 
                    type="text" value={stat.value} 
                    onChange={e => handleStatChange(index, "value", e.target.value)}
                    className="w-full bg-transparent font-black text-blue-600 text-center outline-none"
                  />
                  <input 
                    type="text" value={stat.label} 
                    onChange={e => handleStatChange(index, "label", e.target.value)}
                    className="w-full bg-transparent text-[10px] text-slate-400 font-bold uppercase text-center outline-none"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h2 className="text-xs font-black uppercase text-slate-400 mb-2 ml-2">Уриа үг</h2>
            <input 
              type="text" value={data.slogan} 
              onChange={e => setData({...data, slogan: e.target.value})}
              className="w-full p-4 bg-slate-50 rounded-2xl outline-none italic text-center"
              placeholder="Сургуулийн уриа үг..."
            />
          </div>
        </div>
      </div>

      <button 
        disabled={loading} onClick={handleSave}
        className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all"
      >
        {loading ? "Хадгалж байна..." : "Бүх өөрчлөлтийг Хадгалах"}
      </button>
    </div>
  );
}