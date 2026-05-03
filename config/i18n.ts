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

// Async: load saved language or detect from device
AsyncStorage.getItem(LANGUAGE_STORAGE_KEY).then(saved => {
	if (saved === "uk" || saved === "en") {
		i18n.changeLanguage(saved)
		return
	}
	// No saved preference — try expo-localization
	try {
		const { getLocales } = require("expo-localization")
		const code: string = getLocales()?.[0]?.languageCode ?? "en"
		i18n.changeLanguage(code === "uk" || code === "ru" ? "uk" : "en")
	} catch {
		// expo-localization not available in this build — stay with "en"
	}
})

export async function setAppLanguage(lang: "uk" | "en"): Promise<void> {
	await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, lang)
	i18n.changeLanguage(lang)
}

export default i18n
