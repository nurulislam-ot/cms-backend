import Joi from "joi"

export const createContentSchema = Joi.object({
  youtube_link: Joi.string().uri().optional(),
  description: Joi.string().allow("", null).optional(),
})

export const updateContentSchema = Joi.object({
  id: Joi.string().guid({ version: "uuidv4" }).required(),
  youtube_link: Joi.string().uri().optional(),
  description: Joi.string().allow("", null).optional(),
})
