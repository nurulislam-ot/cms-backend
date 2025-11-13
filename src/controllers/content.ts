import {
  NotFoundError,
  BadRequestError,
  ForbiddenError,
} from "express-error-toolkit"
import type { Request, Response } from "express"

import userRepository from "../repositories/user.js"
import contentRepository from "../repositories/content.js"
import ResponseService from "../services/response.service.js"
import generateYoutubeEmbedUrl from "../utils/youtube-embed.js"

class ContentController {
  async createContent(req: Request, res: Response) {
    const { youtube_link, description } = req.validated
    const user_id = req.user?.id
    if (!user_id) throw new ForbiddenError("Unauthorized")
    const youtube_link_embedded = generateYoutubeEmbedUrl(youtube_link)

    const content = await contentRepository.createContent({
      user_id,
      description,
      youtube_link: youtube_link_embedded ?? "",
    })
    return res.status(201).json(ResponseService.success(content))
  }

  async getAllContents(req: Request, res: Response) {
    const contents = await contentRepository.getAllContents()
    return res.json(ResponseService.success(contents))
  }

  async getContentById(req: Request, res: Response) {
    const content_id = req.params.content_id
    if (!content_id) throw new BadRequestError("Content ID is required")

    const content = await contentRepository.getContentById(content_id)
    if (!content) throw new NotFoundError("Content not found")

    return res.json(ResponseService.success(content))
  }

  async getContentsByUser(req: Request, res: Response) {
    const user_id = req.params.user_id
    if (!user_id) throw new BadRequestError("User ID is required")

    const user = await userRepository.getUserById(user_id)
    if (!user) throw new NotFoundError("User not found")

    const contents = await contentRepository.getContentsByUserId(user_id)

    return res.json(ResponseService.success(contents))
  }

  async updateContent(req: Request, res: Response) {
    const { id, youtube_link, description } = req.validated
    const content = await contentRepository.getContentById(id)
    if (!content) throw new NotFoundError("Content not found")

    if (content.user_id !== req.user.id) throw new ForbiddenError("Forbidden")
    const youtube_link_embedded = generateYoutubeEmbedUrl(youtube_link)
    console.log(youtube_link_embedded)

    await contentRepository.updateContent(id, {
      youtube_link: youtube_link_embedded ?? "",
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
    if (content.user_id !== req.user.id) throw new ForbiddenError("Forbidden")

    await contentRepository.deleteContent(id)

    return res.json(ResponseService.success({ message: "Deleted" }))
  }
}

const contentController = new ContentController()
export default contentController
