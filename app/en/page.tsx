"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HomeEN() {
  const router = useRouter();

  return (
    <main className="relative flex flex-col items-center justify-center h-screen">
      <button type="button" onClick={() => router.push("/login")} className="absolute top-5 left-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Login</button>
      <button
        onClick={() => router.push("/")}
        className="absolute top-5 right-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        🇫🇷 Version française
      </button>

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
              Construction, external company, deliverers
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
