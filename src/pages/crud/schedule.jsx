import AdminNav from "@/components/AdminNav";
import AdminSchedule from "@/components/AdminSchedule";

export default function ScheduleManagementPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-[5vw]">
      {/* Дээд навигаци */}
      <AdminNav />
      
      {/* Хичээлийн хуваарийн CRUD хэсэг */}
      <main className="mt-8">
        <AdminSchedule />
      </main>

      {/* Footer байхгүй, хэрэггүй */}
    </div>
  );
}