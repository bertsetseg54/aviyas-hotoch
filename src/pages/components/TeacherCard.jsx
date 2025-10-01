import teacher, { useTeachers } from "../../context/TeacherContext";

export default function TeacherCard({ data }) {
  const { teachers, setTeachers } = useTeachers();
  return (
    <div className="bg-sky-200 w-full h-full mb-[20px]">
      <div className="pt-[50px] w-full flex justify-center flex-wrap gap-12">
        {teachers.map((data) => {
          return (
            <div className="px-5 w-[12%]">
              <div className="">
                <div className="flex flex-col relative rounded-lg w-full [310px] bg-[#FFFFFF] text-xl pt-[78%] items-center pb-[5%] px-[15px]">
                  <img src={data.pic} alt="" className="imgtag" />
                  <p className="text-[#283747] font-semibold text-lg">
                    {data.teacherName}
                  </p>
                  <p className="text-[#5d6d7e] text-base font-light text-center">
                    {data.zereg == ""
                      ? "Зэрэг: Залуу багш"
                      : "Зэрэг: " + data.zereg}
                  </p>
                  <p className="text-[#5d6d7e] text-base font-light text-center">
                    {"ЗАН:" + data.zan}
                  </p>
                  <p className="text-[#34495e] text-base font-light">
                    {data.number == "" ? "Утас:" : "Утас:" + data.number}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
