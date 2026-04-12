// models/user.ts

export type GuardianRelation = "father" | "mother" | "guardian"

export type Guardian = {
	fullName: string
	email: string
	phone: string
	relation: GuardianRelation
}

export type CommunicationChannel = "email" | "phone"

export type FirstSeizureDate = {
	month: number
	year: number
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
	countryOfBirth?: string
	cityOfBirth?: string
	address?: string
	avatarUrl?: string

	firstSeizureDate?: FirstSeizureDate

	communicationChannel?: CommunicationChannel

	guardians?: Guardian[]
}
