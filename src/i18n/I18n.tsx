import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const language = localStorage.getItem("language");

let lang = language || "en";

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  lng: lang,
  interpolation: { escapeValue: false },
  resources: {
    en: {
      translation: {
        //all termin
        add: "Add",
        login: "Login",
        addMore: "Add more",
        contact: "Contact",
        done: "DONE",
        document: "Files",
        deleteProfile: "Delete profile",
        editProfile: "Edit profile",
        emergency: "EMERGENCY",
        medicall: "MEDICALFILES",
        patientRecord: "PATIENT RECORD",
        profile: "Profile",
        photo: "Images",
        medicalRecord: "MEDICAL RECORD",
        signOut: "Sign out",
        changePassword: "Change password",

        //notfall
        allergies: "ALLERGIES",
        dateOfBrith: "DATE OF BIRTH",
        emergencyContact: "EMERGENCY CONTACT",
        firstName: "FRIST NAME",
        lastName: "LAST NAME",
        importTantInfo: "IMPORTTANT INFORMATION / OR MEDICATIONS",

        //akte
        diagnosen: "DIAGNOSEN",
        operationen: "OPERATIONEN",
        medicamentPlan: "MEDIKAMENTEN PLAN",
        nebenDiagnosen: "NEBENDIAGNOSEN",
        location: "LOCATION",

        //guest
        guestLogin: "Guest Login",
        yourName: "Your name",
        enterEmail: "Enter email",
        desc: "Enter the password we sent to your email adress ",
        next: "Next",
        register: "Register",

        //popup-messengers
        wellDone: "Well Done",
        descWellDone: "New password created successfully",
        sayHello: "Say Hello to your Personal HealthCard ",
        yourRegistration: "Your Registration was successful ",
        resetYourPasword: "Reset Your Password",
        descReset:
          "Password reset link sent to your registered email address. Please check your inbox or spam folder",
      },
    },
    de: {
      translation: {
        //all termin
        add: "Hinzufügen",
        login: "ANMELDUNG",
        addMore: "Mehr hinzufügen",
        contact: "Kontakt",
        done: "Speichern",
        document: "Berichte",
        deleteProfile: "Profil löschen",
        editProfile: "Bearbeiten",
        emergency: "Notfall",
        medicall: "Akte",
        patientRecord: "PATIENTENAKTE",
        profile: "Profil",
        photo: "Bilder ",
        medicalRecord: "PATIENTENAKTE",
        signOut: "Austragen",
        changePassword: "Kennwort ändern",

        //notfall
        allergies: "ALLERGIE",
        dateOfBrith: "GEBURTSDATUM",
        emergencyContact: "NOTFALLKONTAKT",
        firstName: "VORNAME",
        lastName: "NACHNAME",
        importTantInfo: "BESONDERHEITEN",

        //akte
        diagnosen: "DIAGNOSEN",
        operationen: "OPERATIONEN",
        medicamentPlan: "MEDIKAMENTEN PLAN",
        nebenDiagnosen: "NEBENDIAGNOSEN",
        location: "LOCATION",

        //guest
        guestLogin: "Gast-Login",
        yourName: "Ihren Namen",
        enterEmail: "Email eingeben",
        desc: "Geben Sie das Passwort ein, das wir an Ihre E-Mail-Adresse gesendet haben",
        next: "nächste",
        register: "Registrieren",
      },
    },
  },
});

export default i18n;
