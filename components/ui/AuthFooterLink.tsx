import { useAppTheme } from "@/hooks"
import { Link } from "expo-router"
import { Text, TouchableOpacity, View } from "react-native"
import { createAuthFooterLinkStyles } from "./AuthFooterLink.styles"

type Props = {
	question: string
	linkText: string
	href: string
}

export function AuthFooterLink({ question, linkText, href }: Props) {
	const theme = useAppTheme()
	const styles = createAuthFooterLinkStyles(theme)

	return (
		<View style={styles.wrapper}>
			<Text style={styles.question}>{question}</Text>
			<Link href={href as any} asChild>
				<TouchableOpacity>
					<Text style={styles.linkText}>{linkText}</Text>
				</TouchableOpacity>
			</Link>
		</View>
	)
}
