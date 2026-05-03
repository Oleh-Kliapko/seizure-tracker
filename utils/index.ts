import { generateBackground } from "./generateBackground"
import { parseFirebaseError } from "./parseFirebaseError"
import { removeUndefined } from "./removeUndefined"
import { generateSeizureReportHtml } from "./seizureReport"
import { validateLogin, validatePassword, validateRegister } from "./validateAuth"
import { validateEmail, validatePhone } from "./validateOthers"

export {
	generateBackground,
	generateSeizureReportHtml,
	parseFirebaseError,
	removeUndefined,
	validateEmail,
	validateLogin,
	validatePassword,
	validatePhone,
	validateRegister,
}
