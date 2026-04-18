// components/seizure/SeizureVideo.tsx

import { useAppTheme } from "@/hooks"
import * as ImagePicker from "expo-image-picker"
import { Video, X } from "lucide-react-native"
import { Text, TouchableOpacity, View } from "react-native"
import { getStyles } from "./getStyles"

type Props = {
	videoUrl: string | undefined
	onVideoChange: (url: string | undefined) => void
}

export function SeizureVideo({ videoUrl, onVideoChange }: Props) {
	const theme = useAppTheme()
	const styles = getStyles(theme)

	const pickVideo = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Videos,
			allowsEditing: false,
			quality: 1,
		})

		if (!result.canceled && result.assets[0]) {
			onVideoChange(result.assets[0].uri)
		}
	}

	return (
		<View style={styles.section}>
			<Text style={styles.sectionTitle}>Відео</Text>

			{videoUrl ? (
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
		</View>
	)
}
