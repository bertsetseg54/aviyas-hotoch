import { useState, useEffect, useRef } from "react";

export default function AdminFood() {
  const [loading, setLoading] = useState(false);
  const [allFoodData, setAllFoodData] = useState([]);
  const [selectedDayData, setSelectedDayData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState(""); 
  
  const [currentWeek, setCurrentWeek] = useState(1);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    foods: ["", "", "", ""],
    description: "",
    image: "",
    imageFit: "cover"
  });

  const days = [
    { id: 1, name: "Даваа" }, { id: 2, name: "Мягмар" },
    { id: 3, name: "Лхагва" }, { id: 4, name: "Пүрэв" }, { id: 5, name: "Баасан" }
  ];

  const fetchAllFoods = async () => {
    const res = await fetch("/api/food");
    const data = await res.json();
    if (Array.isArray(data)) setAllFoodData(data);
  };

  useEffect(() => { fetchAllFoods(); }, []);

  const openEditModal = (dayId) => {
    const found = allFoodData.find(f => Number(f.week) === currentWeek && Number(f.day) === dayId);
    setSelectedDayData({ week: currentWeek, day: dayId });
    
    if (found) {
      setFormData({
        foods: Array.isArray(found.name) ? found.name : ["", "", "", ""],
        description: found.description || "",
        image: found.foodPic || "",
        imageFit: found.imageFit || "cover"
      });
      setPreviewUrl(found.foodPic || "");
    } else {
      setFormData({ foods: ["", "", "", ""], description: "", image: "", imageFit: "cover" });
      setPreviewUrl("");
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let finalImageUrl = formData.image;
      if (selectedFile) {
        const data = new FormData();
        data.append("file", selectedFile);
        data.append("upload_preset", "ml_default2");
        const cloudRes = await fetch("https://api.cloudinary.com/v1_1/dulykw6yg/image/upload", {
          method: "POST", body: data
        });
        const cloudData = await cloudRes.json();
        finalImageUrl = cloudData.secure_url;
      }

      await fetch("/api/food", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          week: selectedDayData.week, 
          day: selectedDayData.day, 
          foods: formData.foods, 
          description: formData.description, 
          image: finalImageUrl,
          imageFit: formData.imageFit
        }),
      });

      setStatus("success");
      fetchAllFoods();
      setIsModalOpen(false);
      setTimeout(() => setStatus(""), 2500);
    } catch (err) {
      setStatus("error");
      setTimeout(() => setStatus(""), 2500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6 font-sans relative">
      
      {/* Мэдэгдэл */}
      <div className="fixed top-10 right-10 z-[200]">
        {status === "success" && (
          <div className="bg-emerald-600 text-white px-8 py-4 rounded-2xl shadow-xl font-black text-xs tracking-widest animate-in fade-in slide-in-from-top-10">
            ✓ ХАДГАЛАГДЛАА
          </div>
        )}
      </div>

      {/* Долоо хоног сонгогч */}
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <h2 className="text-sm font-black uppercase text-slate-800 tracking-tighter">Хоолны цэс удирдах</h2>
        <div className="flex gap-1.5">
          {[1, 2, 3, 4].map(num => (
            <button 
              key={num}
              onClick={() => setCurrentWeek(num)}
              className={`px-4 py-2 rounded-lg font-black text-[10px] uppercase tracking-wider transition-all ${currentWeek === num ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-400 hover:bg-slate-100"}`}
            >
              {num}-р долоо хоног
            </button>
          ))}
        </div>
      </div>

      {/* Хүснэгтэн картнууд */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {days.map(day => {
          const foodEntry = allFoodData.find(f => Number(f.week) === currentWeek && Number(f.day) === day.id);
          return (
            <div key={day.id} className="bg-white rounded-[1.5rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
              <div className="p-3 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center">
                <span className="text-[9px] font-black uppercase text-blue-600 tracking-widest">{day.name}</span>
                <div className={`w-1.5 h-1.5 rounded-full ${foodEntry ? 'bg-emerald-500' : 'bg-slate-200'}`} />
              </div>

              <div className="p-3 space-y-3 flex-1">
                <div className="relative aspect-video bg-slate-50 rounded-xl overflow-hidden border border-slate-50">
                  {foodEntry?.foodPic ? (
                    <img src={foodEntry.foodPic} className={`w-full h-full ${foodEntry.imageFit === 'contain' ? 'object-contain' : 'object-cover'}`} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-[8px] font-black uppercase text-slate-300">Зураггүй</span>
                    </div>
                  )}
                </div>

                <div className="space-y-1.5 min-h-[40px]">
                  {foodEntry ? (
                    <>
                      <p className="text-[10px] font-bold text-slate-700 truncate">🍲 {foodEntry.name[0]}</p>
                      <p className="text-[10px] font-bold text-slate-700 truncate">🍱 {foodEntry.name[1]}</p>
                    </>
                  ) : (
                    <p className="text-[9px] font-medium text-slate-300 uppercase italic">Хоосон...</p>
                  )}
                </div>
              </div>

              <button 
                onClick={() => openEditModal(day.id)}
                className="w-full py-3 bg-white border-t border-slate-50 text-[9px] font-black uppercase tracking-[0.1em] text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all"
              >
                {foodEntry ? "Засах" : "+ Нэмэх"}
              </button>
            </div>
          );
        })}
      </div>

      {/* ЗАСАХ МОДАЛ */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-4xl rounded-[2rem] shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
            <div className="p-6 flex justify-between items-center border-b border-slate-100">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-800">
                {currentWeek}-р долоо хоног | {days.find(d => d.id === selectedDayData.day)?.name} гариг
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-rose-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <form onSubmit={handleSave} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Хоолны зураг</label>
                <div className="relative aspect-video bg-slate-50 rounded-2xl border border-dashed border-slate-200 overflow-hidden flex items-center justify-center group">
                  {previewUrl ? <img src={previewUrl} className={`w-full h-full ${formData.imageFit === 'contain' ? 'object-contain' : 'object-cover'}`} /> : <span className="text-[9px] font-black text-slate-300 uppercase">Зураг сонгох</span>}
                  <input type="file" accept="image/*" onChange={e => {
                    const file = e.target.files[0];
                    if(file) { setSelectedFile(file); setPreviewUrl(URL.createObjectURL(file)); }
                  }} className="absolute inset-0 opacity-0 cursor-pointer" />
                </div>
                
                <div className="flex gap-2">
                  {[
                    { id: 'cover', label: 'Дүүргэх' },
                    { id: 'contain', label: 'Багтаах' }
                  ].map(fit => (
                    <button 
                      key={fit.id} type="button"
                      onClick={() => setFormData({...formData, imageFit: fit.id})}
                      className={`flex-1 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest border transition-all ${formData.imageFit === fit.id ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-400 border-slate-100'}`}
                    >
                      {fit.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Цэс оруулах</label>
                {[ "Шөл", "Үндсэн хоол", "Салат", "Ундаа" ].map((label, index) => (
                  <input 
                    key={index}
                    type="text" 
                    placeholder={label} 
                    value={formData.foods[index] || ""}
                    onChange={e => {
                      const newFoods = [...formData.foods];
                      newFoods[index] = e.target.value;
                      setFormData({...formData, foods: newFoods});
                    }}
                    className="w-full px-4 py-3.5 bg-slate-50 border-none rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-100 outline-none"
                  />
                ))}
                
                <div className="pt-2">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Нэмэлт тайлбар</label>
                  <textarea 
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    placeholder="Хоолны тухай нэмэлт мэдээлэл..."
                    className="w-full px-4 py-3.5 bg-slate-50 border-none rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-100 outline-none h-20 resize-none"
                  />
                </div>

                <button disabled={loading} className="w-full bg-blue-600 text-white py-4 rounded-xl font-black uppercase tracking-widest text-[10px] mt-4 shadow-lg shadow-blue-100 active:scale-95 transition-all">
                  {loading ? "Түр хүлээнэ үү..." : "Хадгалах"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}