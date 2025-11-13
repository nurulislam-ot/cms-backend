import jwt from "jsonwebtoken"

const SECRET = process.env.JWT_SECRET
const EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d"

export function signToken(payload: object) {
  return jwt.sign(payload, SECRET as string, {
    expiresIn: "7d",
  })
}

export function verifyToken(token: string) {
  return jwt.verify(token, SECRET as string)
}
