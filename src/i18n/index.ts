import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import enCommon from "./locales/en/common.json";
import enFooter from "./locales/en/footer.json";
import enHeader from "./locales/en/header.json";
import enHomePage from "./locales/en/homePage.json";

import fiCommon from "./locales/fi/common.json";
import fiFooter from "./locales/fi/footer.json";
import fiHeader from "./locales/fi/header.json";
import fiHomePage from "./locales/fi/homePage.json";

import plCommon from "./locales/pl/common.json";
import plFooter from "./locales/pl/footer.json";
import plHeader from "./locales/pl/header.json";
import plHomePage from "./locales/pl/homePage.json";

import ukCommon from "./locales/uk/common.json";
import ukFooter from "./locales/uk/footer.json";
import ukHeader from "./locales/uk/header.json";
import ukHomePage from "./locales/uk/homePage.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // debug: true, // off in production
    resources: {
      en: {
        common: enCommon,
        header: enHeader,
        footer: enFooter,
        homePage: enHomePage,
      },
      fi: {
        common: fiCommon,
        header: fiHeader,
        footer: fiFooter,
        homePage: fiHomePage,
      },
      pl: {
        common: plCommon,
        header: plHeader,
        footer: plFooter,
        homePage: plHomePage,
      },
      uk: {
        common: ukCommon,
        header: ukHeader,
        footer: ukFooter,
        homePage: ukHomePage,
      },
    },
    fallbackLng: "en",
    ns: ["common", "header", "footer", "homePage"],
    defaultNS: "common",
    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
    },
    interpolation: { escapeValue: false },
  });

export default i18n;
