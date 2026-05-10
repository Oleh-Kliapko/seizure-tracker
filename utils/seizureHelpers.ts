// utils/seizureHelpers.ts

import { TriggerItem } from "@/models"

export function toggleTriggerItem<T>(items: TriggerItem<T>[], trigger: T): TriggerItem<T>[] {
	return items.find(t => t.type === trigger)
		? items.filter(t => t.type !== trigger)
		: [...items, { type: trigger }]
}
