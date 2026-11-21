import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import id from "./locales/id.json";
import en from "./locales/en.json";
import ja from "./locales/ja.json";
import { readLocalStorage } from "@/lib/localStorage";

const STORAGE_KEY = "numatik_language";

const savedLang = readLocalStorage(STORAGE_KEY) || "id";
const validLangs = ["id", "en", "ms-MY", "ja", "zh-CN", "ru"];
const resolvedLang = validLangs.includes(savedLang) ? savedLang : "id";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      id: { translation: id },
      en: { translation: en },
      ja: { translation: ja },
      "zh-CN": { translation: {} },
      "ms-MY": { translation: {} },
      ru: { translation: {} },
    },
    lng: resolvedLang,
    fallbackLng: "id",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
