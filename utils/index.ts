import { generateBackground } from "./generateBackground"
import { parseFirebaseError } from "./parseFirebaseError"
import { removeUndefined } from "./removeUndefined"
import { generateSeizureReportHtml } from "./seizureReport"
import {
	validateLogin,
	validatePassword,
	validateRegister,
} from "./validateAuth"
import {
	hasInvalidVitals,
	isInvalidSeizureTime,
	isInvalidSleepHours,
	VITAL_BOUNDS,
} from "./validateMedical"
import { validateEmail, validatePhone } from "./validateOthers"

export {
	generateBackground,
	generateSeizureReportHtml,
	hasInvalidVitals,
	isInvalidSeizureTime,
	isInvalidSleepHours,
	VITAL_BOUNDS,
	parseFirebaseError,
	removeUndefined,
	validateEmail,
	validateLogin,
	validatePassword,
	validatePhone,
	validateRegister,
}
