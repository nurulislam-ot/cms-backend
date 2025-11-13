import bcrypt from "bcrypt"
import type { Request, Response } from "express"
import { BadRequestError } from "express-error-toolkit"

import jwtService from "../services/jwt.service.js"
import userRepository from "../repositories/user.js"
import hashService from "../services/hash.service.js"
import ResponseService from "../services/response.service.js"

class AuthController {
  async signup(req: Request, res: Response) {
    const { name, email, password } = req.validated
    const exists = await userRepository.getUserByEmail(email)
    if (exists) throw new BadRequestError("Email already in use")

    const hashed = await hashService.hash(password)
    const user = await userRepository.createUser({
      name,
      email,
      password: hashed,
    })

    const token = jwtService.signToken({ id: user.id, email: user.email })
    return res
      .status(201)
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .json(
        ResponseService.success({
          id: user.id,
          name: user.name,
          email: user.email,
        })
      )
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.validated
    const user = await userRepository.getUserByEmail(email)
    if (!user) throw new BadRequestError("Invalid credentials")

    const ok = await bcrypt.compare(password, user.password)
    if (!ok) throw new BadRequestError("Invalid credentials")

    const token = jwtService.signToken({ id: user.id, email: user.email })
    return res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .json(
        ResponseService.success({
          id: user.id,
          name: user.name,
          email: user.email,
        })
      )
  }

  async logout(req: Request, res: Response) {
    return res
      .clearCookie("token")
      .json(ResponseService.success({ message: "Logged out successfully" }))
  }
}

const authController = new AuthController()
export default authController
