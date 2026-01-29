"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import RgpdNoticeRU from "@/app/components/RgpdRU";

export default function LogistiqueSlider() {
  const router = useRouter();
  
  
  const introImages = [
    "/RU/iso.png", 
    "/EN_environnement.png", 
    "/EN_urgences.jpg",
    "/EN_regles_secu.png", 
    "/Tablette-8-indorama-GB.jpg", 
    "/FR_obligation.png"
  ];
  
  const postChoiceImagesByReason: Record<string, string[]> = {
    dechargement: ["/RU/dechargement.png", "/EN_obligations_chauffeur.png"],
    depotage: ["/RO/chauffeur.png", "/RU/echelle.png", "/EN_simple.png"],
    quai: ["/EN_obligations_chauffeur.png", "/RU/dechargement.png"],
    expedition: ["/EN_obligations_chauffeur.png", "/RU/oblig2-ru.png", "/RU/oblig3-ru.png", "/RU/oblig4-ru.png", "/RU/dechargement.png"],
  };
  
  const postChoiceCommonImages = [
    "/RU/deversement.png",
    "/EN_plan2.png",
  ];


  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"intro" | "choix" | "postChoice" | "form" | "success">("intro");
  const [reason, setReason] = useState<string>(""); 
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    tractorRegistration: "",
    trailerRegistration: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (submitted) router.push("/");
  }, [submitted, router]);

  // --- HELPER : Fusion des slides ---
  const getCurrentPostChoiceSlides = () => {
    const specificImages = reason ? (postChoiceImagesByReason[reason] || []) : [];
    return [...specificImages, ...postChoiceCommonImages];
  };

  const currentPostChoiceSlides = getCurrentPostChoiceSlides();

  // --- NAVIGATION ---

  const handleNextIntro = () => {
    if (index < introImages.length - 1) setIndex(index + 1);
    else setPhase("choix");
  };

  const handleSelectReason = (r: string) => {
    setReason(r);
    setPhase("postChoice");
    setIndex(0);
  };

  const handleSkipChoice = () => {
    setReason("");
    setPhase("postChoice");
    setIndex(0);
  };

  const handleNextPostChoice = () => {
    // On utilise la taille du tableau fusionné
    if (index < currentPostChoiceSlides.length - 1) {
      setIndex(index + 1);
    } else {
      setPhase("form");
    }
  };

  const handlePrev = () => {
    if (phase === "intro") {
      if (index > 0) setIndex(index - 1);
    } 
    else if (phase === "choix") {
      setPhase("intro");
      setIndex(introImages.length - 1);
    } 
    else if (phase === "postChoice") {
      if (index > 0) {
        setIndex(index - 1);
      } else {
        setPhase("choix");
        setReason(""); 
      }
    } 
    else if (phase === "form") {
      setPhase("postChoice");
      setIndex(currentPostChoiceSlides.length - 1);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/logistic/entree", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // @ts-ignore
        body: JSON.stringify({ ...formData, selectedOption: reason }),
      });
      const data = await res.json();
      if (data.success) setSubmitted(true);
      else alert("Ошибка при отправке."); // Traduction
    } catch (error) {
      console.error(error);
      alert("Ошибка соединения с сервером."); // Traduction
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen p-4">
      <button onClick={() => router.push("/")} className="absolute top-5 left-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
        ← Назад 
      </button>

      <div className="absolute top-10 left-1/2 -translate-x-1/2">
        <Image
          src="/indorama.jpeg"
          alt="Логотип Indorama" 
          width={250}
          height={100}
          className="object-contain"
        />
      </div>

      {phase === "intro" && (
        <>
          <Image
            key={introImages[index]}
            src={introImages[index]}
            alt=""
            width={800}
            height={600}
            className="object-contain w-[800px] h-[600px] rounded-xl shadow-lg"
          />
          <div className="flex gap-4 mt-4">
            <button 
              onClick={handlePrev} 
              disabled={index === 0}
              className={`bg-[#1864ab] text-white rounded-xl px-6 py-2 hover:bg-blue-800 ${index === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-600'}`}
            >
              Назад
            </button>
            
            <button onClick={handleNextIntro} className="bg-[#1864ab] text-white rounded-xl px-6 py-2 hover:bg-blue-800">
              Далее
            </button>
          </div>
        </>
      )}

      {phase === "choix" && (
        <div className="flex flex-col items-center w-full max-w-4xl mt-12">
          <h2 className="text-2xl font-bold mb-8 text-center text-black uppercase tracking-wide">
            Выберите цель вашего визита
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {[
              { id: "dechargement", img: "/dechargement.png", label: "Погрузка/разгрузка грузовиков" },
              { id: "depotage", img: "/granule.jpg", label: "Разгрузка гранул" },
              { id: "quai", img: "/quai.jpg", label: "Разгрузка на рампе" },
              { id: "expedition", img: "/expedition.png", label: "Разгрузка/Отправка химикатов/опасных отходов" },
            ].map(r => (
              <button key={r.id} onClick={() => handleSelectReason(r.id)}
                className="bg-white p-4 rounded-xl shadow-lg hover:scale-105 transition-transform flex flex-col items-center">
                <Image src={r.img} alt={r.label} width={250} height={180} className="object-contain h-38 w-auto" />
                <p className="mt-2 font-semibold text-black text-center">{r.label}</p>
              </button>
            ))}
          </div>

          <div className="flex gap-4 mt-10">
            <button 
              onClick={handlePrev} 
              className="bg-gray-500 text-white rounded-xl px-12 py-3 font-semibold text-lg hover:bg-gray-600 transition-colors"
            >
              Назад
            </button>
          </div>
        </div>
      )}

      {phase === "postChoice" && (
        <>
          <Image
            key={currentPostChoiceSlides[index]} 
            src={currentPostChoiceSlides[index]}
            alt=""
            width={800}
            height={600}
            className="object-contain rounded-xl shadow-lg mt-4"
          />
          <div className="flex gap-4 mt-4">
             <button 
              onClick={handlePrev} 
              className="bg-gray-500 text-white rounded-xl px-6 py-2 hover:bg-gray-600"
            >
              Назад
            </button>

            <button onClick={handleNextPostChoice} className="bg-[#1864ab] text-white rounded-xl px-6 py-2 hover:bg-blue-800">
              Далее
            </button>
          </div>
        </>
      )}

      {phase === "form" && (
        <form onSubmit={handleSubmit} className="w-[420px] space-y-4 mt-30 relative">
          <button 
            type="button" 
            onClick={handlePrev}
            className="absolute -top-12 left-0 text-blue-700 hover:underline flex items-center gap-1"
          >
            ← Пересмотреть инструкции
          </button>

          <h2 className="text-2xl font-bold mb-6 text-center text-black">
            Пожалуйста, заполните эту форму:
          </h2>
          <input type="text" name="firstName" placeholder="Имя" onChange={handleChange} className="border p-2 w-full text-black" required />
          <input type="text" name="lastName" placeholder="Фамилия" onChange={handleChange} className="border p-2 w-full text-black" required />
          <input name="company" placeholder="Компания" onChange={handleChange} className="border p-2 w-full text-black" required />
          <input name="tractorRegistration" placeholder="Номер тягача" onChange={handleChange} className="border p-2 w-full text-black" required />
          <input name="trailerRegistration" placeholder="Номер прицепа" onChange={handleChange} className="border p-2 w-full text-black" required />
          
          <RgpdNoticeRU />
          
          <label htmlFor="rgpd" className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              id="rgpd"
              required
              className="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="text-black">
              Я прочитал(а) и принимаю условия обработки моих данных 
              согласно политике конфиденциальности.
            </span>
          </label>
          <button type="submit" disabled={isSubmitting} className="bg-[#1864ab] text-white w-full py-2 rounded">
            {isSubmitting ? "Отправка..." : "Отправить"}
          </button>
        </form>
      )}

      {phase === "success" && (
        <div className="text-green-600 text-xl font-bold mt-4">Успешно зарегистрировано!</div>
      )}
    </main>
  );
}