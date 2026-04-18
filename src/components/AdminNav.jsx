import Link from "next/link";
import { useRouter } from "next/router";

export default function AdminNav() {
  const router = useRouter();

  const handleLogout = () => {
    if (confirm("Та системээс гарахдаа итгэлтэй байна уу?")) {
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
  };

  const navItems = [
    { 
        href: "/crud/introduction", // Ийшээ шилжүүлнэ
        label: "Танилцуулга", 
        isSpecial: true,
        icon: <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4M13.5 6.5l4 4" />
    },
    { 
      href: "/crud/food", 
      label: "Цайны газар", 
      icon: <path d="M7 4v17m-3 -17v3a3 3 0 1 0 6 0v-3M17 8m-3 0a3 4 0 1 0 6 0a3 4 0 1 0 -6 0M17 12v9" />
    },
    { 
      href: "/crud/map", 
      label: "Дотоод бүтэц", 
      icon: <path d="M11 16l-1 -2l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5l-2.916 8.076M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0M20.2 20.2l1.8 1.8" />
    },
    { 
      href: "/crud/schedule", 
      label: "Хуваарь", 
      icon: <path d="M13 5h8M13 9h5M13 15h8M13 19h5M3 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1zM3 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
    },
    { 
      href: "/crud/event", 
      label: "Үйл ажиллагаа", 
      icon: <path d="M5 4m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1zM9 4m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1zM5 8h4M9 16h4M13.803 4.56l2.184 -.53c.562 -.135 1.133 .19 1.282 .732l3.695 13.418a1.02 1.02 0 0 1 -.634 1.219l-.133 .041l-2.184 .53c-.562 .135 -1.133 -.19 -1.282 -.732l-3.695 -13.418a1.02 1.02 0 0 1 .634 -1.219l.133 -.041zM14 9l4 -1M16 16l3.923 -.98" />
    },
    { 
      href: "/feedback", 
      label: "Хүсэлт", 
      icon: <path d="M15 19h-10a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v4.5M19 22v.01M19 19a2.003 2.003 0 0 0 .914 -3.782a1.98 1.98 0 0 0 -2.414 .483M3 7l9 6l9 -6" />
    },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900 border-b border-slate-800 h-16 px-[5vw]">
      <div className="max-w-[1400px] h-full m-auto flex justify-between items-center gap-4">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-8 h-8 bg-amber-500 rounded flex items-center justify-center font-black text-white text-xs">A</div>
          <span className="text-white font-black text-[10px] uppercase tracking-widest hidden md:block">Admin</span>
        </Link>

        {/* Navigation Items */}
        <div className="flex-1 overflow-x-auto no-scrollbar scroll-smooth">
          <ul className="flex items-center gap-2">
            {navItems.map((item) => {
              const isActive = router.pathname === item.href;
              return (
                <li key={item.href} className="flex-shrink-0">
                  <Link
                    href={item.href}
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 border
                      ${isActive 
                        ? "bg-amber-500 border-amber-500 text-white shadow-lg" 
                        : item.isSpecial 
                          ? "bg-amber-500/10 border-amber-500/40 text-amber-500 hover:bg-amber-500/20" 
                          : "bg-slate-800 border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700"}
                    `}
                  >
                    <div className="w-4 h-4 flex-shrink-0">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        {item.icon}
                      </svg>
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-tight whitespace-nowrap">
                      {item.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Logout */}
        <button 
          onClick={handleLogout}
          className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-2 rounded-xl text-[10px] font-black uppercase hover:bg-red-500 hover:text-white transition-all flex-shrink-0"
        >
          Гарах
        </button>

      </div>
    </nav>
  );
}