import User from "./user.js"
import Content from "./content.js"

export default function initModels() {
  // associations
  User.hasMany(Content, {
    foreignKey: "userId",
    as: "contents",
    onDelete: "CASCADE",
  })
  Content.belongsTo(User, { foreignKey: "userId", as: "owner" })
}
