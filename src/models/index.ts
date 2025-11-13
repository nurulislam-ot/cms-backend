import User from "./user.js"
import Content from "./content.js"

export default function initModels() {
  // associations
  User.hasMany(Content, {
    foreignKey: "user_id",
    as: "contents",
    onDelete: "CASCADE",
  })
  Content.belongsTo(User, { foreignKey: "user_id", as: "user" })
}
