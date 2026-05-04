// components/seizure/list/cards/CardVideoUpload.tsx

import { useAppTheme, useAuth } from "@/hooks"
import { Seizure } from "@/models"
import { getSeizures, updateSeizure } from "@/services"
import {
	checkVideoLimits,
	deleteVideoFromCloudinary,
	uploadVideoToCloudinary,
} from "@/services/cloudinary"
import { getInfoAsync } from "expo-file-system/legacy"
import * as ImagePicker from "expo-image-picker"
import { AlertCircle, Plus, Trash2 } from "lucide-react-native"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native"
import { getStyles } from "./getStyles"

type Props = {
	seizure: Seizure
	onVideoUpdated: (updatedSeizure: Seizure) => void
}

export function CardVideoUpload({ seizure, onVideoUpdated }: Props) {
	const { user } = useAuth()
	const theme = useAppTheme()
	const styles = getStyles(theme)
	const { t } = useTranslation()
	const [isUploading, setIsUploading] = useState(false)
	const [isDeleting, setIsDeleting] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const reloadSeizure = async () => {
		if (!user) return
		const seizures = await getSeizures(user.uid)
		const updated = seizures.find(s => s.id === seizure.id)
		if (updated) onVideoUpdated(updated)
	}

	const pickAndUploadVideo = async () => {
		if (!user) return

		try {
			setError(null)
			const result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ["videos"],
				allowsEditing: false,
				quality: 1,
			})

			if (result.canceled) return

			const fileInfo = await getInfoAsync(result.assets[0].uri, {
				size: true,
			} as any)
			const fileSize = (fileInfo as any).size ?? 0

			if (fileSize === 0) {
				setError(t("error.fileSizeUnknown"))
				return
			}

			const limitError = await checkVideoLimits(user.uid, fileSize)
			if (limitError) {
				setError(limitError)
				return
			}

			setIsUploading(true)
			const response = await uploadVideoToCloudinary(result.assets[0].uri)

			await updateSeizure(user.uid, seizure.id, {
				videoUrl: response.url,
				cloudinaryPublicId: response.publicId,
			})

			await reloadSeizure()
		} catch (e: any) {
			setError(e.message || t("error.uploadError"))
		} finally {
			setIsUploading(false)
		}
	}

	const deleteVideo = async () => {
		if (!user || !seizure.cloudinaryPublicId) return

		try {
			setError(null)
			setIsDeleting(true)

			const cloudinaryError = await deleteVideoFromCloudinary(
				user.uid,
				seizure.cloudinaryPublicId,
			)
			await updateSeizure(user.uid, seizure.id, {
				videoUrl: null,
				cloudinaryPublicId: null,
			} as any)

			onVideoUpdated({
				...seizure,
				videoUrl: undefined,
				cloudinaryPublicId: undefined,
			})

			if (cloudinaryError) {
				setError(t("error.cloudinaryDeleteError", { error: cloudinaryError }))
			}
		} catch (e: any) {
			setError(t("error.deleteSeizureError"))
		} finally {
			setIsDeleting(false)
		}
	}

	if (isUploading || isDeleting) {
		return (
			<View style={styles.videoStateRow}>
				<ActivityIndicator size="small" color={theme.colors.primary} />
				<Text style={styles.videoStateText}>
					{isDeleting ? t("video.deleting") : t("video.uploadingShort")}
				</Text>
			</View>
		)
	}

	if (error) {
		return (
			<View style={styles.videoStateRow}>
				<AlertCircle size={16} color={theme.colors.error} />
				<Text style={styles.videoErrorText}>{error}</Text>
			</View>
		)
	}

	if (seizure.videoUrl) {
		return (
			<TouchableOpacity
				onPress={deleteVideo}
				style={[styles.videoActionBtn, { backgroundColor: theme.colors.error + "20" }]}
			>
				<Trash2 size={14} color={theme.colors.error} />
				<Text style={[styles.videoActionBtnText, { color: theme.colors.error }]}>
					{t("video.deleteVideo")}
				</Text>
			</TouchableOpacity>
		)
	}

	return (
		<TouchableOpacity
			onPress={pickAndUploadVideo}
			style={[styles.videoActionBtn, { backgroundColor: theme.colors.primary + "20" }]}
		>
			<Plus size={14} color={theme.colors.primary} />
			<Text style={[styles.videoActionBtnText, { color: theme.colors.primary }]}>
				{t("video.addVideo")}
			</Text>
		</TouchableOpacity>
	)
}
