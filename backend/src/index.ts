import dotenv from "dotenv"
dotenv.config()

import express, { Request, Response } from "express"
import cors from "cors"
import { deleteVideoFromCloudinary } from "./services/cloudinaryService.js"

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

// Health check endpoint
app.get("/health", (req: Request, res: Response) => {
	res.json({ status: "ok" })
})

// Delete video endpoint
app.post("/api/videos/delete", async (req: Request, res: Response) => {
	try {
		console.log("DELETE /api/videos/delete request received")
		console.log("Request body:", req.body)
		console.log("Request headers:", req.headers)

		const { publicId, userId } = req.body

		// Validation
		if (!publicId || typeof publicId !== "string") {
			console.error("Invalid publicId:", publicId)
			res.status(400).json({ error: "Missing or invalid publicId" })
			return
		}

		if (!userId || typeof userId !== "string") {
			console.error("Invalid userId:", userId)
			res.status(400).json({ error: "Missing or invalid userId" })
			return
		}

		// Verify the API key (simple validation to prevent abuse)
		const apiKey = req.headers["x-api-key"]
		const expectedKey = process.env.API_KEY
		console.log("API key check - provided:", apiKey, "expected:", expectedKey)

		if (!expectedKey || apiKey !== expectedKey) {
			console.error("Unauthorized: API key mismatch")
			res.status(401).json({ error: "Unauthorized" })
			return
		}

		// Delete from Cloudinary
		console.log("Deleting video from Cloudinary:", { userId, publicId })
		await deleteVideoFromCloudinary(userId, publicId)

		console.log("Video deleted successfully")
		res.json({ success: true, message: "Video deleted successfully" })
	} catch (error: any) {
		console.error("Error deleting video:", error.message, error.stack)
		res.status(500).json({ error: error.message || "Failed to delete video" })
	}
})

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
