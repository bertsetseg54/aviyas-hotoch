import Header from "./Header";
import Nav from "./Nav";

export default function Layout({ children }) {
  return (
    <div className="relative min-h-screen flex flex-col bg-slate-50">

      <Header />

      <main className="flex-1 w-full max-w-[1400px] m-auto px-[5vw] pt-[8vw] pb-[10vw] min-h-screen scroll-smooth">
        {children}
      </main>

      <Nav />
    </div>
  );
}