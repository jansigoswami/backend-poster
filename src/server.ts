import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { editPoster } from "./routes/editPoster"

// Load environment variables
dotenv.config({ path: '.env.local' })

const app = express()
const PORT = process.env.PORT || 3001

// Configure CORS
const corsOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(",").map((origin) => origin.trim())
  : ["http://localhost:3000"]

app.use(cors({
  origin: corsOrigins,
  credentials: true,
}))

// Middleware
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

// Root endpoint - status page
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Poster Editing Backend</title>
        <style>
          body { font-family: Arial, sans-serif; max-width: 800px; margin: 50px auto; padding: 20px; }
          .status { padding: 20px; border-radius: 8px; background: #e8f5e9; color: #2e7d32; }
          h1 { color: #333; }
          .info { margin-top: 20px; padding: 15px; background: #f5f5f5; border-radius: 8px; }
        </style>
      </head>
      <body>
        <h1>Poster Editing Backend</h1>
        <div class="status">✓ Backend is running</div>
        <div class="info">
          <p><strong>Service:</strong> poster-editing-backend</p>
          <p><strong>Port:</strong> ${PORT}</p>
          <p><strong>Environment:</strong> ${process.env.NODE_ENV || "development"}</p>
          <p><strong>Health Check:</strong> <a href="/health">/health</a></p>
          <p><strong>API Endpoint:</strong> POST /api/edit-poster</p>
        </div>
      </body>
    </html>
  `)
})

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "poster-editing-backend" })
})

// API routes
app.post("/api/edit-poster", editPoster)

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("Error:", err)
  res.status(500).json({ success: false, error: "Internal server error" })
})

// Start server
app.listen(PORT, () => {
  console.log(`Poster Editing Backend running on port ${PORT}`)
  console.log(`CORS origins: ${corsOrigins.join(", ")}`)
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`)
})
