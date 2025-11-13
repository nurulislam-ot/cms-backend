import {
  DataTypes,
  Model,
  type CreationOptional,
  type ForeignKey,
} from "sequelize"

import type User from "./user.js"
import { sequelize } from "../config/sequelize.js"

type ContentT = {
  id: string
  youtube_link?: string
  description?: string
  user_id: string
}

type ContentCreationT = Omit<ContentT, "id">

class Content extends Model<ContentT, ContentCreationT> {
  declare id: CreationOptional<string>
  declare youtube_link?: string
  declare description?: string
  declare user_id: ForeignKey<User["id"]>
}

Content.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    youtube_link: { type: DataTypes.STRING, allowNull: true },
    description: { type: DataTypes.TEXT, allowNull: true },
    user_id: { type: DataTypes.UUID, allowNull: false },
  },
  {
    sequelize,
    modelName: "post",
    tableName: "posts",
  }
)

export default Content
