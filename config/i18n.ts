// config/i18n.ts

import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import en from "../locales/en.json"
import uk from "../locales/uk.json"

const deviceLocale = Intl.DateTimeFormat().resolvedOptions().locale.split("-")[0] ?? "en"
const language = deviceLocale === "uk" || deviceLocale === "ru" ? "uk" : "en"

i18n.use(initReactI18next).init({
	resources: {
		uk: { translation: uk },
		en: { translation: en },
	},
	lng: language,
	fallbackLng: "uk",
	interpolation: { escapeValue: false },
})

export default i18n
