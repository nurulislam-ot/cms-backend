import User, { type UserUpdateT } from "../models/user.js"

class UserRepository {
  async getUsers() {
    return User.findAll({
      attributes: ["id", "name", "email", "bio", "createdAt"],
      order: [["createdAt", "DESC"]],
    })
  }

  async getUserById(id: string) {
    const user = await User.findByPk(id, {
      attributes: ["id", "name", "email", "bio", "createdAt"],
    })
    return user
  }

  async updateUser(id: string, data: UserUpdateT) {
    const user = await User.findByPk(id)
    if (!user) return null
    const updatedUser = await user.update(data)
    return updatedUser
  }

  async getUserByEmail(email: string) {
    const user = await User.findOne({
      where: { email },
    })
    return user
  }

  async createUser(data: { name: string; email: string; password: string }) {
    const user = await User.create(data)
    return user
  }
}

const userRepository = new UserRepository()
export default userRepository
