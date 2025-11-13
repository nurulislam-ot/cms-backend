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
  title: string
  youtube_link?: string
  description?: string
  userId: string
}

type ContentCreationT = Omit<ContentT, "id">

class Content extends Model<ContentT, ContentCreationT> {
  declare id: CreationOptional<string>
  declare title: string
  declare youtube_link?: string
  declare description?: string
  declare userId: ForeignKey<User["id"]>
}

Content.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: { type: DataTypes.STRING, allowNull: false },
    youtube_link: { type: DataTypes.STRING, allowNull: true },
    description: { type: DataTypes.TEXT, allowNull: true },
    userId: { type: DataTypes.UUID, allowNull: false },
  },
  {
    sequelize,
    modelName: "content",
    tableName: "contents",
  }
)

export default Content
