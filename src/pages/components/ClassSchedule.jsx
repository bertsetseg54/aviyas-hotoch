import { useState } from "react";
import timeTableClass, { useClass } from "../../context/ClassContext";

export default function ClassSchedule() {
  const [selectClass, setSelectClass] = useState(null);
  const { classes } = useClass();
  return (
    <div className="w-full flex flex-wrap gap-7 justify-center">
      {classes.map((data, item) => {
        return (
          <div
            key={data.id}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-3"
          >
            <div className="flex flex-col items-center justify-around bg-sky-50 border border-gray-600 rounded-xl p-6 gap-2 h-[200px] shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <p className="text-2xl font-semibold text-gray-800">
                {data.class}
              </p>
              <p className="text-base text-center text-gray-600">
                Анги удирдсан багш: {data.aub}
              </p>
              <button
                onClick={() => setSelectClass(data)}
                className="text-sm font-medium text-gray-800 border border-gray-600 px-4 py-2 rounded-full hover:bg-gray-100 transition"
              >
                Хуваарь харах
              </button>
            </div>
          </div>
        );
      })}

      {selectClass && (
        <div className="fixed z-10 top-0 left-0 h-[100vh] w-[100vw] flex justify-center items-center">
          <button
            onClick={() => setSelectClass(null)}
            className="fixed z-1 top-0 left-0 h-[100vh] w-[100vw] bg-[black] opacity-[50%] "
          ></button>
          <div className="bg-[#fff] z-2 p-4 rounded-[20px]">
            <h1 className="text-2xl font-bold text-blue-500 mb-4 border-b pb-2 shadow-sm">
              {selectClass.class} ангийн хичээлийн хуваарь
            </h1>

            <div>
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
                  {selectClass.huwaari.map((item, rowIndex) => (
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
