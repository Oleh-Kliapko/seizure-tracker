// components/seizure/video/VideoPreview.tsx

import { useAppTheme } from "@/hooks"
import { Video, X } from "lucide-react-native"
import { Text, TouchableOpacity, View } from "react-native"
import { useTranslation } from "react-i18next"
import { VideoPlayer } from "./VideoPlayer"
import { getStyles } from "./getStyles"

type Props = {
	videoUrl: string
	onDelete: () => void
}

export function VideoPreview({ videoUrl, onDelete }: Props) {
	const theme = useAppTheme()
	const styles = getStyles(theme)
	const { t } = useTranslation()
	const isHttpUrl = videoUrl.startsWith("http")

	if (isHttpUrl) {
		return (
			<View>
				<VideoPlayer url={videoUrl} />
				<TouchableOpacity
					style={[
						styles.videoBtn,
						{ marginTop: theme.spacing.sm, borderColor: theme.colors.error },
					]}
					onPress={onDelete}
					activeOpacity={0.7}
				>
					<X size={20} color={theme.colors.error} />
					<Text style={[styles.videoBtnText, { color: theme.colors.error }]}>
						{t("video.deleteVideo")}
					</Text>
				</TouchableOpacity>
			</View>
		)
	}

	return (
		<View style={styles.videoPreview}>
			<Video size={20} color={theme.colors.primary} />
			<Text style={styles.videoPreviewText} numberOfLines={1}>
				{videoUrl.split("/").pop()}
			</Text>
			<TouchableOpacity onPress={onDelete} activeOpacity={0.7}>
				<X size={20} color={theme.colors.error} />
			</TouchableOpacity>
		</View>
	)
}
