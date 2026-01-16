"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import SignatureCanvas from "react-signature-canvas";
import { useRouter } from "next/navigation";
import RgpdNoticePO from "@/app/components/RgpdPO";

export default function LogistiqueSortieForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    tractorRegistration: "",
    signature: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sigCanvas = useRef<SignatureCanvas | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const clearSignature = () => sigCanvas.current?.clear();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!sigCanvas.current || sigCanvas.current.isEmpty()) {
      alert("Veuillez signer avant de soumettre.");
      return;
    }

    setIsSubmitting(true);
    const signature = sigCanvas.current.toDataURL("image/png");

    try {
      const res = await fetch("/api/logistic/sortie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, signature }),
      });

      const data = await res.json();

      if (data.success) {
        router.push("/");
      } else {
        alert(data.error || "Erreur lors de l'envoi.");
      }
    } catch (err) {
      console.error(err);
      alert("Erreur de connexion au serveur.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <button onClick={() => router.push("/")} className="absolute top-5 left-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
        ← Retorno
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
      <form onSubmit={handleSubmit} className="w-[420px] space-y-4 mt-30">
        <h2 className="text-black text-lg text-center font-bold">Preencha este formulário:</h2>
        <input
          name="firstName"
          placeholder="Nome próprio"
          onChange={handleChange}
          className="border p-2 w-full text-black"
          required
        />
        <input
          name="lastName"
          placeholder="Nome"
          onChange={handleChange}
          className="border p-2 w-full text-black"
          required
        />
        <input
          name="tractorRegistration"
          placeholder="Registo do trator"
          onChange={handleChange}
          className="border p-2 w-full text-black"
          required
        />

        <div className="border p-2 rounded bg-white">
          <SignatureCanvas
            ref={sigCanvas}
            penColor="black"
            canvasProps={{ className: "border w-full h-[150px] text-black" }}
          />
          <button
            type="button"
            onClick={clearSignature}
            className="text-blue-600 mt-2"
          >
            Apagar
          </button>
        </div>
        <RgpdNoticePO></RgpdNoticePO>
        <label htmlFor="rgpd" className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            id="rgpd"
            required
            className="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <span className="text-black">
              Li e aceito os termos e condições relativos ao tratamento dos meus dados pessoais
              de acordo com a política de privacidade.
          </span>
        </label>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#1864ab] text-white w-full py-2 rounded"
        >
          {isSubmitting ? "Envoi..." : "Enviar"}
        </button>
      </form>
    </main>
  );
}
