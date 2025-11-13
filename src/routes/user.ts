import express from "express"
import { asyncHandler } from "express-error-toolkit"

import auth from "../middlewares/auth.js"
import validate from "../middlewares/validate.js"
import userController from "../controllers/user.js"
import { updateProfileSchema } from "../validations/user.js"

const router = express.Router()

router.get("/", asyncHandler(userController.getUsers))
router.get("/me", asyncHandler(auth), asyncHandler(userController.getMe))
router.get("/:id", asyncHandler(userController.getUserById))
router.put(
  "/me",
  asyncHandler(auth),
  validate(updateProfileSchema),
  asyncHandler(userController.updateMe)
)

export default router
