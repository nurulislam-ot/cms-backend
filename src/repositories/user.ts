import User, { type UserUpdateT } from "../models/user.js"
import Content from "../models/content.js"

class UserRepository {
  async getUsers() {
    const users = await User.findAll({
      attributes: ["id", "name", "email", "bio", "createdAt"],
      order: [["createdAt", "DESC"]],
    })
    return users
  }

  async getUserById(id: string) {
    const user = await User.findByPk(id, {
      attributes: ["id", "name", "email", "bio", "createdAt"],
      include: [
        {
          model: Content,
          as: "contents",
          attributes: [
            "id",
            "title",
            "youtube_link",
            "description",
            "createdAt",
          ],
        },
      ],
    })
    return user
  }

  async updateUser(id: string, data: UserUpdateT) {
    const user = await User.findByPk(id)
    if (!user) return null
    await user.update(data)
    return user
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
