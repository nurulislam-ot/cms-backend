import express from "express"
import { asyncHandler } from "express-error-toolkit"

import validate from "../middlewares/validate.js"
import authController from "../controllers/auth.js"
import { registerSchema, loginSchema } from "../validations/user.js"

const router = express.Router()

router.post(
  "/register",
  validate(registerSchema),
  asyncHandler(authController.register)
)
router.post("/login", validate(loginSchema), asyncHandler(authController.login))

export default router
