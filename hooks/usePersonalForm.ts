// hooks/usePersonalForm.ts

import { validatePhone } from "@/utils"
import { useCallback, useEffect, useRef, useState } from "react"
import { useUpdateProfile } from "./useUpdateProfile"
import { useUser } from "./useUser"

type PersonalState = {
	lastName: string
	firstName: string
	middleName: string
	phone: string
	birthDate: number | null
	countryOfBirth: string
	cityOfBirth: string
	address: string
}

export function usePersonalForm() {
	const { profile, isLoading: isLoadingProfile } = useUser()
	const { updateProfile, error } = useUpdateProfile()

	const [lastName, setLastName] = useState("")
	const [firstName, setFirstName] = useState("")
	const [middleName, setMiddleName] = useState("")
	const [phone, setPhone] = useState("")
	const [birthDate, setBirthDate] = useState<number | null>(null)
	const [countryOfBirth, setCountryOfBirth] = useState("")
	const [cityOfBirth, setCityOfBirth] = useState("")
	const [address, setAddress] = useState("")
	const [validationError, setValidationError] = useState<string | null>(null)

	useEffect(() => {
		if (!profile) return
		setLastName(profile.lastName ?? "")
		setFirstName(profile.firstName ?? "")
		setMiddleName(profile.middleName ?? "")
		setPhone(profile.phone ?? "")
		setBirthDate(profile.birthDate ?? null)
		setCountryOfBirth(profile.countryOfBirth ?? "")
		setCityOfBirth(profile.cityOfBirth ?? "")
		setAddress(profile.address ?? "")
	}, [profile])

	const stateRef = useRef<PersonalState>({
		lastName, firstName, middleName, phone, birthDate,
		countryOfBirth, cityOfBirth, address,
	})
	stateRef.current = {
		lastName, firstName, middleName, phone, birthDate,
		countryOfBirth, cityOfBirth, address,
	}

	const autoSave = useCallback(async (overrides: Partial<PersonalState> = {}) => {
		const s: PersonalState = { ...stateRef.current, ...overrides }
		if (s.phone) {
			const { isValid, error } = validatePhone(s.phone)
			if (!isValid) {
				setValidationError(error)
				return
			}
		}
		setValidationError(null)
		await updateProfile({
			lastName: s.lastName,
			firstName: s.firstName,
			middleName: s.middleName,
			phone: s.phone,
			birthDate: s.birthDate ?? undefined,
			countryOfBirth: s.countryOfBirth,
			cityOfBirth: s.cityOfBirth,
			address: s.address,
		})
	}, [updateProfile])

	const fields = [
		{
			label: "Прізвище",
			value: lastName,
			onChange: setLastName,
			placeholder: "Введіть прізвище",
			autoCapitalize: "words" as const,
		},
		{
			label: "Ім'я",
			value: firstName,
			onChange: setFirstName,
			placeholder: "Введіть ім'я",
			autoCapitalize: "words" as const,
		},
		{
			label: "По батькові",
			value: middleName,
			onChange: setMiddleName,
			placeholder: "Введіть по батькові",
			autoCapitalize: "words" as const,
		},
		{
			label: "Телефон",
			value: phone,
			onChange: setPhone,
			placeholder: "+380XXXXXXXXX",
			keyboardType: "phone-pad" as const,
		},
		{
			label: "Країна народження",
			value: countryOfBirth,
			onChange: setCountryOfBirth,
			placeholder: "Введіть країну",
			autoCapitalize: "words" as const,
		},
		{
			label: "Місто народження",
			value: cityOfBirth,
			onChange: setCityOfBirth,
			placeholder: "Введіть місто",
			autoCapitalize: "words" as const,
		},
		{
			label: "Адреса проживання",
			value: address,
			onChange: setAddress,
			placeholder: "Введіть адресу",
		},
	]

	return {
		fields,
		birthDate,
		setBirthDate,
		isLoadingProfile,
		displayError: validationError ?? error ?? null,
		autoSave,
	}
}
