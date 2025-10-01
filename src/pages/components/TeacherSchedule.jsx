import { useState } from "react";
import teacher, { useTeachers } from "../../context/TeacherContext";

export default function TeacherSchedule() {
  const [selectItem, setSelectItem] = useState(null);
  const { teachers, setTeachers } = useTeachers();
  return (
    <div className="flex flex-wrap w-full gap-6">
      {teachers.map((data, item) => {
        return (
          <div
            key={item}
            className="flex p-[20px] w-[30%] gap-4 rounded-lg divshadow h-[230px] justify-around"
          >
            <div className="w-[30%] flex items-center  h-[100%] overflow-hidden h-[80%]">
              <img src={data.pic} alt="" className="rounded-sm h-full w-full" />
            </div>
            <div className="flex flex-col w-[68%] justify-between p-[20px]">
              <div className="flex flex-col justify-between">
                <p className="text-xl font-semibold">{data.teacherName}</p>
                <p className="text-lg font-light text-[#34495e] ">
                  {data.zan + "ы заах аргын нэгдэл •" + data.hicheel}
                </p>
              </div>
              <div>
                <button
                  className="btn uppercase border border-[#85929e] font-medium"
                  onClick={() => setSelectItem(data)}
                >
                  Хуваарь харах
                </button>
              </div>
            </div>
          </div>
        );
      })}

      {selectItem && (
        <div className="fixed z-1000 top-0 left-0 h-[100vh] w-[100vw] flex justify-center items-center">
          <button
            onClick={() => setSelectItem(null)}
            className="fixed z-1 top-0 left-0 h-[100vh] w-[100vw] bg-[black] opacity-[50%] "
          ></button>
          <div className="bg-[#fff] z-2 p-4 rounded-[20px]">
            <h1 className="text-2xl font-bold text-blue-500 mb-4 border-b pb-2 shadow-sm">
              {selectItem.teacherName} багшийн хичээлийн хуваарь
            </h1>

            <div>
              <h2 className="text-xl font-bold mb-4">Өглөөний хуваарь</h2>
              <table className="table-auto border-collapse border border-gray-300 w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2">#</th>
                    {[
                      "Цаг",
                      "Даваа",
                      "Мягмар",
                      "Лхагва",
                      "Пүрэв",
                      "Баасан",
                    ].map((num) => (
                      <th
                        key={num}
                        className="border border-gray-300 px-4 py-2 w-[150px]"
                      >
                        {num}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {selectItem.tbUgluu.map((item, rowIndex) => (
                    <tr key={rowIndex}>
                      <td className="border border-gray-300 px-4 py-2 font-bold">
                        {rowIndex + 1}
                      </td>
                      {[...Array(6)].map((_, colIndex) => (
                        <td
                          key={colIndex}
                          className="border border-gray-300 px-4 py-2 text-center w-[150px]"
                        >
                          {item.time[colIndex] || "-"}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <h2 className="text-xl mt-[20px] font-bold mb-4">
                Өдрийн хуваарь
              </h2>
              <table className="table-auto border-collapse border border-gray-300 w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2">#</th>
                    {[
                      "Цаг",
                      "Даваа",
                      "Мягмар",
                      "Лхагва",
                      "Пүрэв",
                      "Баасан",
                    ].map((num) => (
                      <th
                        key={num}
                        className="border border-gray-300 px-4 py-2 w-[150px]"
                      >
                        {num}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {selectItem.tbUdur.map((item, rowIndex) => (
                    <tr key={rowIndex}>
                      <td className="border border-gray-300 px-4 py-2 font-bold">
                        {rowIndex + 1}
                      </td>
                      {[...Array(6)].map((_, colIndex) => (
                        <td
                          key={colIndex}
                          className="border border-gray-300 px-4 py-2 text-center w-[150px]"
                        >
                          {item.time[colIndex] || "-"}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
