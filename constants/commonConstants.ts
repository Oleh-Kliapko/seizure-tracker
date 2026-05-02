import {
	ExternalTrigger,
	InternalTrigger,
	SeizureSeverity,
	SeizureType,
} from "../models"
import { AppThemeMode, CommunicationChannel } from "../models/user"

export const MONTHS = [
	{ label: "—", value: 0 },
	{ label: "Січень", value: 1 },
	{ label: "Лютий", value: 2 },
	{ label: "Березень", value: 3 },
	{ label: "Квітень", value: 4 },
	{ label: "Травень", value: 5 },
	{ label: "Червень", value: 6 },
	{ label: "Липень", value: 7 },
	{ label: "Серпень", value: 8 },
	{ label: "Вересень", value: 9 },
	{ label: "Жовтень", value: 10 },
	{ label: "Листопад", value: 11 },
	{ label: "Грудень", value: 12 },
]

export const BLOOD_TYPES = [
	{ label: "-", value: "" },
	{ label: "A", value: "A" },
	{ label: "B", value: "B" },
	{ label: "AB", value: "AB" },
	{ label: "O", value: "O" },
]

export const RH_FACTORS = [
	{ label: "-", value: "" },
	{ label: "(+)", value: "(+)" },
	{ label: "(-)", value: "(-)" },
]

export const RELATIONS = [
	{ label: "Не вказано", value: "" },
	{ label: "Батько", value: "father" },
	{ label: "Мати", value: "mother" },
	{ label: "Опікун", value: "guardian" },
]

export const THEMES: { label: string; value: AppThemeMode }[] = [
	{ label: "Системна", value: "system" },
	{ label: "Світла", value: "light" },
	{ label: "Темна", value: "dark" },
]

export const CHANNELS: { label: string; value: CommunicationChannel }[] = [
	{ label: "Email", value: "email" },
	{ label: "Телефон", value: "phone" },
]

export const LINKS = [
	{ label: "Питання та відповіді", key: "faq", url: "https://oleh-kliapko.github.io/seizure-tracker/faq" },
	{ label: "Угода користувача", key: "terms", url: "https://oleh-kliapko.github.io/seizure-tracker/terms" },
	{ label: "Обробка персональних даних", key: "privacy", url: "https://oleh-kliapko.github.io/seizure-tracker/privacy" },
]

export const SEIZURE_TYPES: { label: string; value: SeizureType }[] = [
	{ label: "Тоніко-клонічний", value: "tonic-clonic" },
	{ label: "Абсанс", value: "absence" },
	{ label: "Міоклонічний", value: "myoclonic" },
	{ label: "Фокальний", value: "focal" },
	{ label: "Атонічний", value: "atonic" },
	{ label: "Інший", value: "custom" },
]

export const SEVERITY_LABELS: Record<SeizureSeverity, string> = {
	1: "Легкий",
	2: "Середній",
	3: "Важкий",
}

export const INTERNAL_TRIGGERS: { label: string; value: InternalTrigger }[] = [
	{ label: "Недосипання", value: "sleep-deprivation" },
	{ label: "Стрес", value: "stress" },
	{ label: "Алкоголь", value: "alcohol" },
	{ label: "Температура", value: "fever" },
	{ label: "Інфекція", value: "infection" },
	{ label: "Інше", value: "custom" },
]

export const EXTERNAL_TRIGGERS: { label: string; value: ExternalTrigger }[] = [
	{ label: "Світлочутливість", value: "photosensitivity" },
	{ label: "Магнітна буря", value: "magnetic-storm" },
	{ label: "Зміна тиску", value: "pressure-change" },
	{ label: "Зміна погоди", value: "weather-change" },
	{ label: "Інше", value: "custom" },
]

export const MOODS = [1, 2, 3, 4, 5]
export const MOOD_EMOJI: Record<number, string> = {
	1: "😞",
	2: "😕",
	3: "😐",
	4: "🙂",
	5: "😊",
}

export type SeizureFilter = "all" | "1" | "2" | "3" | "unknown"

export const FILTERS: { label: string; value: SeizureFilter }[] = [
	{ label: "Всі", value: "all" },
	{ label: "⚡ Легкі", value: "1" },
	{ label: "⚡⚡ Середні", value: "2" },
	{ label: "⚡⚡⚡ Важкі", value: "3" },
	{ label: "Без оцінки", value: "unknown" },
]

const currentYear = new Date().getFullYear()
export const YEARS = [
	{ label: "—", value: 0 },
	...Array.from({ length: currentYear - 1900 + 1 }, (_, i) => ({
		label: String(currentYear - i),
		value: currentYear - i,
	})),
]
