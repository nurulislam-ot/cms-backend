import Content from "../models/content.js"

class ContentRepository {
  getContentsByUserId(user_id: string) {
    return Content.findAll({
      where: { user_id },
      order: [["createdAt", "DESC"]],
      include:[{
        attributes: ["name", "id"],
        association: "user",
      }]
    })
  }

  createContent(data: {
    user_id: string
    description?: string
    youtube_link?: string
  }) {
    return Content.create(data)
  }

  updateContent(
    id: string,
    data: { youtube_link?: string; description?: string }
  ) {
    return Content.update(data, { where: { id } })
  }

  deleteContent(id: string) {
    return Content.destroy({ where: { id } })
  }

  getContentById(id: string) {
    return Content.findByPk(id)
  }

  getAllContents() {
    return Content.findAll({
      order: [["createdAt", "DESC"]],
      include: [
        {
          attributes: ["name", "id"],
          association: "user",
        },
      ],
    })
  }
}

const contentRepository = new ContentRepository()
export default contentRepository
