import { useEffect, useState } from "react";
import { useRouter } from "next/router"; // Чиглүүлэлт хийхэд хэрэгтэй
import Introduction from "../components/Introduction";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Бусад state-үүд (Бүртгэл хийхэд ашиглагдаж байгаа бол хэвээр үлдээнэ)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const [users, setUsers] = useState([]);
  const [connError, setConnError] = useState('');

  useEffect(() => {
    // 1. LocalStorage-оос хэрэглэгчийг шалгах
    const storedUser = localStorage.getItem('user');
    
    if (!storedUser) {
      // Хэрэглэгч нэвтрээгүй бол нэвтрэх хуудас руу шилжүүлнэ
      router.push('/login'); 
    } else {
      // Нэвтэрсэн бол мэдээллийг нь state-д хадгалаад уншиж дуусгана
      setUser(JSON.parse(storedUser));
      setLoading(false);
      fetchUsers(); // Хэрэглэгчдийг татах функц
    }
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/users');
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  // Уншиж байх явцад юу ч харуулахгүй эсвэл Loading харуулна
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 animate-pulse">
          Түр хүлээнэ үү...
        </p>
      </div>
    );
  }

  // Зөвхөн нэвтэрсэн үед харагдах хэсэг
  return (
    <div className="relative">
      {/* Хэрэглэгчийн нэрийг Introduction-д pass хийж өгч болно */}
      <Introduction user={user} />
      
      {/* Шаардлагатай бол бүртгэлийн формоо энд харуулж болно */}
    </div>
  );
}