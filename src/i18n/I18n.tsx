import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const language = localStorage.getItem("language");

let lang = language || "de"; // Default to English instead of German

i18n.use(initReactI18next).init({
	fallbackLng: "de", // Fallback language is now English
	lng: lang,
	interpolation: { escapeValue: false },
	resources: {
		en: {
			translation: {
				add: "Add",
				login: "Login",
				addMore: "Add more",
				contact: "Contact",
				done: "DONE",
				upload: "Upload",
				document: "Files",
				deleteProfile: "Delete profile",
				editProfile: "Edit profile",
				emergency: "EMERGENCY",
				medicall: "MEDICAL RECORDS",
				patientRecord: "PATIENT RECORD",
				profile: "Profile",
				photo: "Images",
				medicalRecord: "MEDICAL RECORD",
				signOut: "Sign out",
				changePassword: "Change password",
				create: "Create",
				cropAvatar: "Edit Profile Picture",
				saveAvatar: "Save Profile Picture",
				fileUpload: "File is uploading...",
				CREATENew: "CREATE NEW PASSWORD",
				saveContact: "Save our contacts",
				updateAvatar: "Avatar updated successfully",
				selectedFile: "Selected file deleted successfully",
				wrongEmail: "you entered the wrong email",
				filedToSend: "Failed to send data, please try again",
				emailNotForForgotPassword: "Email not for forgot password",
				thereIsNoSuch: "There is no such thing active account",
				allergies: "ALLERGIES",
				dateOfBrith: "DATE OF BIRTH",
				emergencyContact: "EMERGENCY CONTACT",
				firstName: "FIRST NAME",
				lastName: "LAST NAME",
				importTantInfo: "IMPORTANT INFORMATION / OR MEDICATIONS",
				diagnosen: "DIAGNOSIS",
				operationen: "OPERATIONS",
				medicamentPlan: "MEDICATION PLAN",
				nebenDiagnosen: "OCCUPATION",
				location: "ADDRESS",
				guestLogin: "Guest Login",
				yourName: "Your name",
				enterEmail: "Enter email",
				desc: "Enter the password we sent to your email address ",
				next: "Next",
				register: "Register",
				fileAnAll: "Fill in all fields, they are both required",
				thisIsCode: "This code is wrong",
				wellDone: "Well Done",
				descWellDone: "New password created successfully",
				sayHello: "Say Hello to your Personal HealthCard ",
				uploadTitle: "File Successfully Uploaded",
				yourRegistration: "Your Registration was successful ",
				resetYourPasword: "Reset Your Password",
				deleteFile: "Delete file",
				descReset:
					"Password reset link sent to your registered email address. Please check your inbox or spam folder",
				fileABig: "The file is too big",
				checkTheUserName: "Mistake!!! Check the username or that password",
				clickIfYouDontRememberYourPassword:
					"Click if you don’t remember your password",
				welcome: "Welcome back",
				welcomeToYour: "Welcome to your medicalswitzerland HealthCard",
				wrongEmailAdress: "Wrong email address",
				letsStartWith: "Let's start with your registration",
				requiredFields: "Required fields",
				passwordDoesNot: "Password does not match",
				fieldPasswordRequired: "Field password required",
				passwordsMustMatch: "passwords must match",
				takenEmail: "* The e-mail address you entered is already taken",
				no: "NO",
				yes: "YES",
				SuccessDelete: "Your profile has been deleted",
				deleteProfileConfirm:
					"Do you want to delete your medicalswitzerland Profile",
				deleteSuccessFile: "Your profile has been successfully deleted",
				delete: "Delete",

				Terms: "Terms of Use",
				TermsDesc1: "Before continuing, please read our",
				TermsDesc2: "Terms of use",
				TermsDesc3: "and",
				TermsDesc4: "Privacy Policy",
				TermsDesc5:
					". This is necessary to continue working with our application.",
				Continue: "Continue",
				acquainted: "I have read the terms and conditions and accept them",
			},
		},
		de: {
			translation: {
				add: "Hinzufügen",
				login: "ANMELDUNG",
				addMore: "Mehr hinzufügen",
				contact: "Kontakt",
				done: "Speichern",
				upload: "Hochladen",
				document: "Berichte",
				deleteProfile: "Profil löschen",
				editProfile: "Bearbeiten",
				emergency: "Notfall",
				medicall: "Akte",
				patientRecord: "PATIENTENAKTE",
				profile: "Profil",
				photo: "Bilder",
				medicalRecord: "PATIENTENAKTE",
				signOut: "Ausloggen",
				changePassword: "Kennwort ändern",
				create: "Erstellen",
				cropAvatar: "Profilbild bearbeiten",
				saveAvatar: "Profilbild speichern",
				fileUpload: "Datei wird hochgeladen...",
				CREATENew: "NEUES PASSWORT FESTLEGEN",
				saveContact: "Kontakt speichern",
				updateAvatar: "Profilbild erfolgreich aktualisiert",
				selectedFile: "Ausgewählte Datei erfolgreich gelöscht",
				wrongEmail: "Sie haben die falsche E-Mail-Adresse eingegeben",
				filedToSend:
					"Daten konnten nicht gesendet werden, bitte versuchen Sie es erneut",
				emailNotForForgotPassword: "E-Mail nicht für vergessenes Passwort",
				thereIsNoSuch: "Es gibt kein aktives Konto",
				allergies: "ALLERGIE",
				dateOfBrith: "GEBURTSDATUM",
				emergencyContact: "NOTFALLKONTAKT",
				firstName: "VORNAME",
				lastName: "NACHNAME",
				importTantInfo: "BESONDERHEITEN",
				diagnosen: "DIAGNOSEN",
				operationen: "OPERATIONEN",
				medicamentPlan: "MEDIKAMENTEN PLAN",
				nebenDiagnosen: "BERUF",
				location: "ADRESSE",
				guestLogin: "Gast-Login",
				yourName: "Ihren Namen",
				enterEmail: "Email eingeben",
				desc: "Geben Sie das Passwort ein, das wir an Ihre E-Mail-Adresse gesendet haben",
				next: "nächste",
				register: "Registrieren",
				fileAnAll: "Füllen Sie alle Felder aus, beide sind Pflichtfelder",
				thisIsCode: "Dieser Code ist falsch",
				wellDone: "Gut gemacht",
				descWellDone: "Neues Passwort erfolgreich erstellt",
				sayHello: "Begrüßen Sie Ihre Persönliche GesundheitsCard",
				uploadTitle: "Datei erfolgreich hochgeladen",
				yourRegistration: "Your Registration was successful",
				resetYourPasword: "Ihre Anfrage war erfolgreich",
				descReset:
					"Link zum Zurücksetzen des Passworts an Ihre registrierte E-Mail-Adresse gesendet. Bitte überprüfen Sie Ihren Posteingang oder Spam-Ordner",
				fileABig: "Die Datei ist zu groß",
				checkTheUserName:
					"Überprüfen Sie den Benutzernamen und geben Sie das korrekte Passwort ein.",
				clickIfYouDontRememberYourPassword:
					"Klicken Sie, wenn Sie sich nicht an Ihr Passwort erinnern",
				welcome: "Willkommen zurück",
				welcomeToYour: "Willkommen auf Ihrer medicalswitzerland HealthCard",
				wrongEmailAdress: "falsche E-Mail Adresse",
				letsStartWith: "Beginnen wir mit der Registrierung",
				requiredFields: "Benötigte Felder",
				passwordDoesNot: "Passwort stimmt nicht überein",
				fieldPasswordRequired: "Feldpasswort erforderlich",
				passwordsMustMatch: "Die Passwörter müssen übereinstimmen",
				takenEmail: "* Die eingegebene e mail Adresse ist bereits vergeben.",
				no: "Nein",
				yes: "Ja",
				SuccessDelete:
					"Ihr Profil und alle dazugehörigen Daten und Bilder wurden gelöscht.",
				deleteProfileConfirm:
					"Möchten Sie Ihr medicalswitzerland Profil löschen",
				deleteSuccessFile: "Ihr Profil wurde erfolgreich gelöscht",
				delete: "Löschen",

				Terms: "Nutzungsbedingungen",
				TermsDesc1: "Bitte lesen Sie vor dem Fortfahren unsere",
				TermsDesc2: "Nutzungsbedingungen",
				TermsDesc3: "und",
				TermsDesc4: "Datenschutzrichtlinie",
				TermsDesc5:
					". Dies ist erforderlich, um unsere Anwendung weiterhin zu nutzen.",
				Continue: "Weiter",
				acquainted: "Ich habe die Bedingungen gelesen und akzeptiere sie",
			},
		},
		fr: {
			translation: {
				add: "Ajouter",
				login: "Se connecter",
				addMore: "Ajouter plus",
				contact: "Contact",
				done: "TERMINE",
				upload: "Télécharger",
				document: "Fichiers",
				deleteProfile: "Supprimer le profil",
				editProfile: "Modifier le profil",
				emergency: "URGENCE",
				medicall: "DOSSIEURS MÉDICAUX",
				patientRecord: "Dossier du patient",
				profile: "Profil",
				photo: "Images",
				medicalRecord: "Dossier médical",
				signOut: "Se déconnecter",
				changePassword: "Changer le mot de passe",
				create: "Créer",
				cropAvatar: "Modifier la photo de profil",
				saveAvatar: "Enregistrer la photo de profil",
				fileUpload: "Le fichier est en cours de téléchargement...",
				CREATENew: "CRÉER UN NOUVEAU MOT DE PASSE",
				saveContact: "Enregistrer nos contacts",
				updateAvatar: "Avatar mis à jour avec succès",
				selectedFile: "Fichier sélectionné supprimé avec succès",
				wrongEmail: "Vous avez entré une adresse e-mail incorrecte",
				filedToSend: "Échec de l'envoi des données, veuillez réessayer",
				emailNotForForgotPassword:
					"L'email n'est pas valable pour la récupération du mot de passe",
				thereIsNoSuch: "Il n'y a pas de compte actif correspondant",
				allergies: "ALLERGIES",
				dateOfBrith: "DATE DE NAISSANCE",
				emergencyContact: "CONTACT D'URGENCE",
				firstName: "PRÉNOM",
				lastName: "NOM DE FAMILLE",
				importTantInfo: "INFORMATIONS IMPORTANTES / MÉDICAMENTS",
				diagnosen: "DIAGNOSTICS",
				operationen: "OPÉRATIONS",
				medicamentPlan: "PLAN MÉDICAMENTEUX",
				nebenDiagnosen: "OCCUPATION",
				location: "ADRESSE",
				guestLogin: "Connexion invité",
				yourName: "Votre nom",
				enterEmail: "Entrez l'e-mail",
				desc: "Entrez le mot de passe que nous avons envoyé à votre adresse e-mail",
				next: "Suivant",
				register: "S'inscrire",
				fileAnAll: "Veuillez remplir tous les champs, ils sont obligatoires",
				thisIsCode: "Ce code est incorrect",
				wellDone: "Bien joué",
				descWellDone: "Nouveau mot de passe créé avec succès",
				sayHello: "Dites bonjour à votre carte de santé personnelle",
				uploadTitle: "Fichier téléchargé avec succès",
				yourRegistration: "Votre inscription a réussi",
				resetYourPasword: "Réinitialiser votre mot de passe",
				descReset:
					"Le lien de réinitialisation du mot de passe a été envoyé à votre adresse e-mail enregistrée. Veuillez vérifier votre boîte de réception ou votre dossier de courrier indésirable.",
				fileABig: "Le fichier est trop grand",
				checkTheUserName:
					"Erreur ! Vérifiez le nom d'utilisateur ou le mot de passe",
				clickIfYouDontRememberYourPassword:
					"Cliquez si vous ne vous souvenez plus de votre mot de passe",
				welcome: "Bienvenue à nouveau",
				welcomeToYour: "Bienvenue sur votre carte médicale de santé",
				wrongEmailAdress: "Adresse e-mail incorrecte",
				letsStartWith: "Commençons par votre inscription",
				requiredFields: "Champs requis",
				passwordDoesNot: "Le mot de passe ne correspond pas",
				fieldPasswordRequired: "Champ de mot de passe requis",
				passwordsMustMatch: "Les mots de passe doivent correspondre",
				takenEmail: "* L'adresse e-mail que vous avez entrée est déjà prise",
				no: "Non",
				yes: "Oui",
				SuccessDelete: "Votre profil a été supprimé",
				deleteProfileConfirm:
					"Souhaitez-vous supprimer votre profil medicalswitzerland ?",
				deleteSuccessFile: "Votre profil a été supprimé avec succès",
				delete: "Supprimer",

				Terms: "Conditions d'utilisation",
				TermsDesc1: "Avant de continuer, veuillez lire nos",
				TermsDesc2: "Conditions d'utilisation",
				TermsDesc3: "et",
				TermsDesc4: "Politique de confidentialité",
				TermsDesc5:
					". Cela est nécessaire pour continuer à utiliser notre application.",
				Continue: "Continuer",
				acquainted: "J'ai lu et j'accepte les conditions générales",
			},
		},
	},
});

export default i18n;
