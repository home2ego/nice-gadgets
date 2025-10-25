import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import enAccessoriesPage from "./locales/en/accessoriesPage.json";
import enCommon from "./locales/en/common.json";
import enFooter from "./locales/en/footer.json";
import enHeader from "./locales/en/header.json";
import enHomePage from "./locales/en/homePage.json";
import enPhonesPage from "./locales/en/phonesPage.json";
import enTabletsPage from "./locales/en/tabletsPage.json";

import fiAccessoriesPage from "./locales/fi/accessoriesPage.json";
import fiCommon from "./locales/fi/common.json";
import fiFooter from "./locales/fi/footer.json";
import fiHeader from "./locales/fi/header.json";
import fiHomePage from "./locales/fi/homePage.json";
import fiPhonesPage from "./locales/fi/phonesPage.json";
import fiTabletsPage from "./locales/fi/tabletsPage.json";

import plAccessoriesPage from "./locales/pl/accessoriesPage.json";
import plCommon from "./locales/pl/common.json";
import plFooter from "./locales/pl/footer.json";
import plHeader from "./locales/pl/header.json";
import plHomePage from "./locales/pl/homePage.json";
import plPhonesPage from "./locales/pl/phonesPage.json";
import plTabletsPage from "./locales/pl/tabletsPage.json";

import ukAccessoriesPage from "./locales/uk/accessoriesPage.json";
import ukCommon from "./locales/uk/common.json";
import ukFooter from "./locales/uk/footer.json";
import ukHeader from "./locales/uk/header.json";
import ukHomePage from "./locales/uk/homePage.json";
import ukPhonesPage from "./locales/uk/phonesPage.json";
import ukTabletsPage from "./locales/uk/tabletsPage.json";

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
        phonesPage: enPhonesPage,
        tabletsPage: enTabletsPage,
        accessoriesPage: enAccessoriesPage,
      },
      fi: {
        common: fiCommon,
        header: fiHeader,
        footer: fiFooter,
        homePage: fiHomePage,
        phonesPage: fiPhonesPage,
        tabletsPage: fiTabletsPage,
        accessoriesPage: fiAccessoriesPage,
      },
      pl: {
        common: plCommon,
        header: plHeader,
        footer: plFooter,
        homePage: plHomePage,
        phonesPage: plPhonesPage,
        tabletsPage: plTabletsPage,
        accessoriesPage: plAccessoriesPage,
      },
      uk: {
        common: ukCommon,
        header: ukHeader,
        footer: ukFooter,
        homePage: ukHomePage,
        phonesPage: ukPhonesPage,
        tabletsPage: ukTabletsPage,
        accessoriesPage: ukAccessoriesPage,
      },
    },
    fallbackLng: "en",
    ns: [
      "common",
      "header",
      "footer",
      "homePage",
      "phonesPage",
      "tabletsPage",
      "accessoriesPage",
    ],
    defaultNS: "common",
    fallbackNS: "common",
    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
    },
    interpolation: { escapeValue: false },
  });

export default i18n;
