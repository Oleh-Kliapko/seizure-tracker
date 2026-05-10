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

	const isFirst = currentPage === 1
	const isLast = currentPage === totalPages
	const showFirstDots = currentPage > 2
	const showLastDots = currentPage < totalPages - 1

	return (
		<View style={styles.pagination}>
			{/* Prev arrow */}
			<TouchableOpacity
				style={styles.pageBtn}
				onPress={() => onPageChange(currentPage - 1)}
				disabled={isFirst}
				activeOpacity={0.7}
			>
				<ChevronLeft size={18} color={isFirst ? theme.colors.border : theme.colors.primary} />
			</TouchableOpacity>

			{/* First page */}
			{!isFirst && (
				<TouchableOpacity style={styles.pageBtn} onPress={() => onPageChange(1)} activeOpacity={0.7}>
					<Text style={styles.pageBtnText}>1</Text>
				</TouchableOpacity>
			)}

			{showFirstDots && (
				<Text style={[styles.pageBtnText, { paddingHorizontal: 2 }]}>…</Text>
			)}

			{/* Current page */}
			<View style={[styles.pageBtn, styles.pageBtnActive]}>
				<Text style={styles.pageBtnTextActive}>{currentPage}</Text>
			</View>

			{showLastDots && (
				<Text style={[styles.pageBtnText, { paddingHorizontal: 2 }]}>…</Text>
			)}

			{/* Last page */}
			{!isLast && (
				<TouchableOpacity style={styles.pageBtn} onPress={() => onPageChange(totalPages)} activeOpacity={0.7}>
					<Text style={styles.pageBtnText}>{totalPages}</Text>
				</TouchableOpacity>
			)}

			{/* Next arrow */}
			<TouchableOpacity
				style={styles.pageBtn}
				onPress={() => onPageChange(currentPage + 1)}
				disabled={isLast}
				activeOpacity={0.7}
			>
				<ChevronRight size={18} color={isLast ? theme.colors.border : theme.colors.primary} />
			</TouchableOpacity>
		</View>
	)
}
