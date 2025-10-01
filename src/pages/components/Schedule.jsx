import { useState } from "react";
import TeacherSchedule from "./TeacherSchedule";
import ClassSchedule from "./ClassSchedule";

export default function Schedule() {
  const [huvaari, setHuvaari] = useState("teacher"); // эхлэхдээ Багш-г default болгосон

  return (
    <div className="flex justify-center w-full">
      <div className="flex gap-10 w-full p-8 ">
        {/* Зүүн талын меню */}
        <div className="flex flex-col gap-3 w-56 bg-white border border-gray-200 rounded-xl shadow-sm p-4 ">
          <button
            className={`px-5 py-3 rounded-lg text-lg font-medium transition ${
              huvaari === "teacher"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setHuvaari("teacher")}
          >
            Багш
          </button>
          <button
            className={`px-5 py-3 rounded-lg text-lg font-medium transition ${
              huvaari === "class"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setHuvaari("class")}
          >
            Анги
          </button>
        </div>

        {/* Баруун талын контент */}
        <div className="flex-1 bg-white shadow-sm rounded-xl p-8 border border-gray-200">
          {huvaari === "teacher" && <TeacherSchedule />}
          {huvaari === "class" && <ClassSchedule />}
        </div>
      </div>
    </div>
  );
}
