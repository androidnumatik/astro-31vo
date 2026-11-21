import type { Language } from "@/contexts/LanguageContext";

type LanguageMap = Partial<Record<Language, unknown>>;

const LANGUAGE_FALLBACKS: Record<Language, readonly Language[]> = {
  id: ["id"],
  en: ["en", "id"],
  "ms-MY": ["ms-MY", "id", "en"],
  ja: ["ja", "id"],
  "zh-CN": ["zh-CN", "en", "id"],
  ru: ["ru", "en", "id"],
};

const LANGUAGES = ["id", "en", "ms-MY", "ja", "zh-CN", "ru"] as const;

const isLanguage = (value: string): value is Language =>
  (LANGUAGES as readonly string[]).includes(value);

export const normalizeLanguage = (
  value: string | null | undefined,
): Language | undefined => {
  if (value === "ms") return "ms-MY";
  if (value === "zh") return "zh-CN";
  return value && isLanguage(value) ? value : undefined;
};

export const pickLang = <T extends LanguageMap>(
  map: T,
  language: Language,
): Exclude<T[Language], undefined> => {
  for (const candidate of LANGUAGE_FALLBACKS[language]) {
    const translation = map[candidate];
    if (translation !== undefined) {
      return translation as Exclude<T[Language], undefined>;
    }
  }

  throw new Error(`No translation available for "${language}" or its fallback languages.`);
};
