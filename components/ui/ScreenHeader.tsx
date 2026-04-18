// components/ui/ScreenHeader.tsx

import { useAppTheme } from "@/hooks"
import { router } from "expo-router"
import { ArrowLeft } from "lucide-react-native"
import { Text, TouchableOpacity, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { createScreenHeaderStyles } from "./ScreenHeader.styles"

type Props = {
	title: string
	showBackButton?: boolean
	right?: React.ReactNode
}

export function ScreenHeader({ title, showBackButton = true, right }: Props) {
	const theme = useAppTheme()
	const insets = useSafeAreaInsets()
	const styles = createScreenHeaderStyles(theme, insets)

	return (
		<View style={styles.container}>
			{showBackButton ? (
				<TouchableOpacity
					onPress={() => router.back()}
					activeOpacity={0.7}
					style={styles.backBtn}
				>
					<ArrowLeft size={24} color={theme.colors.primary} />
				</TouchableOpacity>
			) : (
				<View style={styles.placeholder} />
			)}

			<Text style={styles.title}>{title}</Text>

			<View style={styles.right}>{right ?? null}</View>
		</View>
	)
}
