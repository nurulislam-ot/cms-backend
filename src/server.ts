import dotenv from "dotenv"
dotenv.config()

import app from "./app.js"
import initModels from "./models/index.js"
import { sequelize } from "./config/sequelize.js"

declare module "express-serve-static-core" {
  interface Request {
    validated?: any
    user?: any // also fix `req.user` from auth middleware
  }
}

app.listen(3000, async () => {
  console.log("Server is running on port 3000")
  try {
    await sequelize.authenticate()
    initModels()
    await sequelize.sync()
    console.log("Connection has been established successfully.")
  } catch (error) {
    console.error("Unable to connect to the database:", error)
  }
})
