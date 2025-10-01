"use client";
import { createContext, useContext, useState } from "react";

// 1️⃣ Context үүсгэх
const FoodContext = createContext();

// 2️⃣ Provider component
export function FoodProvider({ children }) {
  // foodData-г context дотор шууд хадгалах
  const [foodData, setFoodData] = useState([
    {
      foodPic: "./1.1-scaled.jpg",
      name: ["Хулууны зутан шөл", "Гоймонтой хуурга", "Аньсны шүүс", "Салад"],
    },
    {
      foodPic: "./1.2-scaled.jpg",
      name: ["Шөл", "Төмсний хучмал", "Сүүтэй цай", "Зууш"],
    },
    {
      foodPic: "./1.3-scaled.jpg",
      name: ["Броклины зутан шөл", "Будаатай хуурга", "Аньсны шүүс", "Зууш"],
    },
    {
      foodPic: "./1.4-scaled.jpg",
      name: ["Зутан шөл", "Тортилья сальса", "Аньсны шүүс", "Зууш"],
    },
    {
      foodPic: "./1.5-scaled.jpg",
      name: ["Зутан шөл", "Гульяш", "Аньсны шүүс", "Зууш+Мантуу"],
    },
    {
      foodPic: "./2-1-scaled.jpg",
      name: ["Броклины зутан шөл", "Шарсан мах", "Үзэмний шүүс", "Зууш"],
    },
    {
      foodPic: "./2-2-scaled.jpg",
      name: ["Гоймонтой шөл", "Гульяш", "Үзэмний шүүс", "Зууш"],
    },
    {
      foodPic: "./2.3-scaled.jpg",
      name: ["Хулууны зутан шөл", "Шарсан тахиа", "Сүүтэй цай", "Зууш"],
    },
    {
      foodPic: "./2.4-scaled.jpg",
      name: ["Гоймонтой шөл", "Котлет", "Аньсны шүүс", "Зууш"],
    },
    {
      foodPic: "./2.5-scaled.jpg",
      name: ["Хулууны зутан шөл", "Пицца", "Аньсны шүүс", "Зууш"],
    },
    {
      foodPic: "./3.1-scaled.jpg",
      name: ["Броклины зутан шөл", "Гоймонтой хуурга", "Шүүс", "Зууш"],
    },
    {
      foodPic: "./3.2-scaled.jpg",
      name: ["Броклины зутан шөл", "Гоймонтой хуурга", "Аньсны шүүс", "Зууш"],
    },
    {
      foodPic: "./3.3-scaled.jpg",
      name: ["Будаатай шөл", "Төмсний хучмал", "Сүүтэй цай", "Зууш"],
    },
    {
      foodPic: "./3.4-scaled.jpg",
      name: [
        "Хулууны зутан шөл",
        "Пүнтүүзтэй хуурга",
        "Аньсны шүүс",
        "Зууш+Мантуу",
      ],
    },
    {
      foodPic: "./3.5-scaled.jpg",
      name: ["Шарсан төмс", "Бургер", "Аньсны шүүс", "Салад"],
    },
    {
      foodPic: "./4.1-scaled.jpg",
      name: [" Гурилтай шөл", "Будаатай хуурга", "Аньсны шүүс", "Зууш"],
    },
    {
      foodPic: "./4-2-scaled.jpg",
      name: ["Будаатай шөл", "Шарсан мах", "Сүүтэй цай", "Зууш"],
    },
    {
      foodPic: "./4.3-scaled.jpg",
      name: ["Цуйван", "Зутан шөл", "Сүүтэй цай", "Зууш"],
    },
    {
      foodPic: "./4.4-scaled.jpg",
      name: ["Гурилтай шөл", "Котлет", "Аньсны шүүс", "Зууш+Мантуу"],
    },
    {
      foodPic: "./4.5-scaled.jpg",
      name: ["Ногоотой шөл", "Пирошки", "Сүүтэй цай", "Зууш"],
    },
  ]);

  return (
    <FoodContext.Provider value={{ foodData, setFoodData }}>
      {children}
    </FoodContext.Provider>
  );
}

// 3️⃣ Hook ашиглахад амар болгох
export const useFood = () => useContext(FoodContext);
