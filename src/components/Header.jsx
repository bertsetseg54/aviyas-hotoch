import { useEffect, useState } from "react";
import Link from "next/link";

export default function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-[5vw] pt-[1.2vw] pointer-events-none font-sans">
      <div className="max-w-[1200px] w-full m-auto bg-[#F8FAFC]/95 backdrop-blur-md border border-gray-200/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)] rounded-[1.2vw] p-[0.7vw] px-[1.5vw] pointer-events-auto transition-all duration-200">
        <div className="grid grid-cols-3 items-center w-full">
          
          {/* 1. Зүүн хэсэг: Лого болон Нэр */}
          <div className="flex items-center gap-[1vw] justify-self-start">
            <Link href="/" className="shrink-0">
              <div className="h-[3.3vw] w-[3.3vw] rounded-[0.8vw] overflow-hidden border-[0.1vw] border-slate-100 shrink-0 shadow-sm">
                <img
                  src="/Schoollogo.jpg"
                  alt="Logo"
                  className="h-full w-full object-cover"
                />
              </div>
            </Link>
            <div className="h-[2vw] w-[1px] bg-gray-200/60"></div>
            <div className="flex flex-col">
              <h1 className="text-[1.1vw] font-black text-slate-800 uppercase leading-none tracking-tight whitespace-nowrap">
                "Авьяас" Сургууль
              </h1>
              <p className="text-[0.7vw] font-black text-blue-600 uppercase tracking-[0.25em] mt-[0.3vw] leading-none whitespace-nowrap">
                Дижитал Хөтөч
              </p>
            </div>
          </div>

          {/* 2. Гол хэсэг: Хоосон (Эсвэл ирээдүйд цэс нэмж болно) */}
          <div></div>

          {/* 3. Баруун хэсэг: Хэрэглэгч болон Гарах */}
          <div className="flex items-center gap-[1vw] justify-self-end">
            {user && (
              <div className="flex items-center gap-[1vw]">
                <div className="hidden md:flex flex-col items-end leading-none">
                  <span className="text-[0.85vw] font-black text-slate-800 uppercase tracking-tight whitespace-nowrap">
                    {user.username}
                  </span>
                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-[0.6vw] bg-white hover:bg-red-50 border-[0.1vw] border-[#E2E8F0] hover:border-red-200 px-[1.2vw] py-[0.7vw] rounded-[1vw] transition-all active:scale-95 group shrink-0 shadow-sm"
                >
                  <span className="text-[0.8vw] font-black text-slate-600 group-hover:text-red-600 uppercase tracking-wider leading-none">
                    Гарах
                  </span>
                  <div className="w-[1vw] h-[1vw] shrink-0">
                    <svg 
                      className="w-full h-full text-slate-400 group-hover:text-red-600 transition-colors" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="3" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </div>
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}