import type { Request, Response, NextFunction } from "express"

import { verifyToken } from "../utils/jwt.js"
import ResponseService from "../services/response.service.js"
import userRepository from "../repositories/user.js"

export default async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.cookies.token
    if (!token)
      return res.status(401).json(ResponseService.error("No token provided"))

    const payload = verifyToken(token) as { id: string }

    const user = await userRepository.getUserById(payload.id)
    if (!user)
      return res.status(404).json(ResponseService.error("User not found", 404))
    req.user = user
    next()
  } catch (err) {
    return res
      .status(401)
      .json(ResponseService.error("Invalid or expired token"))
  }
}
