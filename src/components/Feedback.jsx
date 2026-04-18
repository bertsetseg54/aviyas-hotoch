export default function Feedback() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center items-center px-4 py-10">
      
      {/* Мэдээллийн хэсэг */}
      <div className="text-center mb-8 max-w-xl">
        <div className="inline-block px-3 py-1 bg-red-50 rounded-full mb-4">
          <p className="text-[9px] font-black text-red-600 uppercase tracking-[0.2em]">
            Аюулгүй орчин - Бид хамтдаа
          </p>
        </div>
        
        <h1 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tighter mb-2">
          Дээрэлхэлтийг <span className="text-blue-600">зогсооё</span>
        </h1>
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
          Таны мэдээллийг бид чандлан нууцална
        </p>
      </div>

      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2.5rem] blur opacity-5 group-hover:opacity-10 transition duration-500"></div>
        
        <div className="relative bg-white shadow-[0_20px_40px_rgba(0,0,0,0.03)] border border-slate-100 rounded-[2.2rem] p-6 md:p-8 flex flex-col items-center gap-6 transition-all duration-500 hover:translate-y-[-3px]">
          
          <div className="bg-slate-50 p-4 rounded-[1.5rem] border border-slate-100">
            {/* АНХААР: src замыг шалгаарай */}
            <img
              src="/qrcode_334888062_d643bee510d59c8b714289e2075ce6b8.png"
              alt="QR Code"
              className="w-56 h-56 md:w-64 md:h-64 object-contain mix-blend-multiply"
            />
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-[1px] bg-blue-600/20"></div>
              <p className="text-[9px] font-black text-blue-600 uppercase tracking-[0.3em]">Scan to report</p>
              <div className="w-6 h-[1px] bg-blue-600/20"></div>
            </div>
            
            <p className="text-slate-600 font-bold text-[12px] text-center max-w-[220px] leading-snug">
              Ухаалаг утсаараа QR кодыг уншуулж мэдээллээ ирүүлнэ үү
            </p>
          </div>

          {/* Доод талын иконнууд */}
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-slate-50 rounded-xl flex items-center justify-center text-sm">📱</div>
            <div className="w-8 h-8 bg-slate-50 rounded-xl flex items-center justify-center text-sm">🛡️</div>
            <div className="w-8 h-8 bg-slate-50 rounded-xl flex items-center justify-center text-sm">🤝</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-[8px] text-slate-300 font-black uppercase tracking-[0.4em]">
          Авьяас ЕБС - 2026
        </p>
      </div>
    </div>
  );
}