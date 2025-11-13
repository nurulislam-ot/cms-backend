import express from "express"

import auth from "../middlewares/auth.js"
import validate from "../middlewares/validate.js"
import userController from "../controllers/user.js"
import { updateProfileSchema } from "../validations/user.js"

const router = express.Router()

router.get("/", userController.getUsers)
router.get("/:id", userController.getUserById)
router.get("/me", auth, userController.getMe)
router.put("/me", auth, validate(updateProfileSchema), userController.updateMe)

export default router
