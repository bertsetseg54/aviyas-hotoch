import { useState, useEffect } from "react";

export default function AdminEvent() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState({
    title: "",
    date: "",
    purpose: "",
    description: "",
    imageUrl: ""
  });

  useEffect(() => { fetchEvents(); }, []);

  const fetchEvents = async () => {
    const res = await fetch("/api/event");
    const data = await res.json();
    setEvents(data);
  };

  const handleImageUpload = async (file) => {
    if (!file) return;
    setLoading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "ml_default2");

    const res = await fetch("https://api.cloudinary.com/v1_1/dulykw6yg/image/upload", {
      method: "POST", body: data
    });
    const cloudData = await res.json();
    setCurrentEvent({ ...currentEvent, imageUrl: cloudData.secure_url });
    setLoading(false);
  };

  const handleSave = async () => {
    if (!currentEvent.title || !currentEvent.date) return alert("Нэр болон хугацааг оруулна уу");
    setLoading(true);
    await fetch("/api/event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(currentEvent),
    });
    setIsModalOpen(false);
    setLoading(false);
    fetchEvents();
  };

  const handleDelete = async (id) => {
    if (!confirm("Устгах уу?")) return;
    await fetch(`/api/event?id=${id}`, { method: "DELETE" });
    fetchEvents();
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-8 bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
        <h1 className="text-xl font-black uppercase tracking-tight">Үйл ажиллагаа</h1>
        <button onClick={() => { 
          setCurrentEvent({ title: "", date: "", purpose: "", description: "", imageUrl: "" });
          setIsModalOpen(true); 
        }} className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold uppercase text-[10px]">
          Шинэ үйл ажиллагаа нэмэх
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {events.map(event => (
          <div key={event._id} className="bg-white p-6 rounded-3xl border border-slate-100 flex items-center gap-6">
            {event.imageUrl && <img src={event.imageUrl} className="w-24 h-24 rounded-2xl object-cover" />}
            <div className="flex-1">
              <span className="text-[10px] font-black text-indigo-500 uppercase">{event.date}</span>
              <h3 className="text-lg font-black text-slate-800">{event.title}</h3>
              <p className="text-xs text-slate-400 line-clamp-1">{event.purpose}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => { setCurrentEvent(event); setIsModalOpen(true); }} className="p-3 bg-slate-50 rounded-xl hover:bg-slate-100">Засах</button>
              <button onClick={() => handleDelete(event._id)} className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all">Устгах</button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[110] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] p-10 shadow-2xl space-y-4">
            <h2 className="text-xl font-black uppercase mb-6">Үйл ажиллагааны мэдээлэл</h2>
            
            <input value={currentEvent.title} onChange={e => setCurrentEvent({...currentEvent, title: e.target.value})} placeholder="Үйл ажиллагааны нэр" className="w-full bg-slate-50 p-4 rounded-xl outline-none font-bold" />
            
            <input type="date" value={currentEvent.date} onChange={e => setCurrentEvent({...currentEvent, date: e.target.value})} className="w-full bg-slate-50 p-4 rounded-xl outline-none font-bold" />
            
            <input value={currentEvent.purpose} onChange={e => setCurrentEvent({...currentEvent, purpose: e.target.value})} placeholder="Зорилго" className="w-full bg-slate-50 p-4 rounded-xl outline-none font-bold" />
            
            <textarea value={currentEvent.description} onChange={e => setCurrentEvent({...currentEvent, description: e.target.value})} placeholder="Тайлбар" rows="4" className="w-full bg-slate-50 p-4 rounded-xl outline-none font-bold resize-none" />
            
            <div className="flex items-center gap-4 p-4 border-2 border-dashed border-slate-100 rounded-xl">
              <input type="file" onChange={e => handleImageUpload(e.target.files[0])} className="text-xs" />
              {currentEvent.imageUrl && <img src={currentEvent.imageUrl} className="w-10 h-10 rounded-lg object-cover" />}
            </div>

            <div className="flex gap-4 pt-6">
              <button onClick={handleSave} disabled={loading} className="flex-1 bg-indigo-600 text-white py-4 rounded-xl font-black uppercase text-xs tracking-widest">
                {loading ? "Хадгалж байна..." : "Хадгалах"}
              </button>
              <button onClick={() => setIsModalOpen(false)} className="px-8 bg-slate-100 text-slate-400 py-4 rounded-xl font-black uppercase text-xs">Болих</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}