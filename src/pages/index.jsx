import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "./components/Header";
import Link from "next/link";
import Nav from "./components/Nav";
import Introduction from "./components/Introduction";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className="relative">
      {/* <p className="flex justify-center text-6xl">WELCOME TO "TALENT" SCHOOL</p> */}
      <Introduction />
    </div>
  );
}
