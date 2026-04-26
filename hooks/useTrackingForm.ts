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

export type MedIntake = {
	medicationId: string
	amount: number
	takenAt: number
}

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
	const [sleepQuality, setSleepQuality] = useState<number | undefined>(undefined)

	// Wellbeing
	const [mood, setMood] = useState<number | undefined>(undefined)
	const [activityLevel, setActivityLevel] = useState<number | undefined>(undefined)

	// Bathroom
	const [urinationCount, setUrinationCount] = useState(0)
	const [bowelMovements, setBowelMovements] = useState(0)

	// Triggers
	const [internalTriggers, setInternalTriggers] = useState<TriggerItem<InternalTrigger>[]>([])
	const [externalTriggers, setExternalTriggers] = useState<TriggerItem<ExternalTrigger>[]>([])

	// Medications
	const [medications, setMedications] = useState<Medication[]>([])
	const [medIntakes, setMedIntakes] = useState<MedIntake[]>([])

	// Notes
	const [patientNotes, setPatientNotes] = useState("")
	const [doctorNotes, setDoctorNotes] = useState("")

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
				const tracking = await getTrackingByDate(user.uid, patientId, Date.now()).catch(() => null)
				const meds = await getMedicationsByPatient(user.uid, patientId).catch(() => [])
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

	const addIntake = (medicationId: string, amount: number) => {
		setMedIntakes(prev => [...prev, { medicationId, amount, takenAt: Date.now() }])
	}

	const removeIntake = (index: number) => {
		setMedIntakes(prev => prev.filter((_, i) => i !== index))
	}

	const handleSave = async () => {
		if (!user) return
		setIsSaving(true)
		setIsSaved(false)
		setError(null)
		try {
			await upsertTracking(user.uid, {
				userId: user.uid,
				patientId: user.uid,
				date: Date.now(),
				temperature: temperature ? parseFloat(temperature) : undefined,
				pulse: pulse ? parseInt(pulse) : undefined,
				systolicPressure: systolicPressure ? parseInt(systolicPressure) : undefined,
				diastolicPressure: diastolicPressure ? parseInt(diastolicPressure) : undefined,
				oxygenSaturation: oxygenSaturation ? parseInt(oxygenSaturation) : undefined,
				sleepDuration: sleepDuration ? parseFloat(sleepDuration) : undefined,
				sleepQuality,
				mood,
				activityLevel,
				urinationCount: urinationCount || undefined,
				bowelMovements: bowelMovements || undefined,
				internalTriggers: internalTriggers.length > 0 ? internalTriggers : undefined,
				externalTriggers: externalTriggers.length > 0 ? externalTriggers : undefined,
				medications: medIntakes.length > 0 ? medIntakes : undefined,
				patientNotes: patientNotes || undefined,
				doctorNotes: doctorNotes || undefined,
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
		temperature, setTemperature,
		pulse, setPulse,
		systolicPressure, setSystolicPressure,
		diastolicPressure, setDiastolicPressure,
		oxygenSaturation, setOxygenSaturation,
		sleepDuration, setSleepDuration,
		sleepQuality, setSleepQuality,
		mood, setMood,
		activityLevel, setActivityLevel,
		urinationCount, setUrinationCount,
		bowelMovements, setBowelMovements,
		internalTriggers, externalTriggers,
		toggleInternalTrigger, toggleExternalTrigger,
		medications,
		medIntakes,
		addIntake,
		removeIntake,
		patientNotes, setPatientNotes,
		doctorNotes, setDoctorNotes,
		isLoading, isSaving, isSaved, error,
		handleSave,
	}
}
