"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function OthersTable({
  data,
  totalPages,
  currentPage,
  companies,
  search,
  companyFilter,
}: {
  data: any[];
  totalPages: number;
  currentPage: number;
  companies: string[];
  search: string;
  companyFilter: string;
}) {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState(search);
  const [companyInput, setCompanyInput] = useState(companyFilter);

  // 🔄 Mise à jour automatique de l’URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchInput) params.set("search", searchInput);
    if (companyInput) params.set("company", companyInput);
    params.set("page", "1");
    const timer = setTimeout(() => {
      router.push(`?${params.toString()}`);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchInput, companyInput]);

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
      {/* 🔍 Barre recherche + filtre */}
      <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
        <input
          type="text"
          placeholder="Rechercher (nom, entreprise, immat...)"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 text-sm w-full sm:w-1/2 text-black"
        />

        <select
          value={companyInput}
          onChange={(e) => setCompanyInput(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 text-sm text-black"
        >
          <option value="">Toutes les entreprises</option>
          {companies.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* 🧾 Tableau paginé */}
      <table className="min-w-full border border-gray-200 text-sm">
        <thead className="bg-[#1864ab] text-white">
          <tr>
            <th className="p-3 text-left">Nom</th>
            <th className="p-3 text-left">Prénom</th>
            <th className="p-3 text-left">Entreprise</th>
            <th className="p-3 text-left">Téléphone</th>
            <th className="p-3 text-left">Immatriculation</th>
            <th className="p-3 text-left">Énergie</th>
            <th className="p-3 text-left">Personnes présentes</th>
            <th className="p-3 text-left">Puissance fiscale</th>
            <th className="p-3 text-left">Date entrée</th>
            <th className="p-3 text-left">Date sortie</th>
            <th className="p-3 text-left">Durée</th>
            <th className="p-3 text-left">Signature</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((o) => (
              <tr key={o.id} className="border-t border-gray-200">
                <td className="p-3 text-black">{o.lastName}</td>
                <td className="p-3 text-black">{o.firstName}</td>
                <td className="p-3 text-black">{o.company}</td>
                <td className="p-3 text-black">{o.telephone}</td>
                <td className="p-3 text-black">{o.registration}</td>
                <td className="p-3 text-black">{o.energie}</td>
                <td className="p-3 text-black">{o.nbrPersonnes}</td>
                <td className="p-3 text-black">{o.puissanceFiscale}</td>
                <td className="p-3 text-black">
                  {new Date(o.dateEntree).toLocaleString()}
                </td>
                <td className="p-3 text-black">
                  {o.dateSortie ? new Date(o.dateSortie).toLocaleString() : "—"}
                </td>
                <td className="p-3 text-black">{o.tempsPasse ?? "—"} min</td>
                <td className="p-3">
                  {o.signature ? (
                    <img
                      src={o.signature}
                      alt="Signature"
                      className="w-32 h-16 object-contain border rounded-md"
                    />
                  ) : (
                    <span className="text-gray-400">Aucune</span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={12} className="text-center p-4 text-gray-500">
                Aucun résultat trouvé
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* 🔢 Pagination */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          disabled={currentPage <= 1}
          onClick={() =>
            router.push(
              `?page=${currentPage - 1}&search=${searchInput}&company=${companyInput}`
            )
          }
          className="px-4 py-2 rounded-md border text-blue-600 border-blue-300 disabled:text-gray-400 disabled:border-gray-200"
        >
          ◀ Précédent
        </button>

        <span className="text-gray-700">
          Page {currentPage} / {totalPages}
        </span>

        <button
          disabled={currentPage >= totalPages}
          onClick={() =>
            router.push(
              `?page=${currentPage + 1}&search=${searchInput}&company=${companyInput}`
            )
          }
          className="px-4 py-2 rounded-md border text-blue-600 border-blue-300 disabled:text-gray-400 disabled:border-gray-200"
        >
          Suivant ▶
        </button>
      </div>
    </div>
  );
}
