import type { Request, Response, NextFunction } from "express"

import { verifyToken } from "../utils/jwt.js"
import userRepository from "../repositories/user.js"
import { BadRequestError, NotFoundError } from "express-error-toolkit"

export default async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.token
  if (!token) throw new BadRequestError("Unauthorized")

  const payload = verifyToken(token) as { id: string }

  const user = await userRepository.getUserById(payload.id)
  if (!user) throw new NotFoundError("User not found")

  req.user = user
  next()
}
