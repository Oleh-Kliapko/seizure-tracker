// components/seizure/list/SeizurePagination.tsx

import { useAppTheme } from "@/hooks"
import { ChevronLeft, ChevronRight } from "lucide-react-native"
import { Text, TouchableOpacity, View } from "react-native"
import { getStyles } from "./getStyles"

type Props = {
	currentPage: number
	totalPages: number
	onPageChange: (page: number) => void
}

export function SeizurePagination({
	currentPage,
	totalPages,
	onPageChange,
}: Props) {
	const theme = useAppTheme()
	const styles = getStyles(theme)

	if (totalPages <= 1) return null

	const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

	return (
		<View style={styles.pagination}>
			<TouchableOpacity
				style={styles.pageBtn}
				onPress={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
				activeOpacity={0.7}
			>
				<ChevronLeft
					size={18}
					color={currentPage === 1 ? theme.colors.border : theme.colors.primary}
				/>
			</TouchableOpacity>

			{pages.map(p => (
				<TouchableOpacity
					key={p}
					style={[styles.pageBtn, currentPage === p && styles.pageBtnActive]}
					onPress={() => onPageChange(p)}
					activeOpacity={0.7}
				>
					<Text
						style={[
							styles.pageBtnText,
							currentPage === p && styles.pageBtnTextActive,
						]}
					>
						{p}
					</Text>
				</TouchableOpacity>
			))}

			<TouchableOpacity
				style={styles.pageBtn}
				onPress={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
				activeOpacity={0.7}
			>
				<ChevronRight
					size={18}
					color={
						currentPage === totalPages
							? theme.colors.border
							: theme.colors.primary
					}
				/>
			</TouchableOpacity>
		</View>
	)
}
