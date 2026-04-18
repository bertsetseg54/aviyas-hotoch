import AdminNav from "@/components/AdminNav";
import AdminMap from "@/components/AdminMap";

export default function MapCrudPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-[5vw]">
      <AdminNav />
      <main className="mt-8">
        <AdminMap />
      </main>
    </div>
  );
}