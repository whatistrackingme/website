export const defaultLocale = "en" as const;
export const locales = ["en", "ja"] as const;

export type Locale = (typeof locales)[number];

export const localeLabels: Record<Locale, string> = {
  en: "English",
  ja: "日本語",
};
