import Link from "next/link";

export default function Nav() {
  return (
    <div className="text-[#fff] fixed bottom-[0px] right-0 left-0 bg-[#fff] pb-[20px]">
      <ul className="gap-8 w-full menu">
        <li className=" bg-[#5CCAE5]  hover:bg-[#42A2BA]">
          <Link href="/" className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="60"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-heart-handshake"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
              <path d="M12 6l-3.293 3.293a1 1 0 0 0 0 1.414l.543 .543c.69 .69 1.81 .69 2.5 0l1 -1a3.182 3.182 0 0 1 4.5 0l2.25 2.25" />
              <path d="M12.5 15.5l2 2" />
              <path d="M15 13l2 2" />
            </svg>
            <p className="uppercase">Танилцуулга</p>
          </Link>
        </li>
        <li className="bg-[#C16363]  hover:bg-[#933333]">
          <Link href="/food">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="60"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-tools-kitchen-3"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M7 4v17m-3 -17v3a3 3 0 1 0 6 0v-3" />
              <path d="M17 8m-3 0a3 4 0 1 0 6 0a3 4 0 1 0 -6 0" />
              <path d="M17 12v9" />
            </svg>
            <p>Цайны газар</p>
          </Link>
        </li>
        <li className="bg-[#A2C163]  hover:bg-[#87A942]">
          <Link href="/mapPage">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="60"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-location-search"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M11 16l-1 -2l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5l-2.916 8.076" />
              <path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
              <path d="M20.2 20.2l1.8 1.8" />
            </svg>
            <p>Дотоод бүтэц</p>
          </Link>
        </li>
        <li className="bg-[#65C18E] hover:bg-[#3EA06A]">
          <Link href="/schedule">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="60"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-list-details"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M13 5h8" />
              <path d="M13 9h5" />
              <path d="M13 15h8" />
              <path d="M13 19h5" />
              <path d="M3 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
              <path d="M3 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
            </svg>
            <p>Хичээлийн хуваарь</p>
          </Link>
        </li>
        <li className="bg-[#62A9BB]  hover:bg-[#41899D]">
          <Link href="/event">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="60"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-books"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M5 4m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
              <path d="M9 4m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
              <path d="M5 8h4" />
              <path d="M9 16h4" />
              <path d="M13.803 4.56l2.184 -.53c.562 -.135 1.133 .19 1.282 .732l3.695 13.418a1.02 1.02 0 0 1 -.634 1.219l-.133 .041l-2.184 .53c-.562 .135 -1.133 -.19 -1.282 -.732l-3.695 -13.418a1.02 1.02 0 0 1 .634 -1.219l.133 -.041z" />
              <path d="M14 9l4 -1" />
              <path d="M16 16l3.923 -.98" />
            </svg>
            <p>Үйл ажиллагаа</p>
          </Link>
        </li>
        <li className="bg-[#6666C0]  hover:bg-[#4444A8]">
          <Link href="/feedback">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="60"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-mail-question"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M15 19h-10a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v4.5" />
              <path d="M19 22v.01" />
              <path d="M19 19a2.003 2.003 0 0 0 .914 -3.782a1.98 1.98 0 0 0 -2.414 .483" />
              <path d="M3 7l9 6l9 -6" />
            </svg>
            <p>Санал хүсэлт</p>
          </Link>
        </li>
      </ul>
    </div>
  );
}
