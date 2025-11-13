import type { Request, Response } from "express"
import {
  BadRequestError,
  NotFoundError,
  ForbiddenError,
} from "express-error-toolkit"

import userRepository from "../repositories/user.js"
import ResponseService from "../services/response.service.js"

class UserController {
  async getUsers(req: Request, res: Response) {
    const users = await userRepository.getUsers()
    return res.json(ResponseService.success(users))
  }

  async getUserById(req: Request, res: Response) {
    const { id } = req.params
    if (!id) throw new BadRequestError("User ID is required")

    const user = await userRepository.getUserById(id)
    if (!user) throw new NotFoundError("User not found")

    return res.json(ResponseService.success(user))
  }

  async getMe(req: Request, res: Response) {
    if (!req.user) throw new ForbiddenError("Unauthorized")
    const user = await userRepository.getUserById(req.user.id)
    if (!user) throw new NotFoundError("User not found")

    return res.json(
      ResponseService.success({
        id: user.id,
        name: user.name,
        email: user.email,
        bio: user.bio,
      })
    )
  }

  async updateMe(req: Request, res: Response) {
    const updates = req.validated
    const user = req.user
    await user.update(updates)
    return res.json(
      ResponseService.success({
        id: user.id,
        name: user.name,
        email: user.email,
        bio: user.bio,
      })
    )
  }
}

const userController = new UserController()
export default userController
