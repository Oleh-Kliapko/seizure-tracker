import dotenv from "dotenv"
dotenv.config()

import cors from "cors"
import express, { Request, Response } from "express"
import { cert, initializeApp } from "firebase-admin/app"
import { getAuth } from "firebase-admin/auth"
import { Resend } from "resend"
import {
	deleteImageFromCloudinary,
	deleteVideoFromCloudinary,
} from "./services/cloudinaryService.js"

initializeApp({
	credential: cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT!)),
})

async function requireAuth(req: Request, res: Response): Promise<string | null> {
	const header = req.headers.authorization
	if (!header?.startsWith("Bearer ")) {
		res.status(401).json({ error: "Unauthorized" })
		return null
	}
	try {
		const decoded = await getAuth().verifyIdToken(header.slice(7))
		return decoded.uid
	} catch {
		res.status(401).json({ error: "Unauthorized" })
		return null
	}
}

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json({ limit: "50mb" }))

// Health check endpoint
app.get("/health", (req: Request, res: Response) => {
	res.json({ status: "ok" })
})

// Delete video endpoint
app.post("/api/videos/delete", async (req: Request, res: Response) => {
	try {
		const { publicId, userId } = req.body

		// Validation
		if (!publicId || typeof publicId !== "string") {
			res.status(400).json({ error: "Missing or invalid publicId" })
			return
		}

		if (!userId || typeof userId !== "string") {
			res.status(400).json({ error: "Missing or invalid userId" })
			return
		}

		const uid = await requireAuth(req, res)
		if (!uid) return

		// Delete from Cloudinary
		await deleteVideoFromCloudinary(userId, publicId)

		res.json({ success: true, message: "Video deleted successfully" })
	} catch (error: any) {
		console.error("Error deleting video:", error.message)
		res.status(500).json({ error: error.message || "Failed to delete video" })
	}
})

// Delete avatar endpoint
app.post("/api/images/delete", async (req: Request, res: Response) => {
	try {
		const { publicId } = req.body

		if (!publicId || typeof publicId !== "string") {
			res.status(400).json({ error: "Missing or invalid publicId" })
			return
		}

		const uid = await requireAuth(req, res)
		if (!uid) return

		await deleteImageFromCloudinary(publicId)
		res.json({ success: true })
	} catch (error: any) {
		console.error("Error deleting image:", error.message)
		res.status(500).json({ error: error.message || "Failed to delete image" })
	}
})

// Send report email endpoint
app.post("/api/emails/send-report", async (req: Request, res: Response) => {
	try {
		const { email, pdfBase64, patientName, locale } = req.body
		const isUk = locale === "uk"

		// Validation
		if (!email || typeof email !== "string") {
			res.status(400).json({ error: "Missing or invalid email" })
			return
		}

		if (!pdfBase64 || typeof pdfBase64 !== "string") {
			res.status(400).json({ error: "Missing or invalid PDF" })
			return
		}

		const uid = await requireAuth(req, res)
		if (!uid) return

		const resend = new Resend(process.env.RESEND_API_KEY)

		await resend.emails.send({
			from: process.env.RESEND_FROM!,
			to: email,
			subject: isUk
				? `SeizureTracker Звіт - ${patientName || "Пацієнт"}`
				: `SeizureTracker Report - ${patientName || "Patient"}`,
			html: isUk
				? `
				<h2>Ваш звіт про приступи</h2>
				<p>Шановний користувачу!</p>
				<p>Ваш звіт про приступи згенерований і прикріплений до цього листа.</p>
				<p><strong>SeizureTracker</strong></p>
			`
				: `
				<h2>Your Seizure Report</h2>
				<p>Dear user!</p>
				<p>Your seizure report has been generated and is attached to this email.</p>
				<p><strong>SeizureTracker</strong></p>
			`,
			attachments: [
				{
					filename: "seizure-report.pdf",
					content: Buffer.from(pdfBase64, "base64"),
					contentType: "application/pdf",
				},
			],
		})

		res.json({ success: true, message: "Email sent successfully" })
	} catch (error: any) {
		console.error("Error sending email:", error.message)
		res.status(500).json({ error: "Failed to send email" })
	}
})

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
