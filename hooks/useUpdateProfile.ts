// hooks/useUpdateProfile.ts
import i18n from "@/config/i18n"

import { User } from "@/models"
import { updateUser } from "@/services"
import { useCallback, useState } from "react"
import { useAuth } from "./useAuth"

export function useUpdateProfile() {
	const { user } = useAuth()
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [isSuccess, setIsSuccess] = useState(false)

	const updateProfile = useCallback(
		async (data: Partial<User>) => {
			if (!user) return

			try {
				setIsLoading(true)
				setError(null)
				setIsSuccess(false)
				await updateUser(user.uid, data)
				setIsSuccess(true)
			} catch (e) {
				setError(i18n.t("error.savingError"))
				return e
			} finally {
				setIsLoading(false)
			}
		},
		[user],
	)

	return { updateProfile, isLoading, error, isSuccess }
}
