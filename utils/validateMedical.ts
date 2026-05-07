// utils/validateMedical.ts

export const VITAL_BOUNDS = {
	temperature: { min: 30, max: 45 },
	pulse: { min: 20, max: 250 },
	systolicPressure: { min: 40, max: 300 },
	diastolicPressure: { min: 20, max: 200 },
	oxygenSaturation: { min: 30, max: 100 },
	sleepDuration: { min: 0, max: 24 },
	sleepHoursBefore: { min: 0, max: 24 },
} as const

export type VitalField = keyof typeof VITAL_BOUNDS

type VitalInputs = Partial<Record<VitalField, string>>

export function hasInvalidVitals(inputs: VitalInputs): boolean {
	for (const [key, value] of Object.entries(inputs)) {
		if (!value) continue
		const field = key as VitalField
		if (!(field in VITAL_BOUNDS)) continue
		const n = parseFloat(value)
		if (isNaN(n)) return true
		const { min, max } = VITAL_BOUNDS[field]
		if (n < min || n > max) return true
	}
	return false
}

export function isInvalidSeizureTime(startedAt: number, endedAt?: number): boolean {
	const now = Date.now()
	if (startedAt > now) return true
	if (endedAt !== undefined && endedAt > now) return true
	return false
}

export function isInvalidSleepHours(value: number | undefined): boolean {
	if (value === undefined) return false
	return value < VITAL_BOUNDS.sleepHoursBefore.min || value > VITAL_BOUNDS.sleepHoursBefore.max
}
