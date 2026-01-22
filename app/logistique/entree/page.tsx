"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import RgpdNotice from "@/app/components/Rgpd";

export default function LogistiqueSlider() {
  const router = useRouter();
  
  const introImages = [
    "/FR_iso.png", 
    "/FR_environnement.png", 
    "/FR_urgences.png", 
    "/FR_regle_secu.png",
    "/FR_interdiction.png", 
    "/FR_obligation.png"
  ];
  
  const postChoiceImagesByReason: Record<string, string[]> = {
    dechargement: ["/EN_obligation_dechargement.png", "/FR_obligations_chauffeur.png"],
    depotage: ["/FR_obligations_chauffeur.png", "/FR_obligations_acces.png"],
    quai: ["/FR_obligations_chauffeur.png", "/EN_obligation_dechargement.png"],
    expedition: ["/FR_obligations_chauffeur.png", "/obligation1-fr.png", "/oblig2-fr.png", "/oblig4-fr.png", "/EN_obligation_dechargement.png"],
  };
  
  const postChoiceCommonImages = [
    "/FR_deversement.png",
    "/FR_plan2.png",
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

  const getCurrentPostChoiceSlides = () => {
    const specificImages = reason ? (postChoiceImagesByReason[reason] || []) : [];
    return [...specificImages, ...postChoiceCommonImages];
  };

  const currentPostChoiceSlides = getCurrentPostChoiceSlides();


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
    // On utilise la longueur du tableau fusionné
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
      // On revient à la dernière slide du tableau fusionné
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
      <button onClick={() => router.push("/")} className="absolute top-5 left-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
        ← Accueil
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
          <div className="flex gap-4 mt-4">
            <button 
              onClick={handlePrev} 
              disabled={index === 0}
              className={`bg-[#1864ab] text-white rounded-xl px-6 py-2 hover:bg-blue-800 ${index === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-600'}`}
            >
              Précédent
            </button>
            
            <button onClick={handleNextIntro} className="bg-[#1864ab] text-white rounded-xl px-6 py-2 hover:bg-blue-800">
              Suivant
            </button>
          </div>
        </>
      )}

      {phase === "choix" && (
        <div className="flex flex-col items-center w-full max-w-4xl mt-12">
          <h2 className="text-2xl font-bold mb-8 text-center text-black uppercase tracking-wide">
            Choisissez la raison de votre visite
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {[
              { id: "dechargement", img: "/dechargement.png", label: "Chargement/Déchargement" },
              { id: "depotage", img: "/granule.jpg", label: "Dépotage granulé" },
              { id: "quai", img: "/quai.jpg", label: "Déchargement à quai" },
              { id: "expedition", img: "/expedition.png", label: "Expédition produits dangereux" },
            ].map(r => (
              <button key={r.id} onClick={() => handleSelectReason(r.id)}
                className="bg-white p-4 rounded-xl shadow-lg hover:scale-105 transition-transform flex flex-col items-center">
                <Image src={r.img} alt={r.label} width={250} height={180} className="object-contain h-48 w-auto" />
                <p className="mt-2 font-semibold text-black text-center">{r.label}</p>
              </button>
            ))}
          </div>

          <div className="flex gap-4 mt-10">
            <button 
              onClick={handlePrev} 
              className="bg-gray-500 text-white rounded-xl px-12 py-3 font-semibold text-lg hover:bg-gray-600 transition-colors"
            >
              Retour
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
            width={900}
            height={600}
            className="object-contain rounded-xl shadow-lg mt-4"
          />
          <div className="flex gap-4 mt-4">
             <button 
              onClick={handlePrev} 
              className="bg-gray-500 text-white rounded-xl px-6 py-2 hover:bg-gray-600"
            >
              Précédent
            </button>

            <button onClick={handleNextPostChoice} className="bg-[#1864ab] text-white rounded-xl px-6 py-2 hover:bg-blue-800">
              Suivant
            </button>
          </div>
        </>
      )}

      {phase === "form" && (
        <form onSubmit={handleSubmit} className="w-[420px] space-y-4 mt-30 relative">
          <h2 className="text-2xl font-bold mb-6 text-center text-black">
            Merci de remplir ce formulaire :
          </h2>
          <input name="firstName" placeholder="Prénom" onChange={handleChange} className="border p-2 w-full text-black" required />
          <input name="lastName" placeholder="Nom" onChange={handleChange} className="border p-2 w-full text-black" required />
          <input name="company" placeholder="Entreprise" onChange={handleChange} className="border p-2 w-full text-black" required />
          <input name="tractorRegistration" placeholder="Immat. tracteur" onChange={handleChange} className="border p-2 w-full text-black" required />
          <input name="trailerRegistration" placeholder="Immat. remorque" onChange={handleChange} className="border p-2 w-full text-black" required />
          <RgpdNotice></RgpdNotice>
          <label htmlFor="rgpd" className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              id="rgpd"
              required
              className="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="text-black">
              J’ai lu et j’accepte les conditions de traitement de mes données
              conformément à la politique de confidentialité
            </span>
          </label>
          <button type="submit" disabled={isSubmitting} className="bg-[#1864ab] text-white w-full py-2 rounded">
            {isSubmitting ? "Envoi..." : "Envoyer"}
          </button>
        </form>
      )}

      {phase === "success" && (
        <div className="text-green-600 text-xl font-bold mt-4">Enregistré avec succès !</div>
      )}
    </main>
  );
}