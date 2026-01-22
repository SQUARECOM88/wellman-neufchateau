"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import LanguageSelector from "../components/LanguageSelector";
export default function HomeEN() {
  const router = useRouter();

  return (
    <main className="relative flex flex-col items-center justify-center h-screen">
      <LanguageSelector></LanguageSelector>
      <div className="absolute top-10 left-1/2 -translate-x-1/2">
        <Image
          src="/indorama.jpeg"
          alt="Indorama logo"
          width={250}
          height={100}
          className="object-contain"
        />
      </div>

      <div className="flex flex-col lg:flex-row items-start gap-16 mt-20">
        <div className="flex flex-col items-center gap-5">
          <button
            onClick={() => (window.location.href = "/en/logistique")}
            className="w-[500px] h-[200px] bg-[#1864ab] hover:bg-[#1c7ed6] text-white rounded-xl text-2xl font-medium flex flex-col justify-center items-center text-center transition-colors"
          >
            Logistic
            <p className="text-lg mt-2">Loading / Unloading</p>
          </button>
          <Image
            src="/camion.png"
            alt="Truck"
            width={250}
            height={150}
            className="object-contain"
          />
        </div>

        <div className="flex flex-col items-center gap-5">
          <button
            onClick={() => (window.location.href = "/en/autre")}
            className="w-[500px] h-[200px] bg-[#1864ab] hover:bg-[#1c7ed6] text-white rounded-xl text-2xl font-medium flex flex-col justify-center items-center text-center transition-colors"
          >
            Others
            <p className="text-lg mt-2">
              Construction / External company / Deliverers
            </p>
          </button>
          <Image
            src="/camionnette.png"
            alt="Van"
            width={250}
            height={150}
            className="object-contain"
          />
        </div>
      </div>
    </main>
  );
}
