// hooks/useVerifyEmailActions.ts

import { auth } from "@/config/firebase"
import { updateUser } from "@/services"
import { parseFirebaseError } from "@/utils"
import { sendEmailVerification, signOut } from "firebase/auth"
import { useEffect, useState } from "react"

export function useVerifyEmailActions() {
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [isResent, setIsResent] = useState(false)
	const [cooldown, setCooldown] = useState(0)

	useEffect(() => {
		if (cooldown <= 0) return
		const timer = setTimeout(() => setCooldown(c => c - 1), 1000)
		return () => clearTimeout(timer)
	}, [cooldown])

	const handleResend = async () => {
		if (!auth.currentUser || cooldown > 0) return
		try {
			setIsLoading(true)
			setError(null)
			setIsResent(false)
			await sendEmailVerification(auth.currentUser)
			setIsResent(true)
			setCooldown(60)
		} catch (e: any) {
			setError(parseFirebaseError(e.code))
		} finally {
			setIsLoading(false)
		}
	}

	const handleCheckVerification = async () => {
		if (!auth.currentUser) return
		try {
			setIsLoading(true)
			setError(null)
			await auth.currentUser.reload()
			if (auth.currentUser.emailVerified) {
				await updateUser(auth.currentUser.uid, { isEmailVerified: true })
				await signOut(auth)
			} else {
				setError("error.emailNotVerified")
			}
		} catch (e: any) {
			setError(parseFirebaseError(e.code))
		} finally {
			setIsLoading(false)
		}
	}

	const handleLogout = async () => {
		await signOut(auth)
	}

	return {
		email: auth.currentUser?.email ?? "",
		isLoading,
		error,
		isResent,
		cooldown,
		handleResend,
		handleCheckVerification,
		handleLogout,
	}
}
