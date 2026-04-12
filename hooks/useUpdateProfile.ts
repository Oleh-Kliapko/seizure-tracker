// hooks/useUpdateProfile.ts

import { User } from "@/models"
import { updateUser } from "@/services"
import { useState } from "react"
import { useAuth } from "./useAuth"

export function useUpdateProfile() {
	const { user } = useAuth()
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [isSuccess, setIsSuccess] = useState(false)

	const updateProfile = async (data: Partial<User>) => {
		if (!user) return

		try {
			setIsLoading(true)
			setError(null)
			setIsSuccess(false)
			await updateUser(user.uid, data)
			setIsSuccess(true)
		} catch (e) {
			setError("Помилка збереження. Спробуйте ще раз")
			return e
		} finally {
			setIsLoading(false)
		}
	}

	return { updateProfile, isLoading, error, isSuccess }
}
