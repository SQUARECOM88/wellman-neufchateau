"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import RgpdNoticeEN from "@/app/components/RgpdEN";

const CONTACTS_WELLMAN = [
  "BREDARD Sébastien",
  "FAVARD Annaëlle",
  "FAVRE Fabien",
  "FAVRE Romain",
  "HACQUART Marjolaine",
  "HARMAND Gauthier",
  "KATIC Sacha",
  "KISYLYCZKO Maxime",
  "LEROY Philippe",
  "MORLIN Nicolas",
  "RENAULT Béatrice",
];

export default function OthersFormSlider() {
  const router = useRouter();
  const images = [
    "/EN_certif.png",
    "/EN_regles_secu.png",
    "/EN_plan.png",
    "/EN_obligations.png",
    "/EN_interdictions.png",
    "/EN_deversement.png",
    "/EN_environnement.png"
  ];

  const [index, setIndex] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    telephone: "",
    nbrPersonnes: "",
    personneAContacter: "",
    distanceParcourue: "",
    energie: "",
    puissanceFiscale: "",
    plaque: ""
  });

  const handleNext = () => {
    if (index < images.length - 1) {
      setIndex(index + 1);
    } else {
      setShowForm(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/others/entree", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData}),
      });
      const data = await res.json();
      if (data.success) {
        router.push("/");
      } else {
        alert("Erreur lors de l'enregistrement : " + data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Erreur serveur.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle =
    "w-full p-3 border border-gray-300 rounded-md bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <main className="relative flex flex-col items-center justify-start min-h-screen bg-gray-50 pt-40 pb-20">
      <button onClick={() => router.push("/en")} className="absolute top-5 left-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
        ← Back
      </button>
      <div className="absolute top-10 left-1/2 -translate-x-1/2">
        <Image src="/indorama.jpeg" alt="Logo Indorama" width={250} height={100} />
      </div>

      <div className="flex flex-col items-center gap-8 w-full">
        {!showForm ? (
          <>
            <div className="w-[1000px] max-w-[90vw] h-[600px] flex justify-center items-center">
              <Image
                key={images[index]}
                src={images[index]}
                alt={`Slide ${index + 1}`}
                width={800}
                height={600}
                className="max-h-full max-w-full object-contain rounded-xl shadow-lg transition-all duration-500"
              />
            </div>
            <button
              onClick={handleNext}
              className="w-[150px] h-[50px] bg-[#1864ab] hover:bg-[#1c7ed6] text-white rounded-xl text-2xl font-medium flex justify-center items-center transition-colors"
            >
              Next
            </button>
          </>
        ) : (
          <div className="max-w-3xl w-full mx-auto p-8 bg-white rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-center text-black">
              Please fill out this form :
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First name"
                  required
                  className={inputStyle}
                />
                <input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last name"
                  required
                  className={inputStyle}
                />
              </div>
              <input
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Company"
                required
                className={inputStyle}
              />
              <input
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                placeholder="Phone number"
                required
                className={inputStyle}
              />

              <select
                name="personneAContacter"
                value={formData.personneAContacter}
                onChange={handleChange}
                required
                className={inputStyle}
              >
                <option value="" disabled>
                  Wellman contact person
                </option>
                {CONTACTS_WELLMAN.map((c, i) => (
                  <option key={i} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              <input
                type="number"
                name="nbrPersonnes"
                value={formData.nbrPersonnes}
                onChange={handleChange}
                placeholder="Number of people present"
                min="1"
                required
                className={inputStyle}
              />
              <h2 className="text-2xl font-bold mb-6 text-center text-black">
                CARDBON BALANCE
              </h2>
              <input
                type="text"
                name="plaque"
                value={formData.plaque}
                onChange={handleChange}
                placeholder="Vehicle's registration"
                min="0"
                required
                className={inputStyle}
              />
              <input
                type="number"
                name="distanceParcourue"
                value={formData.distanceParcourue}
                onChange={handleChange}
                placeholder="Distance traveled to come to Wellman"
                min="0"
                required
                className={inputStyle}
              />

              <input
                type="number"
                name="puissanceFiscale"
                value={formData.puissanceFiscale}
                onChange={handleChange}
                placeholder="Fiscal power of the vehicle"
                min="0"
                required
                className={inputStyle}
              />
              <fieldset>
                <legend className="text-base font-medium text-gray-800 mb-3">Energy used</legend>
                <div className="space-y-2">
                  {["Essence", "Diesel", "Électrique", "Hybride"].map((energie) => (
                    <label key={energie} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="energie"
                        value={energie}
                        checked={formData.energie === energie}
                        onChange={handleChange}
                        required
                        className="form-radio h-4 w-4 text-blue-600"
                      />
                      <span className="text-gray-700">{energie}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
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

              <button
                type="submit"
                disabled={loading}
                className={`w-full h-[50px] rounded-md text-lg font-semibold transition-colors ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#1864ab] hover:bg-[#1c7ed6] text-white"
                }`}
              >
                {loading ? "Sending..." : "SUBMIT"}
              </button>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}
