// config/i18n.ts

import AsyncStorage from "@react-native-async-storage/async-storage"
import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import en from "../locales/en.json"
import uk from "../locales/uk.json"

export const LANGUAGE_STORAGE_KEY = "@app_language"

i18n.use(initReactI18next).init({
	resources: {
		uk: { translation: uk },
		en: { translation: en },
	},
	lng: "en",
	fallbackLng: "en",
	interpolation: { escapeValue: false },
})

// Async: load saved language preference
AsyncStorage.getItem(LANGUAGE_STORAGE_KEY).then(saved => {
	if (saved === "uk" || saved === "en") {
		i18n.changeLanguage(saved)
	}
})

export async function setAppLanguage(lang: "uk" | "en"): Promise<void> {
	await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, lang)
	i18n.changeLanguage(lang)
}

export default i18n
