import { defaultLocale, locales, type Locale } from "./config";
import en from "./translations/en.json";
import ja from "./translations/ja.json";

type TranslationSchema = typeof en;

const translations: Record<Locale, TranslationSchema> = { en, ja };

type NestedKeys<T, Prefix extends string = ""> = T extends object
  ? {
      [K in keyof T & string]: T[K] extends object
        ? NestedKeys<T[K], Prefix extends "" ? K : `${Prefix}.${K}`>
        : Prefix extends ""
          ? K
          : `${Prefix}.${K}`;
    }[keyof T & string]
  : never;

export type TranslationKey = NestedKeys<TranslationSchema>;

function getNestedValue(obj: unknown, path: string): string {
  const result = path
    .split(".")
    .reduce(
      (acc, key) =>
        acc && typeof acc === "object"
          ? (acc as Record<string, unknown>)[key]
          : undefined,
      obj,
    );
  return typeof result === "string" ? result : path;
}

export function t(locale: Locale, key: TranslationKey): string {
  return getNestedValue(translations[locale], key);
}

export function tArray<K extends string>(
  locale: Locale,
  key: K,
): Array<Record<string, string>> {
  const parts = key.split(".");
  let result: unknown = translations[locale];
  for (const part of parts) {
    result =
      result && typeof result === "object"
        ? (result as Record<string, unknown>)[part]
        : undefined;
  }
  return Array.isArray(result) ? (result as Array<Record<string, string>>) : [];
}

export function getLocaleFromUrl(url: URL): Locale {
  const [, segment] = url.pathname.split("/");
  if (locales.includes(segment as Locale)) {
    return segment as Locale;
  }
  return defaultLocale;
}

export function getLocalizedPath(path: string, locale: Locale): string {
  if (locale === defaultLocale) {
    return path;
  }
  return `/${locale}${path}`;
}
