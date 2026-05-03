// hooks/usePersonalForm.ts

import i18n from "@/config/i18n"
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
			label: i18n.t("personal.lastNameLabel"),
			value: lastName,
			onChange: setLastName,
			placeholder: i18n.t("personal.lastNamePlaceholder"),
			autoCapitalize: "words" as const,
		},
		{
			label: i18n.t("personal.firstNameLabel"),
			value: firstName,
			onChange: setFirstName,
			placeholder: i18n.t("personal.firstNamePlaceholder"),
			autoCapitalize: "words" as const,
		},
		{
			label: i18n.t("personal.middleNameLabel"),
			value: middleName,
			onChange: setMiddleName,
			placeholder: i18n.t("personal.middleNamePlaceholder"),
			autoCapitalize: "words" as const,
		},
		{
			label: i18n.t("personal.phoneLabel"),
			value: phone,
			onChange: setPhone,
			placeholder: "+380XXXXXXXXX",
			keyboardType: "phone-pad" as const,
		},
		{
			label: i18n.t("personal.countryLabel"),
			value: countryOfBirth,
			onChange: setCountryOfBirth,
			placeholder: i18n.t("personal.countryPlaceholder"),
			autoCapitalize: "words" as const,
		},
		{
			label: i18n.t("personal.cityLabel"),
			value: cityOfBirth,
			onChange: setCityOfBirth,
			placeholder: i18n.t("personal.cityPlaceholder"),
			autoCapitalize: "words" as const,
		},
		{
			label: i18n.t("personal.addressLabel"),
			value: address,
			onChange: setAddress,
			placeholder: i18n.t("personal.addressPlaceholder"),
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
