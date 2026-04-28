// models/user.ts

export type FirstSeizureDate = {
	month: number
	year: number
}
export type BloodType = "A" | "B" | "AB" | "O"
export type RhFactor = "+" | "-"

export type MedicalInfo = {
	firstSeizureDate?: FirstSeizureDate
	bloodType?: BloodType
	rhFactor?: RhFactor
	height?: number // см
	weight?: number // кг
	anamnesis?: string
}

export type GuardianRelation = "father" | "mother" | "guardian"

export type Guardian = {
	fullName: string
	email: string
	phone: string
	relation: GuardianRelation
}

export type CommunicationChannel = "email" | "phone"

export type AppThemeMode = "system" | "light" | "dark"

export type AppSettings = {
	themeMode?: AppThemeMode
	communicationChannel?: CommunicationChannel
}

export type User = {
	uid: string
	email: string
	displayName: string
	isEmailVerified: boolean
	createdAt: Date
	updatedAt: Date

	lastName?: string
	firstName?: string
	middleName?: string
	phone?: string
	birthDate?: number
	countryOfBirth?: string
	cityOfBirth?: string
	address?: string
	avatarUrl?: string
	avatarPublicId?: string

	medicalInfo?: MedicalInfo

	communicationChannel?: CommunicationChannel

	guardians?: Guardian[]

	appSettings?: AppSettings
}
