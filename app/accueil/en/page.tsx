"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AutresPage() {
  const router = useRouter();

  return (
    <main className="relative flex flex-col items-center justify-center h-screen">
      <button
        onClick={() => router.push("/accueil/en")}
        className="absolute top-5 left-5 text-sm underline text-gray-600 hover:text-gray-900"
      >
        ← Back
      </button>

      <div className="absolute top-10 left-1/2 -translate-x-1/2">
        <Image
          src="/indorama.jpeg"
          alt="Logo Indorama"
          width={250}
          height={100}
          className="object-contain"
        />
      </div>
      <div className="absolute top-6 right-6 bg-[#1864ab] text-white rounded-xl px-6 py-2 hover:bg-blue-800">
        <button onClick={() => (window.location.href = "/accueil")}>
          Français 🇫🇷
        </button>
      </div>

      <div className="text-black text-2xl">
          <h1>VISITOR WELCOME SHEET</h1>
      </div>
      <div className="flex flex-col lg:flex-row items-center gap-16 mt-20">
        <button
          onClick={() => (window.location.href = "/accueil/en/entree")}
          className="w-[400px] h-[180px] bg-[#1864ab] hover:bg-[#1c7ed6] text-white rounded-xl text-2xl font-semibold flex flex-col justify-center items-center transition-colors"
        >
          Entry
        </button>

        <button
          onClick={() => (window.location.href = "/accueil/en/sortie")}
          className="w-[400px] h-[180px] bg-[#1864ab] hover:bg-[#1c7ed6] text-white rounded-xl text-2xl font-semibold flex flex-col justify-center items-center transition-colors"
        >
          Exit
        </button>
      </div>
    </main>
  );
}
