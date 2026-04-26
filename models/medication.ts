// models/medication.ts

export const DOSE_UNITS = ["таблетки", "капсули", "краплі", "мл", "уколи"] as const
export type DoseUnit = (typeof DOSE_UNITS)[number]

export type Medication = {
	id: string
	userId: string
	patientId: string
	name: string
	doseAmount: number    // кількість одиниць за один прийом
	doseUnit: DoseUnit    // одиниця виміру
	scheduledTimes?: string[] // ["HH:MM", ...]
	notes?: string
	createdAt: number
	updatedAt: number
}
