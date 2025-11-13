import Content from "../models/content.js"

class ContentRepository {
  getContentsByUserId(userId: string) {
    return Content.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
    })
  }

  createContent(data: {
    title: string
    youtube_link?: string
    description?: string
    userId: string
  }) {
    return Content.create(data)
  }

  updateContent(
    id: string,
    data: { title?: string; youtube_link?: string; description?: string }
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
    return Content.findAll({ order: [["createdAt", "DESC"]] })
  }
}

const contentRepository = new ContentRepository()
export default contentRepository
