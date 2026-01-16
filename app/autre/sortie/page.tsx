"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import SignatureCanvas from "react-signature-canvas";
import RgpdNotice from "@/app/components/Rgpd";

export default function OthersSortieForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    entreprise: "",
  });
  const [loading, setLoading] = useState(false);
  const sigPadRef = useRef<SignatureCanvas | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClear = () => {
    sigPadRef.current?.clear();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { nom, prenom, entreprise } = formData;
    if (!nom || !prenom || !entreprise) return alert("Veuillez remplir tous les champs.");
    if (sigPadRef.current?.isEmpty()) return alert("Veuillez signer le formulaire.");

    const signatureImage = sigPadRef.current!.toDataURL("image/png");

    setLoading(true);
    try {
      const res = await fetch("/api/others/sortie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName: prenom, lastName: nom, company: entreprise, signature: signatureImage }),
      });
      const data = await res.json();
      if (data.success) {
        alert("Sortie enregistrée !");
        router.push("/");
      } else {
        alert("Erreur : " + data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Erreur serveur");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle =
    "w-full p-3 border border-gray-300 rounded-md bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <button onClick={() => router.push("/")} className="absolute top-5 left-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
        ← Retour
      </button>
      <div className="absolute top-10 left-1/2 -translate-x-1/2">
        <Image src="/indorama.jpeg" alt="Logo Indorama" width={250} height={100} className="object-contain" />
      </div>
      <h2 className="text-2xl font-bold mt-35 text-center text-black">
        Merci de remplir le formulaire suivant :
      </h2>
      <form onSubmit={handleSubmit} className="w-[420px] space-y-4 mt-5">
        <input type="text" name="prenom" value={formData.prenom} onChange={handleChange} placeholder="Prénom" required className={inputStyle} />
        <input type="text" name="nom" value={formData.nom} onChange={handleChange} placeholder="Nom" required className={inputStyle} />
        <input type="text" name="entreprise" value={formData.entreprise} onChange={handleChange} placeholder="Entreprise" required className={inputStyle} />

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Signature</label>
          <div className="w-full h-[200px] bg-gray-50 border border-gray-300 rounded-md overflow-hidden">
            <SignatureCanvas
              ref={sigPadRef}
              penColor="black"
              canvasProps={{ width: 300, height: 200, className: "w-full h-full" }}
            />
          </div>
          <button
            type="button"
            onClick={handleClear}
            className="w-full p-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
          >
            Effacer
          </button>
        </div>
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

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-[#1864ab] text-white font-semibold py-3 rounded-md hover:bg-[#1c7ed6] transition-colors ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Enregistrement..." : "Soumettre"}
        </button>
      </form>
    </main>
  );
}
