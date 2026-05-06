// constants/theme.ts

import { FontFamily } from "./fonts"

type Theme = {
	colors: {
		primary: string
		secondary: string
		background: string
		surface: string
		onSurface: string
		textSecondary: string
		border: string
		error: string
		success: string
	}
	spacing: {
		xs: number
		sm: number
		md: number
		lg: number
		xl: number
	}
	radius: {
		sm: number
		md: number
		lg: number
	}
	fonts: typeof FontFamily
	fontSize: {
		sm: number
		md: number
		lg: number
		xl: number
	}
	iconSize: {
		sm: number
		md: number
		lg: number
	}
	seizureColors: {
		severe: string
		medium: string
		light: string
		unknown: string
	}
	calendarSeverityColors: Record<1 | 2 | 3, string>
}

export const lightTheme: Theme = {
	colors: {
		primary: "#4A90E2", // м’який синій — головний колір дій
		secondary: "#50C878", // спокійний зелений (успіх, збереження)
		background: "#F8FAFC", // дуже світлий фон
		surface: "#FFFFFF", // картки, форми
		onSurface: "#1F2937", // основний текст
		textSecondary: "#6B7280", // другорядний текст
		border: "#E5E7EB",
		error: "#EF4444",
		success: "#10B981",
	},
	spacing: {
		xs: 4,
		sm: 8,
		md: 16,
		lg: 24,
		xl: 32,
	},
	radius: {
		sm: 8,
		md: 12,
		lg: 16,
	},
	fonts: FontFamily,
	fontSize: {
		sm: 14,
		md: 16,
		lg: 20,
		xl: 24,
	},
	iconSize: {
		sm: 20,
		md: 24,
		lg: 32,
	},
	seizureColors: {
		severe: "#f8a3ad",
		medium: "#fdc1c8",
		light: "#fddcde",
		unknown: "#1E2A3A",
	},
	calendarSeverityColors: {
		1: "#E6A817",
		2: "#F06292",
		3: "#7B1FA2",
	},
} as const

const { spacing, radius, fontSize, iconSize } = lightTheme

export const darkTheme: Theme = {
	colors: {
		primary: "#60A5FA", // трохи світліший синій для темної теми
		secondary: "#4ADE80", // світліший зелений
		background: "#0F172A", // темний фон (глибокий синьо-сірий)
		surface: "#1E2937", // темні картки
		onSurface: "#F1F5F9",
		textSecondary: "#94A3B8",
		border: "#334155",
		error: "#F87171",
		success: "#34D399",
	},
	spacing,
	radius,
	fonts: FontFamily,
	fontSize,
	iconSize,
	seizureColors: {
		severe: "#326d9390",
		medium: "#326d9380",
		light: "#326d9370",
		unknown: "#243447",
	},
	calendarSeverityColors: {
		1: "#FFCA28",
		2: "#F06292",
		3: "#7B1FA2",
	},
} as const

export type AppTheme = Theme
