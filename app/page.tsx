"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HomeFR() {
  const router = useRouter(); 

  return (
    <main className="relative flex flex-col items-center justify-center h-screen">
      <button
        onClick={() => router.push("/en")}
        className="absolute top-5 right-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        🇬🇧 English version
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

      <div className="flex flex-col lg:flex-row items-start gap-16 mt-20">
        <div className="flex flex-col items-center gap-5">
          <button
            onClick={() => (window.location.href = "/logistique")}
            className="w-[500px] h-[200px] bg-[#1864ab] hover:bg-[#1c7ed6] text-white rounded-xl text-2xl font-medium flex flex-col justify-center items-center text-center transition-colors"
          >
            Logistique
            <p className="text-lg mt-2">Chargement / Déchargement</p>
          </button>
          <Image
            src="/camion.png"
            alt="Camion"
            width={250}
            height={150}
            className="object-contain"
          />
        </div>

        <div className="flex flex-col items-center gap-5">
          <button
            onClick={() => (window.location.href = "/autre")}
            className="w-[500px] h-[200px] bg-[#1864ab] hover:bg-[#1c7ed6] text-white rounded-xl text-2xl font-medium flex flex-col justify-center items-center text-center transition-colors"
          >
            Autres
            <p className="text-lg mt-2">
              Travaux, entreprise extérieure, livreurs...
            </p>
          </button>
          <Image
            src="/camionnette.png"
            alt="Camionnette"
            width={250}
            height={150}
            className="object-contain"
          />
        </div>
      </div>
    </main>
  );
}
