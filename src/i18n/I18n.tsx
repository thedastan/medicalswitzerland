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
        //all termin
        add: "Add",
        addMore: "Add more",
        contact: "Contact",
        done: "DONE",
        document: "Files",
        editProfile: "Edit profile",
        emergency: "EMERGENCY",
        medicall: "MEDICALFILES",
        patientRecord: "PATIENT RECORD",
        profile: "Profile",
        photo: "Images",
        medicalRecord: "MEDICAL RECORD",

        //notfall
        allergies: "ALLERGIES",
        dateOfBrith: "DATE OF BIRTH",
        emergencyContact: "EMERGENCY CONTACT",
        fritName: "FRIST NAME",
        lastName: "LAST NAME",
        importTantInfo: "IMPORTTANT INFORMATION / OR MEDICATIONS",

        //akte
        diagnosen: "DIAGNOSEN",
        operationen: "OPERATIONEN",
        medicamentPlan: "MEDIKAMENTEN PLAN",
        nebenDiagnosen: "NEBENDIAGNOSEN",
        location: "LOCATION",
      },
    },
    de: {
      translation: {
        //all termin
        add: "Hinzufügen",
        addMore: "Mehr hinzufügen",
        contact: "Kontakt",
        done: "Speichern",
        document: "Berichte",
        editProfile: "Bearbeiten",
        emergency: "Notfall",
        medicall: "akte",
        patientRecord: "PATIENTENAKTE",
        profile: "Profil",
        photo: "Bilder ",
        medicalRecord: "PATIENTENAKTE",

        //notfall
        allergies: "ALLERGIE",
        dateOfBrith: "GEBURTSDATUM",
        emergencyContact: "NOTFALLKONTAKT",
        fritName: "VORNAME",
        lastName: "NACHNAME",
        importTantInfo: "BESONDERHEITEN",

        //akte
        diagnosen: "DIAGNOSEN",
        operationen: "OPERATIONEN",
        medicamentPlan: "MEDIKAMENTEN PLAN",
        nebenDiagnosen: "NEBENDIAGNOSEN",
        location: "LOCATION",
      },
    },
  },
});

export default i18n;
