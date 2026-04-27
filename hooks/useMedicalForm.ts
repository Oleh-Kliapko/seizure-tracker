// hooks/useMedicalForm.ts

import { useCallback, useEffect, useRef, useState } from "react"
import { useUpdateProfile } from "./useUpdateProfile"
import { useUser } from "./useUser"

type MedicalState = {
	month: number
	year: number
	bloodType: string
	rhFactor: string
	height: string
	weight: string
	anamnesis: string
}

export function useMedicalForm() {
	const { profile, isLoading: isLoadingProfile } = useUser()
	const { updateProfile, error } = useUpdateProfile()

	const [month, setMonth] = useState<number>(0)
	const [year, setYear] = useState<number>(0)
	const [bloodType, setBloodType] = useState<string>("")
	const [rhFactor, setRhFactor] = useState<string>("")
	const [height, setHeight] = useState<string>("")
	const [weight, setWeight] = useState<string>("")
	const [anamnesis, setAnamnesis] = useState<string>("")
	const [validationError, setValidationError] = useState<string | null>(null)

	useEffect(() => {
		if (!profile?.medicalInfo) return
		const { firstSeizureDate, bloodType, rhFactor, height, weight, anamnesis } =
			profile.medicalInfo
		if (firstSeizureDate) {
			setMonth(firstSeizureDate.month)
			setYear(firstSeizureDate.year)
		}
		setBloodType(bloodType ?? "")
		setRhFactor(rhFactor ?? "")
		setHeight(height ? String(height) : "")
		setWeight(weight ? String(weight) : "")
		setAnamnesis(anamnesis ?? "")
	}, [profile])

	const stateRef = useRef<MedicalState>({
		month, year, bloodType, rhFactor, height, weight, anamnesis,
	})
	stateRef.current = { month, year, bloodType, rhFactor, height, weight, anamnesis }

	const autoSave = useCallback(async (overrides: Partial<MedicalState> = {}) => {
		const s: MedicalState = { ...stateRef.current, ...overrides }

		if (s.height && (isNaN(Number(s.height)) || Number(s.height) < 30 || Number(s.height) > 250)) {
			setValidationError("Ріст має бути між 30 і 250 см")
			return
		}
		if (s.weight && (isNaN(Number(s.weight)) || Number(s.weight) < 3 || Number(s.weight) > 300)) {
			setValidationError("Вага має бути між 3 і 300 кг")
			return
		}

		setValidationError(null)

		const medicalInfo: Record<string, unknown> = {}
		if (s.year) medicalInfo.firstSeizureDate = { year: s.year }
		if (s.month && s.year) medicalInfo.firstSeizureDate = { month: s.month, year: s.year }
		if (s.bloodType) medicalInfo.bloodType = s.bloodType
		if (s.rhFactor) medicalInfo.rhFactor = s.rhFactor
		if (s.height) medicalInfo.height = Number(s.height)
		if (s.weight) medicalInfo.weight = Number(s.weight)
		if (s.anamnesis) medicalInfo.anamnesis = s.anamnesis

		await updateProfile({ medicalInfo })
	}, [updateProfile])

	return {
		month, setMonth,
		year, setYear,
		bloodType, setBloodType,
		rhFactor, setRhFactor,
		height, setHeight,
		weight, setWeight,
		anamnesis, setAnamnesis,
		isLoadingProfile,
		displayError: validationError ?? error ?? null,
		autoSave,
	}
}
