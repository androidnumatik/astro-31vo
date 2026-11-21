import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import i18n from "@/i18n";
import { readLocalStorage, writeLocalStorage } from "@/lib/localStorage";
import { normalizeLanguage } from "@/lib/pickLang";

export type Language = "id" | "en" | "ms-MY" | "ja" | "zh-CN" | "ru";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  hasChosenLanguage: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "numatik_language";

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const urlLanguage = normalizeLanguage(new URLSearchParams(window.location.search).get("lang"));
  const saved = readLocalStorage(STORAGE_KEY);
  const savedLanguage = normalizeLanguage(saved);
  const initial = urlLanguage ?? savedLanguage ?? "id";

  const [language, setLangState] = useState<Language>(initial);
  const [hasChosenLanguage, setHasChosenLanguage] = useState(savedLanguage !== undefined);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    writeLocalStorage(STORAGE_KEY, lang);
    setLangState(lang);
    setHasChosenLanguage(true);
    i18n.changeLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, hasChosenLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
