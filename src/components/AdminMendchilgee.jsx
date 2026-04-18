import { useState, useEffect } from "react";

export default function AdminMendchilgee() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(""); // "", "success", "error"
  const [reviewData, setReviewData] = useState(null);
  const [formData, setFormData] = useState({
    name: "", role: "", content: "", image: "",
  });

  useEffect(() => {
    fetch("/api/introduction/mendchilgee")
      .then(res => res.json())
      .then(val => {
        if (val && val.content) {
          setFormData({ ...val, content: val.content.join("\n\n") });
          setReviewData(val);
        }
      });
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "school_test");

    setLoading(true);
    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dulykw6yg/image/upload", {
        method: "POST", body: data
      });
      const fileData = await res.json();
      if (res.ok) {
        setFormData(prev => ({ ...prev, image: fileData.secure_url }));
        setStatus("img_success");
        setTimeout(() => setStatus(""), 3000);
      }
    } catch (err) {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!formData.name || !formData.content) {
      setStatus("error");
      setTimeout(() => setStatus(""), 3000);
      return;
    }

    setLoading(true);
    const bodyToSend = {
      ...formData,
      content: formData.content.split("\n\n"),
    };

    try {
      const res = await fetch("/api/introduction/mendchilgee", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyToSend),
      });

      if (res.ok) {
        setReviewData(bodyToSend);
        setStatus("success");
        setTimeout(() => setStatus(""), 3000);
      }
    } catch (error) {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 relative">


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

      <div className="grid lg:grid-cols-12 gap-10">
        {/* FORM ХЭСЭГ */}
        <div className="lg:col-span-4 bg-white p-8 rounded-[30px] shadow-sm border border-slate-200">
          <h2 className="text-xl font-black text-slate-800 uppercase mb-6 italic">Засварлах</h2>
          
          <div className="space-y-5">
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-black text-slate-500 uppercase ml-1">1. Захирлын зураг</label>
              <div className={`relative border-2 border-dashed rounded-2xl p-4 transition-colors ${status === "img_success" ? "border-emerald-500 bg-emerald-50" : "border-slate-100 hover:bg-slate-50"}`}>
                <input type="file" onChange={handleImageUpload} className="w-full text-xs cursor-pointer outline-none" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-black text-slate-500 uppercase ml-1">2. Бүтэн нэр</label>
              <input
                type="text"
                className="w-full p-4 bg-slate-50 rounded-2xl outline-none font-bold border-2 border-transparent focus:border-blue-500/20"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-black text-slate-500 uppercase ml-1">3. Албан тушаал</label>
              <input
                type="text"
                className="w-full p-4 bg-slate-50 rounded-2xl outline-none font-bold border-2 border-transparent focus:border-blue-500/20"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-black text-slate-500 uppercase ml-1">4. Мэндчилгээний текст</label>
              <textarea
                className="w-full p-4 bg-slate-50 rounded-2xl outline-none h-64 resize-none leading-relaxed border-2 border-transparent focus:border-blue-500/20"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              />
            </div>

            <button
              onClick={handleSave}
              disabled={loading}
              className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black uppercase text-sm hover:bg-blue-600 transition-all active:scale-95 disabled:bg-slate-200"
            >
              {loading ? "Хадгалж байна..." : "Өгөгдлийг шинэчлэх"}
            </button>
          </div>
        </div>

        {/* PREVIEW ХЭСЭГ */}
        <div className="lg:col-span-8">
          {reviewData && (
            <div className="bg-white rounded-[40px] shadow-2xl border border-slate-50 p-10 md:p-14 opacity-80 scale-95 origin-top">
              <div className="flex flex-col md:flex-row gap-12">
                <div className="w-full md:w-1/3 flex flex-col items-center">
                  <img src={reviewData.image || "/images/principal.jpg"} className="w-64 h-80 rounded-[2.5rem] object-cover shadow-2xl" alt="Preview" />
                  <div className="text-center mt-6">
                    <h3 className="text-2xl font-black text-slate-900">{reviewData.name}</h3>
                    <p className="text-blue-600 font-black text-xs uppercase mt-2">{reviewData.role}</p>
                  </div>
                </div>
                <div className="w-full md:w-2/3 bg-slate-50/50 p-8 md:p-12 rounded-[3rem] relative">
                  <h1 className="text-2xl font-black text-slate-900 mb-8 border-b pb-6 border-blue-50">Preview</h1>
                  <div className="space-y-6 text-slate-700 leading-relaxed text-lg">
                    {reviewData.content.map((p, i) => <p key={i}>{p}</p>)}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}