import { useState, useEffect } from "react";

export default function AdminMap() {
  const [mapUrl, setMapUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(""); // success эсвэл error

  useEffect(() => {
    fetch("/api/map")
      .then((res) => res.json())
      .then((data) => { if (data.url) setMapUrl(data.url); });
  }, []);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    try {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "ml_default2");

      const cloudRes = await fetch("https://api.cloudinary.com/v1_1/dulykw6yg/image/upload", {
        method: "POST", body: data
      });
      const cloudData = await cloudRes.json();

      const res = await fetch("/api/map", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: cloudData.secure_url }),
      });

      if (res.ok) {
        setMapUrl(cloudData.secure_url);
        setStatus("success");
        setTimeout(() => setStatus(""), 3000);
      }
    } catch (err) {
      setStatus("error");
      setTimeout(() => setStatus(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8 font-sans antialiased relative">
      
      {/* Мэдэгдэл (Toast) */}
      <div className="fixed top-10 right-10 z-[200]">
        {status === "success" && (
          <div className="bg-emerald-600 text-white px-8 py-4 rounded-2xl shadow-xl font-black text-[10px] uppercase tracking-widest animate-in fade-in slide-in-from-top-10">
            ✓ Зураг шинэчлэгдлээ
          </div>
        )}
        {status === "error" && (
          <div className="bg-rose-600 text-white px-8 py-4 rounded-2xl shadow-xl font-black text-[10px] uppercase tracking-widest animate-in fade-in slide-in-from-top-10">
            ✕ Алдаа гарлаа
          </div>
        )}
      </div>

      {/* Удирдах хэсэг */}
      <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Тохиргоо</span>
          <h2 className="text-lg font-black uppercase text-slate-800 tracking-tight">Дотоод бүтэц зураг</h2>
        </div>
        
        <label className={`relative overflow-hidden px-10 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest cursor-pointer transition-all active:scale-95 ${
          loading ? "bg-slate-100 text-slate-400" : "bg-slate-900 text-white shadow-xl shadow-slate-200 hover:bg-slate-800"
        }`}>
          {loading ? "Түр хүлээнэ үү..." : "Шинэ зураг"}
          <input type="file" className="hidden" onChange={handleUpload} disabled={loading} accept="image/*" />
        </label>
      </div>

      {/* Зураг харагдах хэсэг */}
      <div className="bg-white p-4 rounded-[3rem] border border-slate-100 shadow-sm flex items-center justify-center min-h-[500px]">
        {mapUrl ? (
          <div className="relative group w-full flex justify-center">
            <img 
              src={mapUrl} 
              className="w-full h-auto rounded-[2rem] object-contain max-h-[75vh] border border-slate-50" 
              alt="Preview" 
            />
            {/* Одоо байгаа зургийн шошго */}
            <div className="absolute bottom-6 left-6 bg-white/80 backdrop-blur px-4 py-2 rounded-full border border-slate-100 shadow-sm">
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Одоо харагдаж буй зураг</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 py-20">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center border border-slate-100">
              <span className="text-2xl">🖼️</span>
            </div>
            <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Зураг оруулаагүй байна</p>
          </div>
        )}
      </div>
    </div>
  );
}