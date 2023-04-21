import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export const langs = JSON.parse(localStorage.getItem("lang") as string);

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  lng: "en",
  interpolation: { escapeValue: false },
  resources: {
    en: {
      translation: {
        deleteProfile: "Delete profile",
        signOut: "Sign out",
      },
    },
    de: {
      translation: {
        deleteProfile: "Profil löschen",
        signOut: "Austragen",
      },
    },
  },
});

export default i18n;
