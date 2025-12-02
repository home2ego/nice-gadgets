import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import enCartPage from "./locales/en/cartPage.json";
import enCommon from "./locales/en/common.json";
import enContactsPage from "./locales/en/contactsPage.json";
import enFavouritesPage from "./locales/en/favouritesPage.json";
import enFooter from "./locales/en/footer.json";
import enHeader from "./locales/en/header.json";
import enHomePage from "./locales/en/homePage.json";
import enProductDetailsPage from "./locales/en/productDetailsPage.json";
import enRightsPage from "./locales/en/rightsPage.json";

import fiCartPage from "./locales/fi/cartPage.json";
import fiCommon from "./locales/fi/common.json";
import fiContactsPage from "./locales/fi/contactsPage.json";
import fiFavouritesPage from "./locales/fi/favouritesPage.json";
import fiFooter from "./locales/fi/footer.json";
import fiHeader from "./locales/fi/header.json";
import fiHomePage from "./locales/fi/homePage.json";
import fiProductDetailsPage from "./locales/fi/productDetailsPage.json";
import fiRightsPage from "./locales/fi/rightsPage.json";

import plCartPage from "./locales/pl/cartPage.json";
import plCommon from "./locales/pl/common.json";
import plContactsPage from "./locales/pl/contactsPage.json";
import plFavouritesPage from "./locales/pl/favouritesPage.json";
import plFooter from "./locales/pl/footer.json";
import plHeader from "./locales/pl/header.json";
import plHomePage from "./locales/pl/homePage.json";
import plProductDetailsPage from "./locales/pl/productDetailsPage.json";
import plRightsPage from "./locales/pl/rightsPage.json";

import ukCartPage from "./locales/uk/cartPage.json";
import ukCommon from "./locales/uk/common.json";
import ukContactsPage from "./locales/uk/contactsPage.json";
import ukFavouritesPage from "./locales/uk/favouritesPage.json";
import ukFooter from "./locales/uk/footer.json";
import ukHeader from "./locales/uk/header.json";
import ukHomePage from "./locales/uk/homePage.json";
import ukProductDetailsPage from "./locales/uk/productDetailsPage.json";
import ukRightsPage from "./locales/uk/rightsPage.json";

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
        cartPage: enCartPage,
        favouritesPage: enFavouritesPage,
        rightsPage: enRightsPage,
        contactsPage: enContactsPage,
        productDetailsPage: enProductDetailsPage,
      },
      fi: {
        common: fiCommon,
        header: fiHeader,
        footer: fiFooter,
        homePage: fiHomePage,
        cartPage: fiCartPage,
        favouritesPage: fiFavouritesPage,
        rightsPage: fiRightsPage,
        contactsPage: fiContactsPage,
        productDetailsPage: fiProductDetailsPage,
      },
      pl: {
        common: plCommon,
        header: plHeader,
        footer: plFooter,
        homePage: plHomePage,
        cartPage: plCartPage,
        favouritesPage: plFavouritesPage,
        rightsPage: plRightsPage,
        contactsPage: plContactsPage,
        productDetailsPage: plProductDetailsPage,
      },
      uk: {
        common: ukCommon,
        header: ukHeader,
        footer: ukFooter,
        homePage: ukHomePage,
        cartPage: ukCartPage,
        favouritesPage: ukFavouritesPage,
        rightsPage: ukRightsPage,
        contactsPage: ukContactsPage,
        productDetailsPage: ukProductDetailsPage,
      },
    },
    fallbackLng: "en",
    ns: [
      "common",
      "header",
      "footer",
      "homePage",
      "cartPage",
      "favouritesPage",
      "rightsPage",
      "contactsPage",
      "productDetailsPage",
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
