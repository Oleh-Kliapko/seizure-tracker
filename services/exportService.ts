// services/exportService.ts

import { Seizure } from "@/models"
import { User } from "@/models/user"
import { generateSeizureReportHtml } from "@/utils"
import * as Print from "expo-print"
import * as Sharing from "expo-sharing"

export async function exportSeizuresToPdf(
	user: User,
	seizures: Seizure[],
	from: number,
	to: number,
): Promise<void> {
	const html = await generateSeizureReportHtml(user, seizures, from, to)

	const { uri } = await Print.printToFileAsync({
		html,
		base64: false,
	})

	const canShare = await Sharing.isAvailableAsync()
	if (canShare) {
		await Sharing.shareAsync(uri, {
			mimeType: "application/pdf",
			dialogTitle: "Поділитись звітом",
			UTI: "com.adobe.pdf",
		})
	}
}
