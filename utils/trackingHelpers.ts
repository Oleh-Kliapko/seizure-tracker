// utils/trackingHelpers.ts

import { DailyTracking } from "@/models"

export function countFilledSections(t: DailyTracking | null): number {
	if (!t) return 0
	let count = 0
	if (t.mood !== undefined || t.activityLevel !== undefined) count++
	if (
		t.temperature !== undefined ||
		t.pulse !== undefined ||
		t.systolicPressure !== undefined ||
		t.diastolicPressure !== undefined ||
		t.oxygenSaturation !== undefined
	)
		count++
	if (t.sleepDuration !== undefined || t.sleepQuality !== undefined) count++
	if (t.medications && t.medications.length > 0) count++
	if (
		(t.urinationCount && t.urinationCount > 0) ||
		(t.bowelMovements && t.bowelMovements > 0)
	)
		count++
	if (
		(t.internalTriggers && t.internalTriggers.length > 0) ||
		(t.externalTriggers && t.externalTriggers.length > 0)
	)
		count++
	return count
}
