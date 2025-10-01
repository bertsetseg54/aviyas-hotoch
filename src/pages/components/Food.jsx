import { useState } from "react";
import { useFood } from "../../context/FoodContext";

export default function Food() {
  const [selectItem, setSelectItem] = useState(null);
  const { foodData } = useFood();
  return (
    <div className="flex w-full h-full justify-center mb-[200px] mt-[30px]">
      <div className="flex flex-col gap-5">
        <h1 className="text-3xl font-black">1-р долоо хоног</h1>
        <div className="flex gap-6">
          {foodData.map((data, index) => {
            if (index < 5)
              return (
                <div className="boxbox" key={index}>
                  <button className="" onClick={() => setSelectItem(data)}>
                    <div className="flex flex-col gap-3  ">
                      <img
                        src={data.foodPic}
                        alt="hool"
                        className="w-[270px] rounded-2xl hover:opacity-[75%] duration-500"
                      />
                      <div className="text-2xl">
                        <ul className="flex flex-col items-start justify-start text-lg font-semibold">
                          <li>🍲 {data.name[0]}</li>
                          <li>🍱 {data.name[1]}</li>
                          <li>🥗 {data.name[3]}</li>
                          <li>🥤 {data.name[2]}</li>
                        </ul>
                      </div>
                    </div>
                  </button>
                </div>
              );
          })}
        </div>
        <h1 className="text-3xl font-black">2-р долоо хоног</h1>
        <div className="flex gap-6">
          {foodData.map((data, index) => {
            if (index >= 5 && index < 10)
              return (
                <div className="boxbox" key={index}>
                  <button className="" onClick={() => setSelectItem(data)}>
                    <div className="flex flex-col gap-3">
                      <img
                        src={data.foodPic}
                        alt="hool"
                        className="w-[270px] rounded-2xl"
                      />
                      <div className="text-2xl">
                        <ul className="flex flex-col items-start justify-start text-lg font-semibold">
                          <li>🍲 {data.name[0]}</li>
                          <li>🍱 {data.name[1]}</li>
                          <li>🥗 {data.name[3]}</li>
                          <li>🥤 {data.name[2]}</li>
                        </ul>
                      </div>
                    </div>
                  </button>
                </div>
              );
          })}
        </div>
        <h1 className="text-3xl font-black">3-р долоо хоног</h1>
        <div className="flex gap-6">
          {foodData.map((data, index) => {
            if (index >= 10 && index < 15)
              return (
                <div className="boxbox" key={index}>
                  <button className="" onClick={() => setSelectItem(data)}>
                    <div className="flex flex-col gap-3">
                      <img
                        src={data.foodPic}
                        alt="hool"
                        className="w-[270px] rounded-2xl"
                      />
                      <div className="text-2xl">
                        <ul className="flex flex-col items-start justify-start text-lg font-semibold">
                          <li>🍲 {data.name[0]}</li>
                          <li>🍱 {data.name[1]}</li>
                          <li>🥗 {data.name[3]}</li>
                          <li>🥤 {data.name[2]}</li>
                        </ul>
                      </div>
                    </div>
                  </button>
                </div>
              );
          })}
        </div>
        <h1 className="text-3xl font-black">4-р долоо хоног</h1>
        <div className="flex gap-6">
          {foodData.map((data, index) => {
            if (index >= 15 && index < 20)
              return (
                <div className="boxbox" key={index}>
                  <button className="" onClick={() => setSelectItem(data)}>
                    <div className="flex flex-col gap-3">
                      <img
                        src={data.foodPic}
                        alt="hool"
                        className="w-[270px] rounded-2xl"
                      />
                      <div className="text-2xl">
                        <ul className="flex flex-col items-start justify-start text-lg font-semibold">
                          <li>🍲 {data.name[0]}</li>
                          <li>🍱 {data.name[1]}</li>
                          <li>🥗 {data.name[3]}</li>
                          <li>🥤 {data.name[2]}</li>
                        </ul>
                      </div>
                    </div>
                  </button>
                </div>
              );
          })}
        </div>
      </div>
      {selectItem && (
        <div className="fixed z-1000 top-0 left-0 h-[100vh] w-[100vw] flex justify-center items-center">
          <button
            onClick={() => setSelectItem(null)}
            className="fixed z-1 top-0 left-0 h-[100vh] w-[100vw] bg-[black] opacity-[80%] "
          ></button>
          <button onClick={() => setSelectItem(null)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M12 10.6L6.6 5.2 5.2 6.6l5.4 5.4-5.4 5.4 1.4 1.4 5.4-5.4 5.4 5.4 1.4-1.4-5.4-5.4 5.4-5.4-1.4-1.4-5.4 5.4z"></path>
            </svg>
          </button>
          <div className="bg-[#fff] z-2 rounded-[20px] ">
            <div>
              <img src={selectItem.foodPic} alt="" className="max-w-[800px]" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
