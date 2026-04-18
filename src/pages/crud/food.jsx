import AdminNav from "@/components/AdminNav";
import AdminFood from "@/components/AdminFood";
import Head from "next/head";

export default function FoodAdminPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      <Head>
        <title>Цайны газар засах | Admin</title>
      </Head>

      <AdminNav />

      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-10 text-center">
          <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">
            Цайны газрын <span className="text-blue-600">мэдээлэл засах</span>
          </h1>
          <p className="text-slate-400 text-xs font-bold mt-2 uppercase tracking-widest">
            Долоо хоног болон гарагийн цэс удирдах
          </p>
        </div>

        {/* Таны хийсэн AdminFood компонент энд орно */}
        <AdminFood />
      </div>
    </div>
  );
}