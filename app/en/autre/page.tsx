"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AutresPage() {
  const router = useRouter();

  return (
    <main className="relative flex flex-col items-center justify-center h-screen">
      <button
        onClick={() => router.push("/en")}
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

      <div className="flex flex-col lg:flex-row items-center gap-16 mt-20">
        <button
          onClick={() => (window.location.href = "/en/autre/entree")}
          className="w-[400px] h-[180px] bg-[#1864ab] hover:bg-[#1c7ed6] text-white rounded-xl text-2xl font-semibold flex flex-col justify-center items-center transition-colors"
        >
          Entry
        </button>

        <button
          onClick={() => (window.location.href = "/en/autre/sortie")}
          className="w-[400px] h-[180px] bg-[#1864ab] hover:bg-[#1c7ed6] text-white rounded-xl text-2xl font-semibold flex flex-col justify-center items-center transition-colors"
        >
          Exit
        </button>
      </div>
    </main>
  );
}
