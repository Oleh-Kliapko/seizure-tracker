// config/i18n.ts

import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import { NativeModules, Platform } from "react-native"
import en from "../locales/en.json"
import uk from "../locales/uk.json"

function getDeviceLocale(): string {
	try {
		if (Platform.OS === "ios") {
			const settings = NativeModules.SettingsManager?.settings
			const raw: string = settings?.AppleLocale ?? settings?.AppleLanguages?.[0] ?? "en"
			return raw.split(/[-_]/)[0]
		}
		const raw: string = NativeModules.I18nManager?.localeIdentifier ?? "en"
		return raw.split(/[-_]/)[0]
	} catch {
		return Intl.DateTimeFormat().resolvedOptions().locale.split("-")[0] ?? "en"
	}
}

const deviceLocale = getDeviceLocale()
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
