// components/seizure/video/VideoUploadProgress.tsx

import { useAppTheme } from "@/hooks"
import { X } from "lucide-react-native"
import { Text, TouchableOpacity, View } from "react-native"
import { getStyles } from "./getStyles"

type Props = {
	uploadProgress: number
	onCancel: () => void
}

export function VideoUploadProgress({ uploadProgress, onCancel }: Props) {
	const theme = useAppTheme()
	const styles = getStyles(theme)

	return (
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
				onPress={onCancel}
				activeOpacity={0.7}
			>
				<X size={20} color={theme.colors.error} />
				<Text style={[styles.videoBtnText, { color: theme.colors.error }]}>
					Скасувати
				</Text>
			</TouchableOpacity>
		</View>
	)
}
