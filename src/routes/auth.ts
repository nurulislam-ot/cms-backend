import express from "express"

import validate from "../middlewares/validate.js"
import authController from "../controllers/auth.js"
import { registerSchema, loginSchema } from "../validations/user.js"

const router = express.Router()

router.post("/register", validate(registerSchema), authController.register)
router.post("/login", validate(loginSchema), authController.login)

export default router
