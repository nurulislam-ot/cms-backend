import bcrypt from "bcrypt"

class HashService {
  private readonly SALT_ROUNDS = parseInt(
    process.env.BCRYPT_SALT_ROUNDS || "10"
  )

  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.SALT_ROUNDS)
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash)
  }
}

const hashService = new HashService()
export default hashService
