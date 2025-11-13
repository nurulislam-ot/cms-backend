import { DataTypes, Model, type CreationOptional } from "sequelize"
import { sequelize } from "../config/sequelize.js"

export type UserT = {
  id: string
  name: string
  email: string
  password: string
  bio?: string
}

export type UserCreationT = Omit<UserT, "id">
export type UserUpdateT = Partial<UserCreationT>

class User extends Model<UserT, UserCreationT> {
  declare id: CreationOptional<string>
  declare name: string
  declare email: string
  declare password: string
  declare bio?: string
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password: { type: DataTypes.STRING, allowNull: false },
    bio: { type: DataTypes.TEXT, allowNull: true },
  },
  {
    sequelize,
    modelName: "user",
    tableName: "users",
  }
)

export default User
