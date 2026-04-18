import AdminNav from "@/components/AdminNav";
import AdminEvent from "@/components/AdminEvent";

export default function EventCrudPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-[5vw]">
      <AdminNav />
      <main className="mt-8">
        <AdminEvent />
      </main>
    </div>
  );
}