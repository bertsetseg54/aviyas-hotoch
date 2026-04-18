import { useState, useEffect } from "react";

export default function Aviyasinbaharhal() {
  const [selectedId, setSelectedId] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/api/proud").then(res => res.json()).then(data => setPosts(Array.isArray(data) ? data : []));
  }, []);

  if (selectedId) {
    const post = posts.find((p) => p._id === selectedId);
    if (!post) return null;
    return (
      <div className="max-w-5xl mx-auto p-4 font-sans">
        <button onClick={() => setSelectedId(null)} className="mb-4 flex items-center gap-2 text-gray-400 transition-colors text-[11px] font-bold uppercase">
          ← БУЦАХ
        </button>

        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col md:flex-row min-h-[400px]">
          <div className="w-full md:w-1/2 bg-gray-50 flex items-center justify-center p-2">
            <img src={post.image} className="w-full h-full max-h-[500px] object-contain rounded-lg" alt={post.title} />
          </div>

          <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
            <div className="text-gray-400 text-[11px] mb-2 font-bold uppercase tracking-wider">
              {post.date} • {post.location}
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 leading-tight uppercase tracking-tighter">
              {post.title}
            </h1>
            <div className="text-gray-600 leading-relaxed text-sm md:text-base mb-8">
              <p className="whitespace-pre-line font-medium">{post.fullContent}</p>
            </div>

            <div className="pt-6 border-t border-gray-100">
              <div className="flex items-center gap-4">
                <div className="h-[1px] flex-grow bg-blue-50"></div>
                <span className="text-sm font-bold text-blue-900 uppercase tracking-widest">
                  Авьяас · Амжилт · Бахархал
                </span>
                <div className="h-[1px] flex-grow bg-blue-50"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 font-sans">
      {posts.map((post) => (
        <div 
          key={post._id} 
          className="bg-white rounded-xl border border-gray-200 overflow-hidden cursor-pointer flex flex-col h-full"
          onClick={() => setSelectedId(post._id)}
        >
          <div className="aspect-[4/3] bg-gray-50 overflow-hidden">
            <img src={post.image} className="w-full h-full object-cover" alt="" />
          </div>
          <div className="p-4 flex-grow">
            <p className="text-[10px] text-gray-400 font-bold mb-1 uppercase">{post.date}</p>
            <h3 className="font-bold text-gray-800 text-sm mb-2 line-clamp-2 uppercase leading-snug">{post.title}</h3>
            <p className="text-gray-500 text-xs line-clamp-2 font-medium">{post.content}</p>
          </div>
          <div className="px-4 pb-4">
            <span className="text-blue-600 text-[11px] font-bold uppercase">УНШИХ →</span>
          </div>
        </div>
      ))}
    </div>
  );
}