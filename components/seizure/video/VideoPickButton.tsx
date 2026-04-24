// components/seizure/video/VideoPickButton.tsx

import { useAppTheme } from "@/hooks"
import * as ImagePicker from "expo-image-picker"
import { Video } from "lucide-react-native"
import { Text, TouchableOpacity } from "react-native"
import { getStyles } from "./getStyles"

type Props = {
	onVideoPicked: (uri: string) => void
}

export function VideoPickButton({ onVideoPicked }: Props) {
	const theme = useAppTheme()
	const styles = getStyles(theme)

	const pickVideo = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ["videos"],
			allowsEditing: false,
			quality: 1,
		})

		if (!result.canceled && result.assets[0]) {
			onVideoPicked(result.assets[0].uri)
		}
	}

	return (
		<TouchableOpacity
			style={styles.videoBtn}
			onPress={pickVideo}
			activeOpacity={0.7}
		>
			<Video size={20} color={theme.colors.primary} />
			<Text style={styles.videoBtnText}>Додати відео з галереї</Text>
		</TouchableOpacity>
	)
}
