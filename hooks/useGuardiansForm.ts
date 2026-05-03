// hooks/useGuardiansForm.ts

import i18n from "@/config/i18n"
import { Guardian } from "@/models/user"
import { validateEmail, validatePhone } from "@/utils"
import { useCallback, useEffect, useRef, useState } from "react"
import { useUpdateProfile } from "./useUpdateProfile"
import { useUser } from "./useUser"

export function useGuardiansForm() {
	const { profile, isLoading: isLoadingProfile } = useUser()
	const { updateProfile, error } = useUpdateProfile()

	const [guardians, setGuardians] = useState<Guardian[]>([])
	const [validationError, setValidationError] = useState<string | null>(null)

	useEffect(() => {
		if (!profile?.guardians) return
		setGuardians(profile.guardians)
	}, [profile])

	const guardiansRef = useRef<Guardian[]>([])
	guardiansRef.current = guardians

	const autoSave = useCallback(async (overrides: { guardians?: Guardian[] } = {}) => {
		const g = overrides.guardians ?? guardiansRef.current
		for (const guardian of g) {
			if (!guardian.fullName.trim()) {
				setValidationError(i18n.t("guardians.validationFullName"))
				return
			}
			if (!guardian.relation) {
				setValidationError(i18n.t("guardians.validationRelation"))
				return
			}
			if (guardian.phone) {
				const { isValid, error } = validatePhone(guardian.phone)
				if (!isValid) {
					setValidationError(error)
					return
				}
			}
			if (guardian.email) {
				const { isValid, error } = validateEmail(guardian.email)
				if (!isValid) {
					setValidationError(error)
					return
				}
			}
		}
		setValidationError(null)
		await updateProfile({ guardians: g })
	}, [updateProfile])

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

	const updateGuardian = (index: number, field: keyof Guardian, value: string) => {
		setGuardians(prev => {
			const updated = prev.map((g, i) => (i === index ? { ...g, [field]: value } : g))
			if (field === "relation") autoSave({ guardians: updated })
			return updated
		})
	}

	return {
		guardians,
		isLoadingProfile,
		displayError: validationError ?? error ?? null,
		addGuardian,
		removeGuardian,
		updateGuardian,
		autoSave,
	}
}
