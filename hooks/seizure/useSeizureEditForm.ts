// hooks/seizure/useSeizureEditForm.ts

import i18n from "@/config/i18n"
import { Seizure } from "@/models"
import { deleteSeizure, getSeizureById, updateSeizure } from "@/services"
import { router, useLocalSearchParams } from "expo-router"
import { deleteField } from "firebase/firestore"
import { useEffect, useState } from "react"
import { Alert } from "react-native"
import { useAuth } from "../auth/useAuth"
import { useSeizureFormBase } from "./useSeizureFormBase"

export function useSeizureEditForm() {
	const { user } = useAuth()
	const { id } = useLocalSearchParams<{ id: string }>()
	const base = useSeizureFormBase()
	const [isFetching, setIsFetching] = useState(true)

	useEffect(() => {
		if (!user || !id) return
		setIsFetching(true)
		getSeizureById(user.uid, id)
			.then(seizure => {
				if (!seizure) return
				base.setStartedAt(seizure.startedAt)
				base.setDurationSeconds(seizure.durationSeconds)
				// backward-compat: old docs have `type`, new ones have `types`
				base.setTypes(seizure.types ?? [(seizure as any).type ?? "tonic-clonic"])
				base.setCustomType(seizure.customType ?? "")
				base.setSeverity(seizure.severity)
				base.setInternalTriggers(seizure.internalTriggers ?? [])
				base.setExternalTriggers(seizure.externalTriggers ?? [])
				base.setMoodBefore(seizure.moodBefore)
				base.setMoodAfter(seizure.moodAfter)
				base.setSleepHoursBefore(seizure.sleepHoursBefore)
				base.setDescription(seizure.description ?? "")
			})
			.catch(() => base.setError(i18n.t("error.loadingError")))
			.finally(() => setIsFetching(false))
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user?.uid, id])

	const handleSave = async () => {
		if (!user || !id) return

		const validationError = base.validateFields()
		if (validationError) {
			base.setError(validationError)
			return
		}

		try {
			base.setIsLoading(true)
			base.setError(null)

			const seizureData: Record<string, any> = {
				startedAt: base.startedAt,
				types: base.types,
				internalTriggers: base.internalTriggers,
				externalTriggers: base.externalTriggers,
			}

			seizureData.durationSeconds = base.durationSeconds ?? deleteField()
			if (base.customType && base.types.includes("custom")) seizureData.customType = base.customType
			if (base.severity !== undefined) seizureData.severity = base.severity
			if (base.moodBefore !== undefined) seizureData.moodBefore = base.moodBefore
			if (base.moodAfter !== undefined) seizureData.moodAfter = base.moodAfter
			if (base.sleepHoursBefore !== undefined) seizureData.sleepHoursBefore = base.sleepHoursBefore
			seizureData.description = base.description || deleteField()

			await updateSeizure(user.uid, id, seizureData as Partial<Seizure>)
			router.back()
		} catch (e: any) {
			base.setError(i18n.t("error.savingError"))
		} finally {
			base.setIsLoading(false)
		}
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
							base.setIsLoading(true)
							await deleteSeizure(user.uid, id)
							router.back()
						} catch {
							base.setError(i18n.t("error.deleteError"))
						} finally {
							base.setIsLoading(false)
						}
					},
				},
			],
		)
	}

	return {
		...base,
		isFetching,
		handleSave,
		handleDelete,
	}
}
