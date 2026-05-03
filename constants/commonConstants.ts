import {
	ExternalTrigger,
	InternalTrigger,
	SeizureSeverity,
	SeizureType,
} from "../models"
import { AppThemeMode, CommunicationChannel } from "../models/user"

export const MONTHS = [
	{ labelKey: "month.0", value: 0 },
	{ labelKey: "month.1", value: 1 },
	{ labelKey: "month.2", value: 2 },
	{ labelKey: "month.3", value: 3 },
	{ labelKey: "month.4", value: 4 },
	{ labelKey: "month.5", value: 5 },
	{ labelKey: "month.6", value: 6 },
	{ labelKey: "month.7", value: 7 },
	{ labelKey: "month.8", value: 8 },
	{ labelKey: "month.9", value: 9 },
	{ labelKey: "month.10", value: 10 },
	{ labelKey: "month.11", value: 11 },
	{ labelKey: "month.12", value: 12 },
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

export const RELATIONS: { labelKey: string; value: string }[] = [
	{ labelKey: "relation.", value: "" },
	{ labelKey: "relation.father", value: "father" },
	{ labelKey: "relation.mother", value: "mother" },
	{ labelKey: "relation.guardian", value: "guardian" },
]

export const THEMES: { labelKey: string; value: AppThemeMode }[] = [
	{ labelKey: "theme.system", value: "system" },
	{ labelKey: "theme.light", value: "light" },
	{ labelKey: "theme.dark", value: "dark" },
]

export const CHANNELS: { labelKey: string; value: CommunicationChannel }[] = [
	{ labelKey: "channel.email", value: "email" },
	{ labelKey: "channel.phone", value: "phone" },
]

export const LINKS = [
	{ labelKey: "link.faq", key: "faq", url: "https://oleh-kliapko.github.io/seizure-tracker/faq" },
	{ labelKey: "link.terms", key: "terms", url: "https://oleh-kliapko.github.io/seizure-tracker/terms" },
	{ labelKey: "link.privacy", key: "privacy", url: "https://oleh-kliapko.github.io/seizure-tracker/privacy" },
]

export const SEIZURE_TYPES: { labelKey: string; value: SeizureType }[] = [
	{ labelKey: "seizureType.tonic-clonic", value: "tonic-clonic" },
	{ labelKey: "seizureType.absence", value: "absence" },
	{ labelKey: "seizureType.myoclonic", value: "myoclonic" },
	{ labelKey: "seizureType.focal", value: "focal" },
	{ labelKey: "seizureType.atonic", value: "atonic" },
	{ labelKey: "seizureType.custom", value: "custom" },
]

export const SEVERITY_LABELS: Record<SeizureSeverity, string> = {
	1: "severity.1",
	2: "severity.2",
	3: "severity.3",
}

export const INTERNAL_TRIGGERS: { labelKey: string; value: InternalTrigger }[] = [
	{ labelKey: "trigger.sleep-deprivation", value: "sleep-deprivation" },
	{ labelKey: "trigger.stress", value: "stress" },
	{ labelKey: "trigger.alcohol", value: "alcohol" },
	{ labelKey: "trigger.fever", value: "fever" },
	{ labelKey: "trigger.infection", value: "infection" },
	{ labelKey: "trigger.custom", value: "custom" },
]

export const EXTERNAL_TRIGGERS: { labelKey: string; value: ExternalTrigger }[] = [
	{ labelKey: "trigger.photosensitivity", value: "photosensitivity" },
	{ labelKey: "trigger.magnetic-storm", value: "magnetic-storm" },
	{ labelKey: "trigger.pressure-change", value: "pressure-change" },
	{ labelKey: "trigger.weather-change", value: "weather-change" },
	{ labelKey: "trigger.custom", value: "custom" },
]

export const REPORT_COOLDOWN_DAYS = 7

export const MOODS = [1, 2, 3, 4, 5]
export const MOOD_EMOJI: Record<number, string> = {
	1: "😞",
	2: "😕",
	3: "😐",
	4: "🙂",
	5: "😊",
}

export type SeizureFilter = "all" | "1" | "2" | "3" | "unknown"

export const FILTERS: { labelKey: string; value: SeizureFilter }[] = [
	{ labelKey: "filter.all", value: "all" },
	{ labelKey: "filter.1", value: "1" },
	{ labelKey: "filter.2", value: "2" },
	{ labelKey: "filter.3", value: "3" },
	{ labelKey: "filter.unknown", value: "unknown" },
]

const currentYear = new Date().getFullYear()
export const YEARS = [
	{ label: "—", value: 0 },
	...Array.from({ length: currentYear - 1900 + 1 }, (_, i) => ({
		label: String(currentYear - i),
		value: currentYear - i,
	})),
]
