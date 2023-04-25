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
        create: "Create",

        //success-m
        updateAvatar: "Avatar updated successfully",
        selectedFile: "Selected file deleted successfully",

        //error-m
        wrongEmail: "you entered the wrong email",
        filedToSend: "Failed to send data, please try again",
        emailNotForForgotPassword: "Email not for forgot password",
        thereIsNoSuch: "There is no such thing active account",

        //notfall
        allergies: "ALLERGIES",
        dateOfBrith: "DATE OF BIRTH",
        emergencyContact: "EMERGENCY CONTACT",
        firstName: "FIRST NAME",
        lastName: "LAST NAME",
        importTantInfo: "IMPORTTANT INFORMATION / OR MEDICATIONS",

        //akte
        diagnosen: "DIAGNOSES",
        operationen: "OPERATIONS",
        medicamentPlan: "MEDICATION PLAN",
        nebenDiagnosen: "SECONDARY DIAGNOSIS",
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
        uploadTitle: "File Successfully Uploaded",
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
        create: "Erstellen",

        //success-m
        updateAvatar: "Avatar erfolgreich aktualisiert",
        selectedFile: "Ausgewählte Datei erfolgreich gelöscht",

        //errors-m
        wrongEmail: "Sie haben die falsche E-Mail-Adresse eingegeben",
        filedToSend:
          "Daten konnten nicht gesendet werden, bitte versuchen Sie es erneut",
        emailNotForForgotPassword: "E-Mail nicht für vergessenes Passwort",
        thereIsNoSuch: "Es gibt kein aktives Konto",

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

        //popup-m
        wellDone: "Gut gemacht",
        descWellDone: "Neues Passwort erfolgreich erstellt",
        sayHello: "Begrüßen Sie Ihre Persönliche GesundheitsCard",
        uploadTitle: "Datei erfolgreich hochgeladen",
        yourRegistration: "Your Registration was successful ",
        resetYourPasword: "Ihre Registrierung war erfolgreich",
        descReset:
          "Link zum Zurücksetzen des Passworts an Ihre registrierte E-Mail-Adresse gesendet. Bitte überprüfen Sie Ihren Posteingang oder Spam-Ordner",
      },
    },
  },
});

export default i18n;
