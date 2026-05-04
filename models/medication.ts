// models/medication.ts

export const DOSE_UNITS = [
	"tablets",
	"capsules",
	"drops",
	"ml",
	"injections",
] as const
export type DoseUnit = (typeof DOSE_UNITS)[number]

export const DOSE_UNIT_LABEL_KEYS: Record<DoseUnit, string> = {
	tablets: "doseUnit.tablets",
	capsules: "doseUnit.capsules",
	drops: "doseUnit.drops",
	ml: "doseUnit.ml",
	injections: "doseUnit.injections",
}

const LEGACY_UNIT_MAP: Record<string, DoseUnit> = {
	"таблетки": "tablets",
	"капсули": "capsules",
	"краплі": "drops",
	"мл": "ml",
	"уколи": "injections",
}

export function normalizeDoseUnit(unit: string): DoseUnit {
	return (LEGACY_UNIT_MAP[unit] ?? unit) as DoseUnit
}

export type Medication = {
	id: string
	userId: string
	patientId: string
	name: string
	doseAmount: number // денна доза (загальна кількість одиниць за день)
	doseUnit: DoseUnit // одиниця виміру
	scheduledTimes?: string[] // ["HH:MM", ...]
	notes?: string
	startedAt?: { month: number; year: number }
	createdAt: number
	updatedAt: number
}
