"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import RgpdNoticeEN from "@/app/components/RgpdEN";

export default function LogistiqueSlider() {
  const router = useRouter();
  const introImages = ["/EN_iso.png", "/EN_environnement.png", "/EN_interdictions.png", "/EN_obligations.png"];
  
  const postChoiceImagesByReason: Record<string, string> = {
    dechargement: "/EN_obligation_dechargement.png",
    depotage: "/EN_obligations_acces.png",
    quai: "/EN_obligation_dechargement.png",
    expedition: "/EN_obligation_dechargement.png",
  };
  
  const postChoiceCommonImages = [
    "/EN_obligations_chauffeur.png",
    "/EN_deversement.png",
    "/EN_plan_circulation.png",
  ];

  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"intro" | "choix" | "postChoice" | "form" | "success">("intro");
  
  // Initialized to empty string for "empty choice" handling
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

  const handleNextIntro = () => {
    if (index < introImages.length - 1) setIndex(index + 1);
    else setPhase("choix");
  };

  // Case 1: Specific choice selected
  const handleSelectReason = (r: string) => {
    setReason(r);
    setPhase("postChoice");
    setIndex(0);
  };

  // Case 2: Skip choice (sends empty string)
  const handleSkipChoice = () => {
    setReason(""); 
    setPhase("postChoice");
    setIndex(0);
  };

  const handleNextPostChoice = () => {
    // If reason exists: 1 specific image + common images
    // If reason is empty: only common images
    const totalSlides = reason ? 1 + postChoiceCommonImages.length : postChoiceCommonImages.length;
    
    if (index < totalSlides - 1) setIndex(index + 1);
    else setPhase("form");
  };

  const getPostChoiceImage = () => {
    if (reason) {
      return index === 0 ? postChoiceImagesByReason[reason] : postChoiceCommonImages[index - 1];
    } else {
      // If empty reason, start directly with common images
      return postChoiceCommonImages[index];
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
        body: JSON.stringify({ ...formData, selectedOption: reason }),
      });
      const data = await res.json();
      if (data.success) setSubmitted(true);
      else alert("Erreur lors de l'envoi.");
    } catch (error) {
      console.error(error);
      alert("Erreur de connexion au serveur.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <button onClick={() => router.push("/en")} className="absolute top-5 left-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
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

      {phase === "intro" && (
        <>
          <Image
            key={introImages[index]}
            src={introImages[index]}
            alt=""
            width={900}
            height={600}
            className="object-contain rounded-xl shadow-lg"
          />
          <button onClick={handleNextIntro} className="bg-[#1864ab] text-white rounded-xl px-6 py-2 mt-4">
            Next
          </button>
        </>
      )}

      {phase === "choix" && (
        <div className="flex flex-col items-center w-full max-w-4xl mt-12">
          {/* English Title */}
          <h2 className="text-2xl font-bold mb-8 text-center text-black uppercase tracking-wide">
            Choose the reason for your visit
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {[
              { id: "dechargement", img: "/dechargement.png", label: "Truck loading/unloading" },
              { id: "depotage", img: "/granule.jpg", label: "Granule unloading" },
              { id: "quai", img: "/quai.jpg", label: "Unloading at the dock" },
              { id: "expedition", img: "/expedition.png", label: "Unloading/Shipping chemical/hazardous waste" },
            ].map(r => (
              <button key={r.id} onClick={() => handleSelectReason(r.id)}
                className="bg-white p-4 rounded-xl shadow-lg hover:scale-105 transition-transform flex flex-col items-center">
                <Image src={r.img} alt={r.label} width={250} height={180} className="object-contain h-48 w-auto" />
                <p className="mt-2 font-semibold text-black text-center">{r.label}</p>
              </button>
            ))}
          </div>

          {/* Generic Next Button */}
          <button 
            onClick={handleSkipChoice} 
            className="bg-[#1864ab] text-white rounded-xl px-12 py-3 mt-10 hover:bg-blue-800 transition-colors font-semibold text-lg"
          >
            Next 
          </button>
        </div>
      )}

      {phase === "postChoice" && (
        <>
          <Image
            key={getPostChoiceImage()}
            src={getPostChoiceImage()}
            alt=""
            width={900}
            height={600}
            className="object-contain rounded-xl shadow-lg mt-4"
          />
          <button onClick={handleNextPostChoice} className="bg-[#1864ab] text-white rounded-xl px-6 py-2 mt-4">
            Next
          </button>
        </>
      )}

      {phase === "form" && (
        <form onSubmit={handleSubmit} className="w-[420px] space-y-4 mt-30">
            <h2 className="text-2xl font-bold mb-6 text-center text-black">
              Please fill out this form :
            </h2>
          <input name="firstName" placeholder="First name" onChange={handleChange} className="border p-2 w-full text-black" required />
          <input name="lastName" placeholder="Last name" onChange={handleChange} className="border p-2 w-full text-black" required />
          <input name="company" placeholder="Company" onChange={handleChange} className="border p-2 w-full text-black" required />
          <input name="tractorRegistration" placeholder="Tractor registration" onChange={handleChange} className="border p-2 w-full text-black" required />
          <input name="trailerRegistration" placeholder="Trailor registration" onChange={handleChange} className="border p-2 w-full text-black" required />
          <RgpdNoticeEN></RgpdNoticeEN>
          <label htmlFor="rgpd" className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                id="rgpd"
                required
                className="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="text-black">
                I have read and accept the terms and conditions for the processing of my data in accordance with the privacy policy
              </span>
          </label>

          <button type="submit" disabled={isSubmitting} className="bg-[#1864ab] text-white w-full py-2 rounded">
            {isSubmitting ? "Sending..." : "Submit"}
          </button>
        </form>
      )}

      {phase === "success" && (
        <div className="text-green-600 text-xl font-bold mt-4">Success!</div>
      )}
    </main>
  );
}