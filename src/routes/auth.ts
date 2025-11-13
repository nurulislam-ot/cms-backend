import express from "express"
import { asyncHandler } from "express-error-toolkit"

import validate from "../middlewares/validate.js"
import authController from "../controllers/auth.js"
import { signupSchema, loginSchema } from "../validations/user.js"

const router = express.Router()

router.post(
  "/signup",
  validate(signupSchema),
  asyncHandler(authController.signup)
)
router.post("/login", validate(loginSchema), asyncHandler(authController.login))
router.delete("/logout", asyncHandler(authController.logout))

export default router
