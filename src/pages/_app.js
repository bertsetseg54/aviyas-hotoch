import "@/styles/globals.css";
import Layout from "../components/Layout";
import { ClassProvider } from "../context/ClassContext";
import { TeacherProvider } from "../context/TeacherContext";
import { FoodProvider } from "../context/FoodContext";
import { CalendarProvider } from "../context/CalenderContext";
import { useRouter } from "next/router";
import AuthGuard from "@/components/AuthGuard";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  // /login хуудас болон /crud-р эхэлсэн бүх хуудсууд дээр Layout-ыг харуулахгүй
  const isNoLayoutPage = 
    router.pathname === "/login" || 
    router.pathname.startsWith("/crud"); 

  return (
    <CalendarProvider>
      <TeacherProvider>
        <ClassProvider>
          <FoodProvider>
            <AuthGuard>
              {isNoLayoutPage ? (
                <Component {...pageProps} />
              ) : (
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              )}
            </AuthGuard>
          </FoodProvider>
        </ClassProvider>
      </TeacherProvider>
    </CalendarProvider>
  );
}