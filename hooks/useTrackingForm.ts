// hooks/useTrackingForm.ts

import { ExternalTrigger, InternalTrigger, TriggerItem } from "@/models"
import { Medication } from "@/models/medication"
import {
	getMedicationsByPatient,
	getTrackingByDate,
	upsertTracking,
} from "@/services"
import { useEffect, useState } from "react"
import { useAuth } from "./useAuth"

export function useTrackingForm() {
	const { user } = useAuth()

	// Vitals
	const [temperature, setTemperature] = useState("")
	const [pulse, setPulse] = useState("")
	const [systolicPressure, setSystolicPressure] = useState("")
	const [diastolicPressure, setDiastolicPressure] = useState("")
	const [oxygenSaturation, setOxygenSaturation] = useState("")

	// Sleep
	const [sleepDuration, setSleepDuration] = useState("")
	const [sleepQuality, setSleepQuality] = useState<number | undefined>(
		undefined,
	)

	// Wellbeing
	const [mood, setMood] = useState<number | undefined>(undefined)
	const [activityLevel, setActivityLevel] = useState<number | undefined>(
		undefined,
	)

	// Bathroom
	const [urinationCount, setUrinationCount] = useState(0)
	const [bowelMovements, setBowelMovements] = useState(0)

	// Triggers
	const [internalTriggers, setInternalTriggers] = useState<
		TriggerItem<InternalTrigger>[]
	>([])
	const [externalTriggers, setExternalTriggers] = useState<
		TriggerItem<ExternalTrigger>[]
	>([])

	// Medications
	const [medications, setMedications] = useState<Medication[]>([])
	const [takenMeds, setTakenMeds] = useState<Record<string, boolean>>({})

	// Notes
	const [patientNotes, setPatientNotes] = useState("")

	const [isLoading, setIsLoading] = useState(true)
	const [isSaving, setIsSaving] = useState(false)
	const [isSaved, setIsSaved] = useState(false)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		if (!user) return

		const load = async () => {
			setIsLoading(true)
			try {
				const patientId = user.uid
				const [tracking, meds] = await Promise.all([
					getTrackingByDate(user.uid, patientId, Date.now()),
					getMedicationsByPatient(user.uid, patientId),
				])

				setMedications(meds)

				const initTaken: Record<string, boolean> = {}
				for (const med of meds) initTaken[med.id] = false

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

					if (tracking.medications) {
						for (const m of tracking.medications) {
							initTaken[m.medicationId] = m.isTaken
						}
					}
				}

				setTakenMeds(initTaken)
			} catch {
				setError("Помилка завантаження даних")
			} finally {
				setIsLoading(false)
			}
		}

		load()
	}, [user])

	const toggleInternalTrigger = (trigger: InternalTrigger) => {
		setInternalTriggers(prev => {
			const exists = prev.find(t => t.type === trigger)
			if (exists) return prev.filter(t => t.type !== trigger)
			return [...prev, { type: trigger }]
		})
	}

	const toggleExternalTrigger = (trigger: ExternalTrigger) => {
		setExternalTriggers(prev => {
			const exists = prev.find(t => t.type === trigger)
			if (exists) return prev.filter(t => t.type !== trigger)
			return [...prev, { type: trigger }]
		})
	}

	const toggleMedication = (medicationId: string) => {
		setTakenMeds(prev => ({ ...prev, [medicationId]: !prev[medicationId] }))
	}

	const handleSave = async () => {
		if (!user) return
		setIsSaving(true)
		setIsSaved(false)
		setError(null)

		try {
			const medsData = medications.map(med => ({
				medicationId: med.id,
				isTaken: takenMeds[med.id] ?? false,
				...(takenMeds[med.id] ? { takenAt: Date.now() } : {}),
			}))

			await upsertTracking(user.uid, {
				userId: user.uid,
				patientId: user.uid,
				date: Date.now(),
				temperature: temperature ? parseFloat(temperature) : undefined,
				pulse: pulse ? parseInt(pulse) : undefined,
				systolicPressure: systolicPressure
					? parseInt(systolicPressure)
					: undefined,
				diastolicPressure: diastolicPressure
					? parseInt(diastolicPressure)
					: undefined,
				oxygenSaturation: oxygenSaturation
					? parseInt(oxygenSaturation)
					: undefined,
				sleepDuration: sleepDuration ? parseFloat(sleepDuration) : undefined,
				sleepQuality,
				mood,
				activityLevel,
				urinationCount: urinationCount || undefined,
				bowelMovements: bowelMovements || undefined,
				internalTriggers:
					internalTriggers.length > 0 ? internalTriggers : undefined,
				externalTriggers:
					externalTriggers.length > 0 ? externalTriggers : undefined,
				medications: medsData.length > 0 ? medsData : undefined,
				patientNotes: patientNotes || undefined,
			})
			setIsSaved(true)
			setTimeout(() => setIsSaved(false), 2000)
		} catch {
			setError("Помилка збереження")
		} finally {
			setIsSaving(false)
		}
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
		takenMeds,
		toggleMedication,
		patientNotes,
		setPatientNotes,
		isLoading,
		isSaving,
		isSaved,
		error,
		handleSave,
	}
}
