// components/seizure/video/SeizureVideo.tsx

import { MAX_VIDEO_SIZE_MB, MAX_VIDEOS_PER_USER } from "@/config/cloudinary"
import { useAppTheme } from "@/hooks"
import { Text, View } from "react-native"
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

	if (isUploading) {
		return (
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Відео</Text>
				<VideoUploadProgress
					uploadProgress={uploadProgress}
					onCancel={onCancelUpload || (() => {})}
				/>
			</View>
		)
	}

	return (
		<View style={styles.section}>
			<Text style={styles.sectionTitle}>Відео</Text>

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
					Макс. {MAX_VIDEO_SIZE_MB}МБ • до {MAX_VIDEOS_PER_USER} відео
				</Text>
			)}
		</View>
	)
}
