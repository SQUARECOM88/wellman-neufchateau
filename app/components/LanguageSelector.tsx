"use client";

import { useRouter } from "next/navigation";

export default function LanguageSelector() {
  const router = useRouter();

  const languages = [
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "fr", label: "Français", flag: "🇫🇷" },
    { code: "de", label: "Deutsch", flag: "🇩🇪" },
    { code: "es", label: "Español", flag: "🇪🇸" },
    { code: "it", label: "Italiano", flag: "🇮🇹" },
    { code: "po", label: "Português", flag: "🇵🇹" },
    { code: "pl", label: "Polski", flag: "🇵🇱" },
    { code: "li", label: "Lietuvių", flag: "🇱🇹" },
    { code: "ro", label: "Română", flag: "🇷🇴" },
  ];

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value;
    if (!lang) return;
    if (lang == "en") {
      router.push('/en')
    } else if (lang == "fr"){
      router.push('/')
    } else {
      router.push(`/${lang}/logistique`);
    }
  };

  return (
    <div className="absolute top-6 right-6">
      <select
        defaultValue=""
        onChange={handleSelect}
        className="bg-white border border-gray-300 text-black text-sm rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">🌍 Language</option>
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.flag} {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
}
