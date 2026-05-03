// components/seizure/video/SeizureVideo.tsx

import { MAX_VIDEO_SIZE_MB, MAX_VIDEOS_PER_USER } from "@/config/cloudinary"
import { useAppTheme } from "@/hooks"
import { Text, View } from "react-native"
import { useTranslation } from "react-i18next"
import { VideoPickButton } from "./VideoPickButton"
import { VideoPreview } from "./VideoPreview"
import { VideoUploadProgress } from "./VideoUploadProgress"
import { getStyles } from "../getStyles"

type Props = {
	videoUrl: string | undefined
	onVideoChange: (url: string | undefined) => void
	isUploading?: boolean
	uploadProgress?: number
	onCancelUpload?: () => void
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
	const { t } = useTranslation()

	if (isUploading) {
		return (
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>{t("video.title")}</Text>
				<VideoUploadProgress
					uploadProgress={uploadProgress}
					onCancel={onCancelUpload || (() => {})}
				/>
			</View>
		)
	}

	return (
		<View style={styles.section}>
			<Text style={styles.sectionTitle}>{t("video.title")}</Text>

			{videoUrl ? (
				<VideoPreview
					videoUrl={videoUrl}
					onDelete={() => onVideoChange(undefined)}
				/>
			) : (
				<VideoPickButton onVideoPicked={onVideoChange} />
			)}

			{!videoUrl && !isUploading && (
				<Text style={{ ...getStyles(theme).videoLimitText }}>
					{t("video.maxSize", { size: MAX_VIDEO_SIZE_MB, count: MAX_VIDEOS_PER_USER })}
				</Text>
			)}
		</View>
	)
}
