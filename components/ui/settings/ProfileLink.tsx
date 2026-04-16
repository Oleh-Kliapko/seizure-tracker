// components/ui/settings/ProfileLink.tsx

import { useAppTheme } from "@/hooks"
import { Link } from "expo-router"
import { Text, TouchableOpacity, View } from "react-native"
import { getStyles } from "./getStyles"

type Props = {
	href: string
	icon: React.ReactNode
	title: string
	subtitle?: string
}

export function ProfileLink({ href, icon, title, subtitle }: Props) {
	const theme = useAppTheme()
	const styles = getStyles(theme)

	return (
		<Link href={href as any} asChild>
			<TouchableOpacity style={styles.card} activeOpacity={0.7}>
				<View style={styles.content}>
					<View style={styles.iconMenu}>{icon}</View>
					<View style={{ flex: 1 }}>
						<Text style={styles.titleMenu}>{title}</Text>
						{subtitle && <Text style={styles.subtitleMenu}>{subtitle}</Text>}
					</View>
					<Text style={{ color: theme.colors.textSecondary, fontSize: 24 }}>
						›
					</Text>
				</View>
			</TouchableOpacity>
		</Link>
	)
}
