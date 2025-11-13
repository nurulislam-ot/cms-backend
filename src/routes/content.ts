import express from "express"
import auth from "../middlewares/auth.js"
import { asyncHandler } from "express-error-toolkit"

import {
  createContentSchema,
  updateContentSchema,
} from "../validations/content.js"
import validate from "../middlewares/validate.js"
import contentController from "../controllers/content.js"

const router = express.Router()

router.post(
  "/",
  auth,
  validate(createContentSchema),
  asyncHandler(contentController.createContent)
)

router.get("/", asyncHandler(contentController.getAllContents))
router.get("/:userId", asyncHandler(contentController.getContentsByUser))

router.put(
  "/",
  auth,
  validate(updateContentSchema),
  asyncHandler(contentController.updateContent)
)
router.delete("/:id", auth, asyncHandler(contentController.deleteContent))

export default router
