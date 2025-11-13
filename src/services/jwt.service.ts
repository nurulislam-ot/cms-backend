import jwt from "jsonwebtoken"

class JwtService {
  private SECRET = process.env.JWT_SECRET

  signToken(payload: object) {
    return jwt.sign(payload, this.SECRET as string, {
      expiresIn: "7d",
    })
  }

  verifyToken(token: string) {
    return jwt.verify(token, this.SECRET as string)
  }
}

const jwtService = new JwtService()
export default jwtService