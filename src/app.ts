import cors from "cors"
import morgan from "morgan"
import express from "express"
import cookie from "cookie-parser"

import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/user.js"
import contentRoutes from "./routes/content.js"
import {
  globalErrorHandler,
  notFoundHandler,
  setErrorOptions,
} from "express-error-toolkit"

const app = express()

// init
setErrorOptions({
  showStack: process.env.NODE_ENV !== "production",
  logError: process.env.NODE_ENV !== "production",
})

app.use(cookie())
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
)
app.use(express.json())
app.use(morgan("dev"))

// routes
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/contents", contentRoutes)

// health
app.get("/", (req, res) =>
  res.json({ ok: true, env: process.env.NODE_ENV || "dev" })
)

app.use(notFoundHandler)
app.use(globalErrorHandler)

export default app
