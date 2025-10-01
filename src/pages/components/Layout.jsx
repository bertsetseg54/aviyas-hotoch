import Header from "./Header";
import Nav from "./Nav";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      {/* main content scrollable */}
      <div className="flex-1 overflow-auto mb-[160px] scroll-smooth">
        {children}
      </div>
      <Nav />
    </div>
  );
}
