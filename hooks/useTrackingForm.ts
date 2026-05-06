// hooks/useTrackingForm.ts
import i18n from "@/config/i18n"

import { ExternalTrigger, InternalTrigger, TriggerItem } from "@/models"
import { Medication } from "@/models/medication"
import {
	getMedicationsByPatient,
	getTrackingByDate,
	upsertTracking,
} from "@/services"
import { hasInvalidVitals } from "@/utils"
import { useCallback, useEffect, useRef, useState } from "react"
import { useAuth } from "./useAuth"

export type MedIntake = {
	medicationId: string
	amount: number
	takenAt: number
}

type TrackingState = {
	temperature: string
	pulse: string
	systolicPressure: string
	diastolicPressure: string
	oxygenSaturation: string
	sleepDuration: string
	sleepQuality: number | undefined
	mood: number | undefined
	activityLevel: number | undefined
	urinationCount: number
	bowelMovements: number
	internalTriggers: TriggerItem<InternalTrigger>[]
	externalTriggers: TriggerItem<ExternalTrigger>[]
	medIntakes: MedIntake[]
	patientNotes: string
	doctorNotes: string
}

export function useTrackingForm() {
	const { user } = useAuth()

	const [temperature, setTemperature] = useState("")
	const [pulse, setPulse] = useState("")
	const [systolicPressure, setSystolicPressure] = useState("")
	const [diastolicPressure, setDiastolicPressure] = useState("")
	const [oxygenSaturation, setOxygenSaturation] = useState("")
	const [sleepDuration, setSleepDuration] = useState("")
	const [sleepQuality, setSleepQuality] = useState<number | undefined>(
		undefined,
	)
	const [mood, setMood] = useState<number | undefined>(undefined)
	const [activityLevel, setActivityLevel] = useState<number | undefined>(
		undefined,
	)
	const [urinationCount, setUrinationCount] = useState(0)
	const [bowelMovements, setBowelMovements] = useState(0)
	const [internalTriggers, setInternalTriggers] = useState<
		TriggerItem<InternalTrigger>[]
	>([])
	const [externalTriggers, setExternalTriggers] = useState<
		TriggerItem<ExternalTrigger>[]
	>([])
	const [medications, setMedications] = useState<Medication[]>([])
	const [medIntakes, setMedIntakes] = useState<MedIntake[]>([])
	const [patientNotes, setPatientNotes] = useState("")
	const [doctorNotes, setDoctorNotes] = useState("")
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		if (!user) return
		const load = async () => {
			setIsLoading(true)
			try {
				const patientId = user.uid
				const tracking = await getTrackingByDate(
					user.uid,
					patientId,
					Date.now(),
				).catch(() => null)
				const meds = await getMedicationsByPatient(user.uid, patientId).catch(
					() => [],
				)
				setMedications(meds)

				if (tracking) {
					setTemperature(tracking.temperature?.toString() ?? "")
					setPulse(tracking.pulse?.toString() ?? "")
					setSystolicPressure(tracking.systolicPressure?.toString() ?? "")
					setDiastolicPressure(tracking.diastolicPressure?.toString() ?? "")
					setOxygenSaturation(tracking.oxygenSaturation?.toString() ?? "")
					setSleepDuration(tracking.sleepDuration?.toString() ?? "")
					setSleepQuality(tracking.sleepQuality)
					setMood(tracking.mood)
					setActivityLevel(tracking.activityLevel)
					setUrinationCount(tracking.urinationCount ?? 0)
					setBowelMovements(tracking.bowelMovements ?? 0)
					setInternalTriggers(tracking.internalTriggers ?? [])
					setExternalTriggers(tracking.externalTriggers ?? [])
					setPatientNotes(tracking.patientNotes ?? "")
					setDoctorNotes(tracking.doctorNotes ?? "")
					if (tracking.medications) {
						setMedIntakes(
							tracking.medications.map(m => ({
								medicationId: m.medicationId,
								amount: m.amount,
								takenAt: m.takenAt,
							})),
						)
					}
				}
			} finally {
				setIsLoading(false)
			}
		}
		load()
	}, [user])

	// Always-current snapshot — assigned synchronously on every render
	const stateRef = useRef<TrackingState>({
		temperature,
		pulse,
		systolicPressure,
		diastolicPressure,
		oxygenSaturation,
		sleepDuration,
		sleepQuality,
		mood,
		activityLevel,
		urinationCount,
		bowelMovements,
		internalTriggers,
		externalTriggers,
		medIntakes,
		patientNotes,
		doctorNotes,
	})
	stateRef.current = {
		temperature,
		pulse,
		systolicPressure,
		diastolicPressure,
		oxygenSaturation,
		sleepDuration,
		sleepQuality,
		mood,
		activityLevel,
		urinationCount,
		bowelMovements,
		internalTriggers,
		externalTriggers,
		medIntakes,
		patientNotes,
		doctorNotes,
	}

	const autoSave = useCallback(
		async (overrides: Partial<TrackingState> = {}) => {
			if (!user) return
			const s: TrackingState = { ...stateRef.current, ...overrides }

			if (
				hasInvalidVitals({
					temperature: s.temperature,
					pulse: s.pulse,
					systolicPressure: s.systolicPressure,
					diastolicPressure: s.diastolicPressure,
					oxygenSaturation: s.oxygenSaturation,
					sleepDuration: s.sleepDuration,
				})
			) {
				setError(i18n.t("error.invalidVitalRange"))
				return
			}

			try {
				await upsertTracking(user.uid, {
					userId: user.uid,
					patientId: user.uid,
					date: Date.now(),
					temperature: s.temperature ? parseFloat(s.temperature) : undefined,
					pulse: s.pulse ? parseInt(s.pulse) : undefined,
					systolicPressure: s.systolicPressure
						? parseInt(s.systolicPressure)
						: undefined,
					diastolicPressure: s.diastolicPressure
						? parseInt(s.diastolicPressure)
						: undefined,
					oxygenSaturation: s.oxygenSaturation
						? parseInt(s.oxygenSaturation)
						: undefined,
					sleepDuration: s.sleepDuration
						? parseFloat(s.sleepDuration)
						: undefined,
					sleepQuality: s.sleepQuality,
					mood: s.mood,
					activityLevel: s.activityLevel,
					urinationCount: s.urinationCount || undefined,
					bowelMovements: s.bowelMovements || undefined,
					internalTriggers:
						s.internalTriggers.length > 0 ? s.internalTriggers : undefined,
					externalTriggers:
						s.externalTriggers.length > 0 ? s.externalTriggers : undefined,
					medications: s.medIntakes,
					patientNotes: s.patientNotes || undefined,
					doctorNotes: s.doctorNotes || undefined,
				})
				setError(null)
			} catch {
				setError(i18n.t("error.savingErrorShort"))
			}
		},
		[user],
	)

	const toggleInternalTrigger = (trigger: InternalTrigger) => {
		setInternalTriggers(prev => {
			const exists = prev.find(t => t.type === trigger)
			const updated = exists
				? prev.filter(t => t.type !== trigger)
				: [...prev, { type: trigger }]
			autoSave({ internalTriggers: updated })
			return updated
		})
	}

	const toggleExternalTrigger = (trigger: ExternalTrigger) => {
		setExternalTriggers(prev => {
			const exists = prev.find(t => t.type === trigger)
			const updated = exists
				? prev.filter(t => t.type !== trigger)
				: [...prev, { type: trigger }]
			autoSave({ externalTriggers: updated })
			return updated
		})
	}

	const addIntake = (medicationId: string, amount: number) => {
		const newIntake = { medicationId, amount, takenAt: Date.now() }
		setMedIntakes(prev => {
			const updated = [...prev, newIntake]
			autoSave({ medIntakes: updated })
			return updated
		})
	}

	const removeIntake = (index: number) => {
		setMedIntakes(prev => {
			const updated = prev.filter((_, i) => i !== index)
			autoSave({ medIntakes: updated })
			return updated
		})
	}

	return {
		temperature,
		setTemperature,
		pulse,
		setPulse,
		systolicPressure,
		setSystolicPressure,
		diastolicPressure,
		setDiastolicPressure,
		oxygenSaturation,
		setOxygenSaturation,
		sleepDuration,
		setSleepDuration,
		sleepQuality,
		setSleepQuality,
		mood,
		setMood,
		activityLevel,
		setActivityLevel,
		urinationCount,
		setUrinationCount,
		bowelMovements,
		setBowelMovements,
		internalTriggers,
		externalTriggers,
		toggleInternalTrigger,
		toggleExternalTrigger,
		medications,
		medIntakes,
		addIntake,
		removeIntake,
		patientNotes,
		setPatientNotes,
		doctorNotes,
		setDoctorNotes,
		isLoading,
		error,
		autoSave,
	}
}
