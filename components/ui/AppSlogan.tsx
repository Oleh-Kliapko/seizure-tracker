// components/ui/AppSlogan.tsx

import { useAppTheme } from "@/hooks"
import { useTranslation } from "react-i18next"
import { Text } from "react-native"

type Props = {
	fontSize?: number
	marginTop?: number
	color?: string
}

export function AppSlogan({
	fontSize = 14,
	marginTop = 0,
	color = "#6B7280",
}: Props) {
	const { fonts, colors } = useAppTheme()
	const { t } = useTranslation()

	return (
		<Text
			style={{
				fontSize: fontSize,
				marginTop: marginTop,
				fontFamily: fonts.regular,
				color: color ?? colors.textSecondary,
			}}
		>
			{t("common.slogan")}
		</Text>
	)
}
