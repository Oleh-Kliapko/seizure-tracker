// components/seizure/list/cards/CardVideoUpload.tsx

import { useAppTheme } from "@/hooks"
import { Seizure } from "@/models"
import { getSeizures, updateSeizure } from "@/services"
import { checkVideoLimits, deleteVideoFromCloudinary, uploadVideoToCloudinary } from "@/services/cloudinary"
import { MAX_VIDEO_SIZE_MB, MAX_VIDEOS_PER_USER } from "@/config/cloudinary"
import * as ImagePicker from "expo-image-picker"
import { AlertCircle, Plus, Trash2 } from "lucide-react-native"
import { useState } from "react"
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native"
import { useAuth } from "@/hooks"
import { getInfoAsync } from "expo-file-system/legacy"

type Props = {
	seizure: Seizure
	onVideoUpdated: (updatedSeizure: Seizure) => void
}

export function CardVideoUpload({ seizure, onVideoUpdated }: Props) {
	const { user } = useAuth()
	const theme = useAppTheme()
	const [isUploading, setIsUploading] = useState(false)
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

			// Check file size before uploading
			const fileInfo = await getInfoAsync(result.assets[0].uri, { size: true } as any)
			const fileSize = (fileInfo as any).size ?? 0

			if (fileSize === 0) {
				setError("Не вдалося отримати розмір файлу")
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
			setError(e.message || "Помилка завантаження")
		} finally {
			setIsUploading(false)
		}
	}

	const deleteVideo = async () => {
		if (!user || !seizure.cloudinaryPublicId) return

		try {
			setError(null)
			setIsUploading(true)

			const cloudinaryError = await deleteVideoFromCloudinary(user.uid, seizure.cloudinaryPublicId)
			await updateSeizure(user.uid, seizure.id, {
				videoUrl: null,
				cloudinaryPublicId: null,
			} as any)

			await reloadSeizure()

			if (cloudinaryError) {
				setError(`Відео не видалилось з Cloudinary: ${cloudinaryError}`)
			}
		} catch (e: any) {
			setError("Помилка видалення приступу")
		} finally {
			setIsUploading(false)
		}
	}

	if (isUploading) {
		return (
			<View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
				<ActivityIndicator size="small" color={theme.colors.primary} />
				<Text style={{ color: theme.colors.text, fontSize: 12 }}>Завантаження...</Text>
			</View>
		)
	}

	if (error) {
		return (
			<View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
				<AlertCircle size={16} color={theme.colors.error} />
				<Text style={{ color: theme.colors.error, fontSize: 12 }}>{error}</Text>
			</View>
		)
	}

	if (seizure.videoUrl) {
		return (
			<TouchableOpacity
				onPress={deleteVideo}
				style={{
					flexDirection: "row",
					alignItems: "center",
					gap: 6,
					paddingHorizontal: 10,
					paddingVertical: 6,
					backgroundColor: theme.colors.error + "20",
					borderRadius: 4,
					alignSelf: "flex-start",
				}}
			>
				<Trash2 size={14} color={theme.colors.error} />
				<Text style={{ color: theme.colors.error, fontSize: 12 }}>Видалити відео</Text>
			</TouchableOpacity>
		)
	}

	return (
		<TouchableOpacity
			onPress={pickAndUploadVideo}
			style={{
				flexDirection: "row",
				alignItems: "center",
				gap: 6,
				paddingHorizontal: 10,
				paddingVertical: 6,
				backgroundColor: theme.colors.primary + "20",
				borderRadius: 4,
				alignSelf: "flex-start",
			}}
		>
			<Plus size={14} color={theme.colors.primary} />
			<Text style={{ color: theme.colors.primary, fontSize: 12 }}>Додати відео</Text>
		</TouchableOpacity>
	)
}
