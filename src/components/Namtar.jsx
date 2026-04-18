export default function Namtar() {
  const stats = [
    { label: "Үүсгэн байгуулагдсан", value: "2011 он" },
    { label: "Нийт суралцагч", value: "835+" },
    { label: "Багш, ажилтан", value: "94" },
    { label: "Бүлэг", value: "33" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-2 py-4 text-gray-800">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Зүүн тал: Түүхэн замнал (Timeline хэлбэрээр) */}
        <div className="lg:col-span-7 space-y-8">
          <div className="relative border-l-2 border-blue-100 pl-8 ml-4">
            {/* Үүсгэн байгуулагдсан */}
            <div className="relative mb-10">
              <div className="absolute -left-[41px] top-0 w-4 h-4 rounded-full bg-blue-600 border-4 border-white"></div>
              <h3 className="text-lg font-bold text-blue-700 mb-2">Эхлэл ба Зорилго</h3>
              <p className="text-gray-600 leading-relaxed text-base">
                Ерөнхий боловсролын "Авьяас" сургууль Монгол улсын “Боловсрол” Үндэсний хөтөлбөрт тусгагдсан бага, дунд ангийн сурагчдын авьяас билгийг тодруулан, Хөвсгөл нутгийн 6 ястны өв соёлыг өвлүүлэн хөгжүүлэх эрхэм зорилгоор байгуулагдсан.
              </p>
            </div>

            {/* Шинэчлэл */}
            <div className="relative mb-10">
              <div className="absolute -left-[41px] top-0 w-4 h-4 rounded-full bg-blue-400 border-4 border-white"></div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Бүтэц ба Шинэчлэл</h3>
              <p className="text-gray-600 leading-relaxed text-base">
                2014 онд урлагийн төрөлжсөн сургалттай сургууль болж өргөжсөн бол 2017 онд БСШУ-ны сайдын А/244 дүгээр тушаалаар Мөрөн сумын ерөнхий боловсролын “Авьяас” сургууль болон өөрчлөгдсөн.
              </p>
            </div>

            {/* Одоогийн байдал */}
            <div className="relative">
              <div className="absolute -left-[41px] top-0 w-4 h-4 rounded-full bg-green-500 border-4 border-white"></div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Өнөөдөр</h3>
              <p className="text-gray-600 leading-relaxed text-base">
                Анх 108 суралцагчтай эхэлж байсан бол одоо нийт 33 бүлэгт 835 суралцагч суралцаж, чадварлаг 94 багш, ажилтны бүрэлдэхүүнтэйгээр үйл ажиллагаагаа явуулж байна.
              </p>
            </div>
          </div>
        </div>

        {/* Баруун тал: Тоон үзүүлэлтүүд (Stats) */}
        <div className="lg:col-span-5">
          <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 shadow-sm">
            <h3 className="text-xl font-bold mb-6 text-gray-900 text-center lg:text-left">
              Сургуулийн үзүүлэлт:
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-50 flex flex-col items-center justify-center transition-transform hover:scale-105">
                  <span className="text-xl font-black text-blue-600 mb-1">{stat.value}</span>
                  <span className="text-[10px] text-gray-400 font-bold uppercase text-center tracking-tighter">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-6 py-4 border-t border-gray-100 flex flex-col items-center">
              <p className="text-gray-500 italic text-[14px] font-medium text-center">
                "Авьяасыг нээж, Ирээдүйг гэрэлтүүлнэ"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}