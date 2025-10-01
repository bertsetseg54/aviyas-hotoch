import "@/styles/globals.css";
import Layout from "./components/Layout";
import { ClassProvider } from "../context/ClassContext";
import { TeacherProvider } from "../context/TeacherContext";
import { FoodProvider } from "../context/FoodContext";
import { CalendarProvider } from "../context/CalenderContext";

export default function App({ Component, pageProps }) {
  return (
    <CalendarProvider>
      <TeacherProvider>
        <ClassProvider>
          <FoodProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </FoodProvider>
        </ClassProvider>
      </TeacherProvider>
    </CalendarProvider>
  );
}
