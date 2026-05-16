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
import { useVideoPlayer, VideoView } from "expo-video"
import { AlertCircle, Play, Plus, Trash2, X } from "lucide-react-native"
import { memo, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import {
	ActivityIndicator,
	Modal,
	Platform,
	StatusBar,
	Text,
	TouchableOpacity,
	View,
} from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { getStyles } from "./getStyles"

type Props = {
	seizure: Seizure
	onVideoUpdated: (updatedSeizure: Seizure) => void
}

export const CardVideoUpload = memo(function CardVideoUpload({ seizure, onVideoUpdated }: Props) {
	const { user } = useAuth()
	const theme = useAppTheme()
	const styles = getStyles(theme)
	const { t } = useTranslation()
	const insets = useSafeAreaInsets()
	const [isUploading, setIsUploading] = useState(false)
	const [isDeleting, setIsDeleting] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [showPlayer, setShowPlayer] = useState(false)

	const player = useVideoPlayer(seizure.videoUrl ?? null)

	useEffect(() => {
		if (showPlayer) {
			player.play()
		} else {
			player.pause()
		}
	}, [showPlayer])

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
			setError(e.message || t("error.videoUploadError"))
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

	if (seizure.videoUrl) {
		return (
			<>
				<View style={styles.videoActionRow}>
					<TouchableOpacity
						onPress={() => setShowPlayer(true)}
						activeOpacity={0.7}
						style={[styles.videoActionBtn, { backgroundColor: theme.colors.primary + "20" }]}
					>
						<Play size={14} color={theme.colors.primary} />
						<Text style={[styles.videoActionBtnText, { color: theme.colors.primary }]}>
							{t("video.watchVideo")}
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={deleteVideo}
						disabled={isDeleting}
						activeOpacity={0.7}
						style={[styles.videoActionBtn, { backgroundColor: theme.colors.error + "20" }]}
					>
						{isDeleting
							? <ActivityIndicator size={14} color={theme.colors.error} />
							: <Trash2 size={14} color={theme.colors.error} />
						}
						<Text style={[styles.videoActionBtnText, { color: theme.colors.error }]}>
							{isDeleting ? t("video.deleting") : t("video.deleteVideo")}
						</Text>
					</TouchableOpacity>

					{error && (
						<View style={styles.videoErrorInline}>
							<AlertCircle size={12} color={theme.colors.error} />
							<Text style={styles.videoErrorText} numberOfLines={2}>{error}</Text>
						</View>
					)}
				</View>

				<Modal
					visible={showPlayer}
					animationType="fade"
					statusBarTranslucent
					onRequestClose={() => setShowPlayer(false)}
				>
					<View style={{ flex: 1, backgroundColor: "#000" }}>
						<StatusBar barStyle="light-content" backgroundColor="#000" />

						<TouchableOpacity
							onPress={() => setShowPlayer(false)}
							activeOpacity={0.8}
							accessibilityLabel="Закрити відео"
							accessibilityRole="button"
							style={{
								position: "absolute",
								top: insets.top + (Platform.OS === "android" ? 8 : 12),
								right: 16,
								zIndex: 10,
								width: 36,
								height: 36,
								borderRadius: 18,
								backgroundColor: "rgba(255,255,255,0.15)",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<X size={20} color="#fff" />
						</TouchableOpacity>

						<VideoView
							player={player}
							style={{ flex: 1 }}
							contentFit="contain"
							nativeControls
						/>
					</View>
				</Modal>
			</>
		)
	}

	return (
		<View style={styles.videoActionRow}>
			<TouchableOpacity
				onPress={pickAndUploadVideo}
				disabled={isUploading}
				activeOpacity={0.7}
				style={[styles.videoActionBtn, { backgroundColor: theme.colors.primary + "20" }]}
			>
				{isUploading
					? <ActivityIndicator size={14} color={theme.colors.primary} />
					: <Plus size={14} color={theme.colors.primary} />
				}
				<Text style={[styles.videoActionBtnText, { color: theme.colors.primary }]}>
					{isUploading ? t("video.uploadingShort") : t("video.addVideo")}
				</Text>
			</TouchableOpacity>
			{error && (
				<View style={styles.videoErrorInline}>
					<AlertCircle size={12} color={theme.colors.error} />
					<Text style={styles.videoErrorText} numberOfLines={2}>{error}</Text>
				</View>
			)}
		</View>
	)
})
