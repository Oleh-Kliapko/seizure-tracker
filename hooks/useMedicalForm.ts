// hooks/useMedicalForm.ts

import { useEffect, useState } from "react"
import { useUpdateProfile } from "./useUpdateProfile"
import { useUser } from "./useUser"

export function useMedicalForm() {
	const { profile, isLoading: isLoadingProfile } = useUser()
	const { updateProfile, isLoading, error } = useUpdateProfile()

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

	const handleSave = async () => {
		if (
			height &&
			(isNaN(Number(height)) || Number(height) < 30 || Number(height) > 250)
		) {
			setValidationError("Ріст має бути між 30 і 250 см")
			return
		}

		if (
			weight &&
			(isNaN(Number(weight)) || Number(weight) < 3 || Number(weight) > 300)
		) {
			setValidationError("Вага має бути між 3 і 300 кг")
			return
		}

		setValidationError(null)

		const medicalInfo: Record<string, any> = {}
		if (year) medicalInfo.firstSeizureDate = { year }
		if (month && year) medicalInfo.firstSeizureDate = { month, year }
		if (bloodType) medicalInfo.bloodType = bloodType
		if (rhFactor) medicalInfo.rhFactor = rhFactor
		if (height) medicalInfo.height = Number(height)
		if (weight) medicalInfo.weight = Number(weight)
		if (anamnesis) medicalInfo.anamnesis = anamnesis

		await updateProfile({ medicalInfo })
	}

	return {
		month,
		setMonth,
		year,
		setYear,
		bloodType,
		setBloodType,
		rhFactor,
		setRhFactor,
		height,
		setHeight,
		weight,
		setWeight,
		anamnesis,
		setAnamnesis,
		isLoading,
		isLoadingProfile,
		displayError: validationError ?? error ?? null,
		handleSave,
	}
}
