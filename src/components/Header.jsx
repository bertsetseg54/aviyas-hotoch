import { useEffect, useState } from "react";
import Link from "next/link";

export default function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // LocalStorage-оос хэрэглэгчийн мэдээллийг авах
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login'; // Шууд redirect
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 sm:pt-[1.5vw] pointer-events-none">
      <div className="max-w-[1200px] w-full bg-white/85 backdrop-blur-xl border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.04)] rounded-[20px] sm:rounded-[1.5vw] p-3 sm:p-[0.8vw] px-6 sm:px-[1.5vw] pointer-events-auto transition-all duration-300">
        <div className="flex items-center justify-between">
          
          {/* Зүүн тал: Лого болон Гарчиг */}
          <div className="flex items-center gap-4 sm:gap-[1.5vw]">
            <Link href="/" className="shrink-0 group">
              <div className="h-[42px] w-[42px] sm:h-[3.3vw] sm:w-[3.3vw] sm:min-h-[42px] sm:min-w-[42px] transition-transform duration-300 group-hover:scale-105">
                <img
                  src="/Schoollogo.jpg"
                  alt="Logo"
                  className="h-full w-full object-cover rounded-lg"
                />
              </div>
            </Link>

            <div className="h-[24px] sm:h-[2vw] w-[1px] bg-gray-200/60 shrink-0"></div>

            <div className="flex flex-col justify-center min-w-0">
              <h1 className="text-[16px] sm:text-[1.2vw] font-black text-slate-800 uppercase leading-none tracking-tight whitespace-nowrap">
                "Авьяас" Сургууль
              </h1>
              <p className="text-[11px] sm:text-[0.75vw] font-bold text-blue-600 uppercase tracking-[0.25em] mt-1.5 opacity-90 leading-none whitespace-nowrap">
                Дижитал Хөтөч
              </p>
            </div>
          </div>

          {/* Баруун тал: Хэрэглэгч болон Гарах товч */}
          {user && (
            <div className="flex items-center gap-4 sm:gap-[1.5vw]">
              <div className="hidden md:flex flex-col items-end">
                <span className="text-[10px] font-black text-slate-800 uppercase tracking-tight">
                  {user.username}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-slate-50 hover:bg-red-50 border border-slate-100 hover:border-red-100 px-4 py-2 rounded-xl transition-all group active:scale-95"
              >
                <span className="text-[9px] font-black text-slate-500 group-hover:text-red-600 uppercase tracking-widest transition-colors">
                  Гарах
                </span>
                <svg 
                  className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-600 transition-colors" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          )}

        </div>
      </div>
    </header>
  );
}