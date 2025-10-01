import { useState } from "react";
import Aviyasinbaharhal from "./Aviyasinbaharhal";
import Mendchilgee from "./Mendchilgee";
import Namtar from "./Namtar";
import Information from "./Information";

export default function Introduction() {
  const [medeelel, setMedeelel] = useState("zmendchilgee");
  return (
    <div className="w-full">
      <div className="flex justify-around mt-6 px-10 shadow-md bg-white py-4 rounded-xl">
        <button
          className="rounded-full text-lg px-6 py-3 font-medium text-gray-900 border border-gray-400"
          onClick={() => setMedeelel("zmendchilgee")}
        >
          МЭНДЧИЛГЭЭ
        </button>
        <button
          className="rounded-full text-lg px-6 py-3 font-medium text-gray-900 border border-gray-400"
          onClick={() => setMedeelel("baharhal")}
        >
          АВЬЯАСЫН БАХАРХАЛ
        </button>
        <button
          className="rounded-full text-lg px-6 py-3 font-medium text-gray-900 border border-gray-400"
          onClick={() => setMedeelel("namtar")}
        >
          СУРГУУЛИЙН ЗАМНАЛ
        </button>
        <button
          className="rounded-full text-lg px-6 py-3 font-medium text-gray-900 border border-gray-400"
          onClick={() => setMedeelel("taniltsuulga")}
        >
          АЖИЛЧДЫН МЭДЭЭЛЭЛ
        </button>
      </div>

      {medeelel == "zmendchilgee" ? <Mendchilgee /> : ""}
      {medeelel == "baharhal" ? <Aviyasinbaharhal /> : ""}
      {medeelel == "namtar" ? <Namtar /> : ""}
      {medeelel == "taniltsuulga" ? <Information /> : ""}
    </div>
  );
}
