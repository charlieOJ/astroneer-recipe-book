import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function useLanguageFromUrl() {
  const { lng } = useParams<{ lng?: string }>();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (lng) {
      if (i18n.options.supportedLngs && i18n.options.supportedLngs.includes(lng)) {
        i18n.changeLanguage(lng);
      } else {
        console.warn(`Locale not supported : ${lng}`);
        i18n.changeLanguage("en");
      }
    } else {
      i18n.changeLanguage("en");
    }
  }, [lng, i18n]);
}
