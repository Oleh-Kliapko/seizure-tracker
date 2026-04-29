import dotenv from "dotenv"
dotenv.config()

import express, { Request, Response } from "express"
import cors from "cors"
import nodemailer from "nodemailer"
import { deleteImageFromCloudinary, deleteVideoFromCloudinary } from "./services/cloudinaryService.js"

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

		// Verify the API key (simple validation to prevent abuse)
		const apiKey = req.headers["x-api-key"]
		const expectedKey = process.env.API_KEY

		if (!expectedKey || apiKey !== expectedKey) {
			res.status(401).json({ error: "Unauthorized" })
			return
		}

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

		const apiKey = req.headers["x-api-key"]
		const expectedKey = process.env.API_KEY

		if (!expectedKey || apiKey !== expectedKey) {
			res.status(401).json({ error: "Unauthorized" })
			return
		}

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
		const { email, pdfBase64, patientName } = req.body

		// Validation
		if (!email || typeof email !== "string") {
			res.status(400).json({ error: "Missing or invalid email" })
			return
		}

		if (!pdfBase64 || typeof pdfBase64 !== "string") {
			res.status(400).json({ error: "Missing or invalid PDF" })
			return
		}

		// Verify API key
		const apiKey = req.headers["x-api-key"]
		const expectedKey = process.env.API_KEY

		if (!expectedKey || apiKey !== expectedKey) {
			res.status(401).json({ error: "Unauthorized" })
			return
		}

		// Setup email transporter
		const transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: Number(process.env.SMTP_PORT) || 587,
			secure: process.env.SMTP_SECURE === "true",
			family: 4,
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASS,
			},
		} as any)

		// Send email
		const mailOptions = {
			from: process.env.SMTP_FROM || process.env.SMTP_USER,
			to: email,
			subject: `SeizureTracker Звіт - ${patientName || "Пацієнт"}`,
			html: `
				<h2>Ваш звіт про приступи</h2>
				<p>Шановний користувачу!</p>
				<p>Ваш звіт про приступи згенерований і прикріплений до цього листа.</p>
				<p><strong>SeizureTracker</strong></p>
			`,
			attachments: [
				{
					filename: "seizure-report.pdf",
					content: Buffer.from(pdfBase64, "base64"),
					contentType: "application/pdf",
				},
			],
		}

		await transporter.sendMail(mailOptions)

		res.json({ success: true, message: "Email sent successfully" })
	} catch (error: any) {
		console.error("Error sending email:", error.message)
		res.status(500).json({ error: "Failed to send email" })
	}
})

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
