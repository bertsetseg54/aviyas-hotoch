import { useState } from 'react';
import Head from 'next/head';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Нэр эсвэл нууц үг буруу");
      }

      if (data && data.role) {
        // LocalStorage-д хэрэглэгчийг хадгалах
        localStorage.setItem('user', JSON.stringify(data));

        // Зөвхөн 3 ролд хувааж Redirect хийх
        switch (data.role) {
          case 'admin':
            window.location.href = '/crud/introduction'; // Админ хэсэг
            break;
          case 'worker':
            window.location.href = '/worker-dashboard'; // Ажилтан хэсэг
            break;
          case 'user':
          default:
            window.location.href = '/'; // Жирийн хэрэглэгч
            break;
        }
      }
    } catch (err) {
      setError(err.message); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center items-center px-6 text-slate-700">
      <Head>
        <title>Нэвтрэх | Авьяас сургууль</title>
      </Head>

      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-100 p-10">
        <div className="text-center mb-10">
          {/* Логоны хэсэг - Дизайныг хэвээр үлдээв */}
          <div className="w-20 h-20 bg-[#0052CC] rounded-[1.8rem] mx-auto mb-6 flex items-center justify-center shadow-2xl shadow-blue-100">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A10.003 10.003 0 0012 21a10.003 10.003 0 008.384-4.562l.054.09m-3.287-2.04l.054.09A10.003 10.003 0 0020 12c0-5.523-4.477-10-10-10S0 6.477 0 12c0 1.891.524 3.66 1.438 5.168l.054-.09m12.158-1.977A10.003 10.003 0 0020 12c0-5.523-4.477-10-10-10S0 6.477 0 12c0 1.891.524 3.66 1.438 5.168l.054-.09" />
            </svg>
          </div>
          <h2 className="text-2xl font-black uppercase tracking-tighter text-slate-900">Системд нэвтрэх</h2>
          <p className="text-[#0052CC] text-[10px] mt-2 font-black uppercase tracking-[0.3em]">Хэрэглэгчийн эрх</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-500 text-[10px] font-black rounded-2xl text-center uppercase tracking-wider">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-[9px] font-black text-slate-400 uppercase ml-4 mb-2 block tracking-widest text-left">Нэвтрэх нэр</label>
            <input 
              type="text" 
              placeholder="Username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)} 
              required 
              className="w-full px-7 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-500/5 focus:border-[#0052CC] outline-none transition-all font-bold text-sm"
            />
          </div>

          <div>
            <label className="text-[9px] font-black text-slate-400 uppercase ml-4 mb-2 block tracking-widest text-left">Нууц үг</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              required 
              className="w-full px-7 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-500/5 focus:border-[#0052CC] outline-none transition-all font-bold text-sm"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-5 rounded-[1.5rem] font-black text-white uppercase tracking-[0.25em] shadow-xl transition-all active:scale-[0.98] mt-6 text-[11px]
              ${loading 
                ? "bg-slate-200 cursor-not-allowed text-slate-400" 
                : "bg-[#0052CC] hover:bg-blue-700 shadow-blue-100 hover:shadow-blue-200"}`}
          >
            {loading ? "Түр хүлээнэ үү..." : "Нэвтрэх"}
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-[9px] text-slate-300 font-black uppercase tracking-[0.4em]">
            Авьяас ЕБС - 2026
          </p>
        </div>
      </div>
    </div>
  );
}