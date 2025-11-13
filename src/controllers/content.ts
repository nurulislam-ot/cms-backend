import {
  NotFoundError,
  BadRequestError,
  ForbiddenError,
} from "express-error-toolkit"
import type { Request, Response } from "express"

import userRepository from "../repositories/user.js"
import contentRepository from "../repositories/content.js"
import ResponseService from "../services/response.service.js"

class ContentController {
  async createContent(req: Request, res: Response) {
    const { title, youtube_link, description } = req.validated
    const userId = req.user.id

    const content = await contentRepository.createContent({
      title,
      youtube_link,
      description,
      userId,
    })
    return res.status(201).json(ResponseService.success(content))
  }

  async getAllContents(req: Request, res: Response) {
    const contents = await contentRepository.getAllContents()
    return res.json(ResponseService.success(contents))
  }

  async getContentsByUser(req: Request, res: Response) {
    const userId = req.params.userId
    if (!userId) throw new BadRequestError("User ID is required")

    const user = await userRepository.getUserById(userId)
    if (!user) throw new NotFoundError("User not found")

    const contents = await contentRepository.getContentsByUserId(userId)

    return res.json(ResponseService.success(contents))
  }

  async updateContent(req: Request, res: Response) {
    const { id, title, youtube_link, description } = req.validated
    const content = await contentRepository.getContentById(id)
    if (!content) throw new NotFoundError("Content not found")

    if (content.userId !== req.user.id) throw new ForbiddenError("Forbidden")

    await contentRepository.updateContent(id, {
      title: title ?? content.title,
      youtube_link: youtube_link ?? content.youtube_link,
      description: description ?? content.description,
    })

    const updatedContent = await contentRepository.getContentById(id)

    return res.json(ResponseService.success(updatedContent))
  }

  async deleteContent(req: Request, res: Response) {
    const { id } = req.params
    if (!id) throw new BadRequestError("Content ID is required")

    const content = await contentRepository.getContentById(id)

    if (!content) throw new NotFoundError("Content not found")
    if (content.userId !== req.user.id) throw new ForbiddenError("Forbidden")

    await contentRepository.deleteContent(id)

    return res.json(ResponseService.success({ message: "Deleted" }))
  }
}

const contentController = new ContentController()
export default contentController
