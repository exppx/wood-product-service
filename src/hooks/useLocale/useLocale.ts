import { useEffect, useState } from "react";
import i18n from "@/i18n";
import type { Locale } from "@/types/locales";

export default function useLocale() {
  const [locale, setLocale] = useState<Locale>(i18n.language as Locale);

  useEffect(() => {
    function setNewLocale(newLocale: Locale) {
      void i18n.changeLanguage(newLocale);
    }

    setNewLocale(locale);
  }, [locale]);

  const nextLocale: Locale = locale === "en" ? "ru" : "en";

  function toggleLocale() {
    setLocale((currentLocale) => (currentLocale === "en" ? "ru" : "en"));
  }

  return [locale, toggleLocale, nextLocale] as const;
}
