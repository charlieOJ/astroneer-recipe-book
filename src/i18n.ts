import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";

const backendLoadPath = `${process.env.PUBLIC_URL || ""}/locales/{{lng}}/{{ns}}.json`;

i18n
  .use(Backend)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    fallbackLng: "en",
    // debug: true,

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    backend: {
      loadPath: backendLoadPath,
    },
    supportedLngs: ["en", "fr"],
    preload: ["en", "fr"],
    ns: ["translation"],
    defaultNS: "translation",
  });

export default i18n;
