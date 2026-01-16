"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import LanguageSelector from "@/app/components/LanguageSelector";

export default function LogistiquePage() {
  const router = useRouter();

  return (
    <main className="relative flex flex-col items-center justify-center h-screen">
      <button onClick={() => router.push("/")} className="absolute top-5 left-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
        ← Rückkehr
      </button>
      <LanguageSelector></LanguageSelector>
      <div className="absolute top-10 left-1/2 -translate-x-1/2">
        <Image
          src="/indorama.jpeg"
          alt="Logo Indorama"
          width={250}
          height={100}
          className="object-contain"
        />
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-16 mt-20">
        <button onClick={() => (window.location.href = "/de/logistique/entree")}
          className="w-[400px] h-[180px] bg-[#1864ab] hover:bg-[#1c7ed6] text-white rounded-xl text-2xl font-semibold flex flex-col justify-center items-center transition-colors">
          Eingetreten
        </button>

        <button onClick={() => (window.location.href = "/de/logistique/sortie")}
          className="w-[400px] h-[180px] bg-[#1864ab] hover:bg-[#1c7ed6] text-white rounded-xl text-2xl font-semibold flex flex-col justify-center items-center transition-colors">
          Ausgang
        </button>
      </div>
    </main>
  );
}
