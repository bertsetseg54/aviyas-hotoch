import Link from "next/link";
import { useRouter } from "next/router";

export default function Nav() {
  const router = useRouter();

  const navItems = [
    { 
      href: "/", 
      label: "Танилцуулга", 
      icon: (
        <>
          <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
          <path d="M12 6l-3.293 3.293a1 1 0 0 0 0 1.414l.543 .543c.69 .69 1.81 .69 2.5 0l1 -1a3.182 3.182 0 0 1 4.5 0l2.25 2.25" />
          <path d="M12.5 15.5l2 2" />
          <path d="M15 13l2 2" />
        </>
      )
    },
    { 
      href: "/food", 
      label: "Цайны газар", 
      icon: (
        <>
          <path d="M7 4v17m-3 -17v3a3 3 0 1 0 6 0v-3" />
          <path d="M17 8m-3 0a3 4 0 1 0 6 0a3 4 0 1 0 -6 0" />
          <path d="M17 12v9" />
        </>
      )
    },
    { 
      href: "/mapPage", 
      label: "Дотоод бүтэц", 
      icon: (
        <>
          <path d="M11 16l-1 -2l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5l-2.916 8.076" />
          <path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
          <path d="M20.2 20.2l1.8 1.8" />
        </>
      )
    },
    { 
      href: "/schedule", 
      label: "Хуваарь", 
      icon: (
        <>
          <path d="M13 5h8" />
          <path d="M13 9h5" />
          <path d="M13 15h8" />
          <path d="M13 19h5" />
          <path d="M3 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
          <path d="M3 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
        </>
      )
    },
    { 
      href: "/event", 
      label: "Үйл ажиллагаа", 
      icon: (
        <>
          <path d="M5 4m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
          <path d="M9 4m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
          <path d="M5 8h4" />
          <path d="M9 16h4" />
          <path d="M13.803 4.56l2.184 -.53c.562 -.135 1.133 .19 1.282 .732l3.695 13.418a1.02 1.02 0 0 1 -.634 1.219l-.133 .041l-2.184 .53c-.562 .135 -1.133 -.19 -1.282 -.732l-3.695 -13.418a1.02 1.02 0 0 1 .634 -1.219l.133 -.041z" />
          <path d="M14 9l4 -1" />
          <path d="M16 16l3.923 -.98" />
        </>
      )
    },
    { 
      href: "/feedback", 
      label: "Хүсэлт", 
      icon: (
        <>
          <path d="M15 19h-10a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v4.5" />
          <path d="M19 22v.01" />
          <path d="M19 19a2.003 2.003 0 0 0 .914 -3.782a1.98 1.98 0 0 0 -2.414 .483" />
          <path d="M3 7l9 6l9 -6" />
        </>
      )
    },
  ];

 return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#F8FAFC]/95 backdrop-blur-md border-t border-gray-200/60 pb-7 pt-3 px-[5vw]">
      <div className="max-w-[1200px] m-auto flex justify-center items-center">
        <ul className="flex items-center gap-[0.8vw] w-full justify-center">
          {navItems.map((item) => {
            const isActive = router.pathname === item.href;
            return (
              <li key={item.href} className="flex-1 text-center">
                <Link
                  href={item.href}
                  className={`
                    flex items-center justify-center gap-[0.8vw] px-[1.5vw] py-[1vw] rounded-[1.2vw] 
                    transition-all duration-200 border-[1.5px] active:scale-95
                    ${isActive 
                      ? "bg-[#0052CC] border-[#0052CC] text-white shadow-md scale-105" 
                      : "bg-white border-[#E2E8F0] text-gray-600 hover:border-gray-400 hover:text-black"}
                  `}
                >
                  <div className="w-[1.8vw] h-[1.8vw] min-w-[20px] min-h-[20px] flex items-center justify-center">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-full h-full"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      {item.icon}
                    </svg>
                  </div>
                  
                  <span className="text-[1vw] min-text-[13px] font-bold uppercase tracking-tight whitespace-nowrap">
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}