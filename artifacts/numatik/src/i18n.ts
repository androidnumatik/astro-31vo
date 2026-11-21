import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import id from "./locales/id.json";
import en from "./locales/en.json";
import msMY from "./locales/ms-MY.json";
import ja from "./locales/ja.json";
import zhCN from "./locales/zh-CN.json";
import ru from "./locales/ru.json";
import { readLocalStorage } from "@/lib/localStorage";
import { normalizeLanguage } from "@/lib/pickLang";

const STORAGE_KEY = "numatik_language";

const resolvedLang = normalizeLanguage(readLocalStorage(STORAGE_KEY)) ?? "id";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      id: { translation: id },
      en: { translation: en },
      "ms-MY": { translation: msMY },
      ja: { translation: ja },
      "zh-CN": { translation: zhCN },
      ru: { translation: ru },
    },
    lng: resolvedLang,
    fallbackLng: {
      "zh-CN": ["en", "id"],
      ru: ["en", "id"],
      "ms-MY": ["id", "en"],
      default: ["id"],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
