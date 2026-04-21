// components/seizure/SeizureVideo.tsx

import { MAX_VIDEO_SIZE_MB, MAX_VIDEOS_PER_USER } from "@/config/cloudinary"
import { useAppTheme } from "@/hooks"
import * as ImagePicker from "expo-image-picker"
import { useVideoPlayer, VideoView } from "expo-video"
import { Video, X } from "lucide-react-native"
import { Text, TouchableOpacity, View } from "react-native"
import { getStyles } from "./getStyles"

type Props = {
	videoUrl: string | undefined
	onVideoChange: (url: string | undefined) => void
	isUploading?: boolean
	uploadProgress?: number
	onCancelUpload?: () => void
}

function VideoPlayer({ url }: { url: string }) {
	const theme = useAppTheme()
	const player = useVideoPlayer(url, p => {
		p.loop = false
	})

	return (
		<VideoView
			player={player}
			style={{ width: "100%", height: 200, borderRadius: theme.radius.md }}
			allowsPictureInPicture
			nativeControls
		/>
	)
}

export function SeizureVideo({
	videoUrl,
	onVideoChange,
	isUploading,
	uploadProgress = 0,
	onCancelUpload,
}: Props) {
	const theme = useAppTheme()
	const styles = getStyles(theme)

	const pickVideo = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ["videos"],
			allowsEditing: false,
			quality: 1,
		})

		if (!result.canceled && result.assets[0]) {
			onVideoChange(result.assets[0].uri)
		}
	}

	if (isUploading) {
		return (
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Відео</Text>
				<View style={styles.uploadProgress}>
					<Text style={[styles.sublabel, { marginBottom: theme.spacing.sm }]}>
						Завантаження... {uploadProgress}%
					</Text>
					<View style={styles.progressBar}>
						<View
							style={[
								styles.progressFill,
								{
									backgroundColor: theme.colors.primary,
									width: `${uploadProgress}%` as any,
								},
							]}
						/>
					</View>
					<TouchableOpacity
						style={[
							styles.videoBtn,
							{ marginTop: theme.spacing.sm, borderColor: theme.colors.error },
						]}
						onPress={onCancelUpload}
						activeOpacity={0.7}
					>
						<X size={20} color={theme.colors.error} />
						<Text style={[styles.videoBtnText, { color: theme.colors.error }]}>
							Скасувати
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		)
	}

	return (
		<View style={styles.section}>
			<Text style={styles.sectionTitle}>Відео</Text>

			{videoUrl?.startsWith("http") ? (
				<View>
					<VideoPlayer url={videoUrl} />
					<TouchableOpacity
						style={[
							styles.videoBtn,
							{ marginTop: theme.spacing.sm, borderColor: theme.colors.error },
						]}
						onPress={() => onVideoChange(undefined)}
						activeOpacity={0.7}
					>
						<X size={20} color={theme.colors.error} />
						<Text style={[styles.videoBtnText, { color: theme.colors.error }]}>
							Видалити відео
						</Text>
					</TouchableOpacity>
				</View>
			) : videoUrl ? (
				<View style={styles.videoPreview}>
					<Video size={20} color={theme.colors.primary} />
					<Text style={styles.videoPreviewText} numberOfLines={1}>
						{videoUrl.split("/").pop()}
					</Text>
					<TouchableOpacity
						onPress={() => onVideoChange(undefined)}
						activeOpacity={0.7}
					>
						<X size={20} color={theme.colors.error} />
					</TouchableOpacity>
				</View>
			) : (
				<TouchableOpacity
					style={styles.videoBtn}
					onPress={pickVideo}
					activeOpacity={0.7}
				>
					<Video size={20} color={theme.colors.primary} />
					<Text style={styles.videoBtnText}>Додати відео з галереї</Text>
				</TouchableOpacity>
			)}

			{!videoUrl && !isUploading && (
				<Text style={styles.videoLimitText}>
					Макс. {MAX_VIDEO_SIZE_MB}МБ • до {MAX_VIDEOS_PER_USER} відео
				</Text>
			)}
		</View>
	)
}
