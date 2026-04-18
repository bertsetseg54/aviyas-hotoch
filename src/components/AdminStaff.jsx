import { useState, useEffect, useRef } from "react";

export default function AdminStaff() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [status, setStatus] = useState(""); 
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "", specialty: "", zan: "", number: "", image: ""
  });

  const fetchStaff = async () => {
    const res = await fetch("/api/staff");
    const data = await res.json();
    setStaff(Array.isArray(data) ? data : []);
  };

  useEffect(() => { fetchStaff(); }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile && !formData.image) return;

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

      const method = editId ? "PUT" : "POST";
      const res = await fetch("/api/staff", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, image: finalImageUrl, _id: editId }),
      });

      if (res.ok) {
        setStatus("success");
        resetForm();
        fetchStaff();
        setTimeout(() => setStatus(""), 2000);
      }
    } catch (err) {
      setStatus("error");
    } finally { setLoading(false); }
  };

  const resetForm = () => {
    setEditId(null);
    setShowForm(false);
    setSelectedFile(null);
    setPreviewUrl("");
    setFormData({ name: "", specialty: "", zan: "", number: "", image: "" });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setFormData(item);
    setPreviewUrl(item.image);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const res = await fetch(`/api/staff?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      setStatus("deleted");
      fetchStaff();
      setTimeout(() => setStatus(""), 2000);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 font-sans">
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

      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h2 className="font-bold text-gray-800 uppercase text-sm tracking-widest">Багш ажилчид</h2>
        <button 
          onClick={() => (showForm ? resetForm() : setShowForm(true))}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg text-xs font-bold uppercase"
        >
          {showForm ? "Цуцлах" : "Багш нэмэх +"}
        </button>
      </div>

      {showForm && (
  <div className="max-w-xl mx-auto mb-12 bg-white rounded-2xl border border-slate-100 shadow-sm p-6 animate-in fade-in slide-in-from-top-4 duration-300">
    <form onSubmit={handleSubmit} className="space-y-5">
      
      {/* Зураг оруулах хэсэг */}
      <div className="flex flex-col items-center gap-3 pb-2">
        <div className="relative w-24 h-24 bg-slate-50 rounded-full border border-slate-200 flex items-center justify-center overflow-hidden group">
          {previewUrl ? (
            <img src={previewUrl} className="w-full h-full object-cover" />
          ) : (
            <div className="text-center">
              <span className="block text-[10px] font-black text-slate-400 uppercase">Зураг</span>
            </div>
          )}
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            className="opacity-0 absolute inset-0 cursor-pointer z-10" 
          />
        </div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ажилтны зураг сонгох</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Нэр */}
        <div className="col-span-2 flex flex-col gap-1.5">
          <label className="text-[10px] font-black text-slate-500 uppercase ml-1 tracking-wider">Овог Нэр</label>
          <input 
            type="text" 
            value={formData.name} 
            onChange={e => setFormData({...formData, name: e.target.value})} 
            className="w-full p-3 bg-slate-50/50 border border-slate-100 rounded-xl text-sm font-bold outline-none focus:border-blue-400 focus:bg-white transition-all" 
            required 
          />
        </div>

        {/* Мэргэжил */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-black text-slate-500 uppercase ml-1 tracking-wider">Мэргэжил / Зэрэг</label>
          <input 
            type="text" 
            value={formData.specialty} 
            onChange={e => setFormData({...formData, specialty: e.target.value})} 
            className="w-full p-3 bg-slate-50/50 border border-slate-100 rounded-xl text-sm font-medium outline-none focus:border-blue-400 focus:bg-white transition-all" 
            required 
          />
        </div>

        {/* ЗАН */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-black text-slate-500 uppercase ml-1 tracking-wider">ЗАН</label>
          <input 
            type="text" 
            value={formData.zan} 
            onChange={e => setFormData({...formData, zan: e.target.value})} 
            className="w-full p-3 bg-slate-50/50 border border-slate-100 rounded-xl text-sm font-medium outline-none focus:border-blue-400 focus:bg-white transition-all" 
          />
        </div>

        {/* Утас */}
        <div className="col-span-2 flex flex-col gap-1.5">
          <label className="text-[10px] font-black text-slate-500 uppercase ml-1 tracking-wider">Холбоо барих утас</label>
          <input 
            type="text" 
            value={formData.number} 
            onChange={e => setFormData({...formData, number: e.target.value})} 
            className="w-full p-3 bg-slate-50/50 border border-slate-100 rounded-xl text-sm font-medium outline-none focus:border-blue-400 focus:bg-white transition-all" 
          />
        </div>
      </div>

      <div className="pt-2">
        <button 
          disabled={loading} 
          className="w-full bg-slate-900 text-white py-4 rounded-xl font-black text-[11px] uppercase tracking-[0.2em] disabled:bg-slate-200 transition-colors shadow-lg shadow-slate-100"
        >
          {loading ? "ТҮР ХҮЛЭЭ..." : (editId ? "ӨӨРЧЛӨЛТИЙГ ХАДГАЛАХ" : "ШИНЭЭР БҮРТГЭХ")}
        </button>
      </div>
    </form>
  </div>
)}

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {staff.map((s) => (
          <div key={s._id} className="bg-white rounded-xl border border-gray-100 p-4 relative group">
            <div className="w-16 h-16 mx-auto mb-3">
              <img src={s.image} className="w-full h-full object-cover rounded-full border border-gray-50 shadow-sm" alt="" />
            </div>
            <div className="text-center space-y-1">
              <h4 className="font-bold text-gray-900 text-xs leading-tight uppercase">{s.name}</h4>
              <p className="text-blue-600 text-[10px] font-bold uppercase">{s.specialty}</p>
              <div className="pt-2 mt-2 border-t border-gray-50 text-[10px] text-gray-500 space-y-1">
                <p>ЗАН: {s.zan}</p>
                <p>УТАС: {s.number}</p>
              </div>
              <div className="flex gap-1 pt-3">
                <button onClick={() => handleEdit(s)} className="flex-1 bg-gray-50 text-[9px] font-bold py-1.5 rounded uppercase">Засах</button>
                <button onClick={() => handleDelete(s._id)} className="flex-1 bg-red-50 text-red-600 text-[9px] font-bold py-1.5 rounded uppercase">Устгах</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}