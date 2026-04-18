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
	{ label: "Питання та відповіді", key: "faq" },
	{ label: "Угода користувача", key: "terms" },
	{ label: "Обробка персональних даних", key: "privacy" },
]

const currentYear = new Date().getFullYear()
export const YEARS = [
	{ label: "—", value: 0 },
	...Array.from({ length: currentYear - 1900 + 1 }, (_, i) => ({
		label: String(currentYear - i),
		value: currentYear - i,
	})),
]
