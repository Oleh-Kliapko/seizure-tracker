// hooks/seizure/useSeizureView.ts

import i18n from "@/config/i18n"
import { Seizure } from "@/models"
import { deleteSeizure, getSeizureById } from "@/services"
import { router, useFocusEffect, useLocalSearchParams } from "expo-router"
import { useCallback, useState } from "react"
import { Alert } from "react-native"
import { useAuth } from "../auth/useAuth"

export function useSeizureView() {
	const { user } = useAuth()
	const { id } = useLocalSearchParams<{ id: string }>()
	const [seizure, setSeizure] = useState<Seizure | null>(null)
	const [isFetching, setIsFetching] = useState(true)
	const [isDeleting, setIsDeleting] = useState(false)

	useFocusEffect(
		useCallback(() => {
			if (!user || !id) return
			setIsFetching(true)
			getSeizureById(user.uid, id)
				.then(s => setSeizure(s ?? null))
				.catch(() => {})
				.finally(() => setIsFetching(false))
		}, [user?.uid, id]),
	)

	const handleEdit = () => {
		router.push({ pathname: "/(tabs)/seizures/[id]" as any, params: { id } })
	}

	const handleDelete = () => {
		Alert.alert(
			i18n.t("seizure.confirmDeleteTitle"),
			i18n.t("seizure.confirmDeleteMessage"),
			[
				{ text: i18n.t("common.cancel"), style: "cancel" },
				{
					text: i18n.t("seizure.confirmDeleteBtn"),
					style: "destructive",
					onPress: async () => {
						if (!user || !id) return
						try {
							setIsDeleting(true)
							await deleteSeizure(user.uid, id)
							router.back()
						} catch {
							// silent
						} finally {
							setIsDeleting(false)
						}
					},
				},
			],
		)
	}

	const updateSeizure = (updated: Seizure) => setSeizure(updated)

	return { seizure, isFetching, isDeleting, handleEdit, handleDelete, updateSeizure }
}
