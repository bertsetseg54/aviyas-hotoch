import { useState, useEffect, useRef } from "react";

export default function AdminProud() {
  const [prouds, setProuds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const [status, setStatus] = useState(""); 
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    location: "", title: "", content: "", fullContent: "", image: ""
  });

  const fetchProuds = async () => {
    try {
      const res = await fetch("/api/proud");
      const data = await res.json();
      setProuds(Array.isArray(data) ? data : []);
    } catch (e) {
      setProuds([]);
    }
  };

  useEffect(() => { fetchProuds(); }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile && !formData.image) {
      setStatus("error");
      setTimeout(() => setStatus(""), 3000);
      return;
    }

    setLoading(true);
    try {
      let finalImageUrl = formData.image;

      if (selectedFile) {
        const uploadPayload = new FormData();
        uploadPayload.append("file", selectedFile);
        uploadPayload.append("upload_preset", "ml_default2");

        const cloudRes = await fetch("https://api.cloudinary.com/v1_1/dulykw6yg/image/upload", {
          method: "POST", body: uploadPayload
        });
        const cloudData = await cloudRes.json();
        finalImageUrl = cloudData.secure_url;
      }

      const method = editId ? "PUT" : "POST";
      const res = await fetch("/api/proud", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, image: finalImageUrl, _id: editId }),
      });

      if (res.ok) {
        setStatus("success");
        resetForm();
        fetchProuds();
        setTimeout(() => setStatus(""), 3000);
      }
    } catch (err) {
      setStatus("error");
      setTimeout(() => setStatus(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEditId(null);
    setSelectedFile(null);
    setPreviewUrl("");
    setFormData({
      date: new Date().toISOString().split('T')[0],
      location: "", title: "", content: "", fullContent: "", image: ""
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDelete = async (id) => {
    const res = await fetch(`/api/proud?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      setStatus("deleted");
      fetchProuds();
      setTimeout(() => setStatus(""), 3000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 flex flex-col lg:flex-row gap-10 relative">
    
      <div className="fixed top-10 right-10 z-[200] flex flex-col gap-3">
        {status === "success" && (
          <div className="bg-emerald-600 text-white px-10 py-5 rounded-2xl shadow-[0_20px_50px_rgba(16,185,129,0.4)] font-black text-sm tracking-widest animate-in fade-in slide-in-from-top-10 duration-500">
            ✓ АМЖИЛТТАЙ ХАДГАЛАГДЛАА
          </div>
        )}
        
        {status === "deleted" && (
          <div className="bg-rose-600 text-white px-10 py-5 rounded-2xl shadow-[0_20px_50px_rgba(225,29,72,0.4)] font-black text-sm tracking-widest animate-in fade-in slide-in-from-top-10 duration-500">
            ✕ УСТГАГДЛАА
          </div>
        )}

        {status === "error" && (
          <div className="bg-amber-500 text-white px-10 py-5 rounded-2xl shadow-[0_20px_50px_rgba(245,158,11,0.4)] font-black text-sm tracking-widest animate-in fade-in slide-in-from-top-10 duration-500">
            ! АЛДАА ГАРЛАА
          </div>
        )}
      </div>

      <div className="lg:w-1/3">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 sticky top-10 space-y-5">
          <h2 className="text-xl font-black uppercase text-slate-800 italic">
            {editId ? "Засварлах" : "Шинэ амжилт"}
          </h2>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-black text-slate-500 uppercase ml-1">Амжилтын зураг</label>
            <div className="relative h-44 w-full bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 overflow-hidden flex items-center justify-center group hover:border-blue-400">
              {previewUrl ? (
                <img src={previewUrl} className="w-full h-full object-cover" />
              ) : (
                <span className="text-blue-500 text-[10px] font-black uppercase">Зураг сонгох</span>
              )}
              <input type="file" ref={fileInputRef} onChange={handleFileChange} className="opacity-0 absolute inset-0 cursor-pointer z-10" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-black text-slate-500 uppercase ml-1">Огноо</label>
            <input type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full p-4 bg-slate-50 rounded-2xl outline-none border border-transparent font-bold" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-black text-slate-500 uppercase ml-1">Байршил</label>
            <input type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full p-4 bg-slate-50 rounded-2xl outline-none border border-transparent font-bold" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-black text-slate-500 uppercase ml-1">Гарчиг</label>
            <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-4 bg-slate-50 rounded-2xl outline-none border border-transparent font-bold" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-black text-slate-500 uppercase ml-1">Товч агуулга</label>
            <textarea value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} className="w-full p-4 bg-slate-50 rounded-2xl outline-none h-20 text-sm" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-black text-slate-500 uppercase ml-1">Дэлгэрэнгүй агуулга</label>
            <textarea value={formData.fullContent} onChange={e => setFormData({...formData, fullContent: e.target.value})} className="w-full p-4 bg-slate-50 rounded-2xl outline-none h-32 text-sm" />
          </div>

          <button disabled={loading} className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-slate-100 disabled:bg-slate-200">
            {loading ? "Түр хүлээ..." : (editId ? "Шинэчлэх" : "Хадгалах")}
          </button>
          
          {editId && <button type="button" onClick={resetForm} className="w-full text-slate-400 text-[10px] font-black uppercase">Цуцлах</button>}
        </form>
      </div>

      <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6 content-start">
        {prouds.map((p) => (
          <div key={p._id} className="bg-white p-5 rounded-[2.5rem] border border-slate-50 shadow-sm group">
            <div className="h-44 bg-slate-50 rounded-[2rem] overflow-hidden mb-4">
              <img src={p.image} className="w-full h-full object-cover transition-all" />
            </div>
            <p className="text-[10px] font-black text-blue-500 uppercase">{p.date} • {p.location}</p>
            <h3 className="font-bold text-slate-800 text-sm mt-1 line-clamp-1">{p.title}</h3>
            <div className="flex gap-2 mt-5">
              <button onClick={() => { setEditId(p._id); setFormData(p); setPreviewUrl(p.image); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex-1 bg-slate-50 text-slate-600 py-3 rounded-2xl text-[10px] font-black uppercase hover:bg-blue-600 hover:text-white transition-all">Засах</button>
              <button onClick={() => handleDelete(p._id)} className="flex-1 bg-slate-50 text-rose-600 py-3 rounded-2xl text-[10px] font-black uppercase hover:bg-rose-600 hover:text-white transition-all">Устгах</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}