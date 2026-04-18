// hooks/useGuardiansForm.ts

import { Guardian } from "@/models/user"
import { validateEmail, validatePhone } from "@/utils"
import { useEffect, useState } from "react"
import { useUpdateProfile } from "./useUpdateProfile"
import { useUser } from "./useUser"

export function useGuardiansForm() {
	const { profile, isLoading: isLoadingProfile } = useUser()
	const { updateProfile, isLoading, error } = useUpdateProfile()

	const [guardians, setGuardians] = useState<Guardian[]>([])
	const [validationError, setValidationError] = useState<string | null>(null)

	useEffect(() => {
		if (!profile?.guardians) return
		setGuardians(profile.guardians)
	}, [profile])

	const addGuardian = () => {
		setGuardians(prev => [
			...prev,
			{ fullName: "", email: "", phone: "", relation: "guardian" },
		])
	}

	const removeGuardian = async (index: number) => {
		const updated = guardians.filter((_, i) => i !== index)
		setGuardians(updated)
		await updateProfile({ guardians: updated })
	}

	const updateGuardian = (
		index: number,
		field: keyof Guardian,
		value: string,
	) => {
		setGuardians(prev =>
			prev.map((g, i) => (i === index ? { ...g, [field]: value } : g)),
		)
	}

	const handleSave = async () => {
		for (const g of guardians) {
			if (!g.fullName.trim()) {
				setValidationError("Введіть ПІБ для кожного опікуна")
				return
			}
			if (!g.relation) {
				setValidationError("Оберіть ступінь спорідненості для кожного опікуна")
				return
			}
			if (g.phone) {
				const { isValid, error } = validatePhone(g.phone)
				if (!isValid) {
					setValidationError(error)
					return
				}
			}
			if (g.email) {
				const { isValid, error } = validateEmail(g.email)
				if (!isValid) {
					setValidationError(error)
					return
				}
			}
		}

		setValidationError(null)
		await updateProfile({ guardians })
	}

	return {
		guardians,
		isLoading,
		isLoadingProfile,
		displayError: validationError ?? error ?? null,
		addGuardian,
		removeGuardian,
		updateGuardian,
		handleSave,
	}
}
