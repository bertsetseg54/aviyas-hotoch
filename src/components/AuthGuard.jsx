import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function AuthGuard({ children }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // Нэвтрэх шаардлагагүй хуудсууд (Жишээ нь: /login)
    const publicPaths = ['/login'];
    const path = router.asPath.split('?')[0];

    const checkAuth = () => {
      const user = localStorage.getItem('user');
      
      if (!user && !publicPaths.includes(path)) {
        setAuthorized(false);
        router.push('/login');
      } else {
        setAuthorized(true);
      }
    };

    checkAuth();

    // Хуудас хооронд шилжих болгонд шалгана
    router.events.on('routeChangeComplete', checkAuth);

    return () => {
      router.events.off('routeChangeComplete', checkAuth);
    };
  }, [router]);

  // Зөвхөн баталгаажсан эсвэл нээлттэй хуудас бол агуулгыг харуулна
  return authorized ? children : null;
}