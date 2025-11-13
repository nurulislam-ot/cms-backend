import type { Schema } from "joi"
import type { Request, Response, NextFunction } from "express"

const validate = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = { ...req.body, ...req.params, ...req.query }
    const { error, value } = schema.validate(data, {
      abortEarly: false,
      stripUnknown: true,
    })
    if (error) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Validation error",
        details: error.details.map((d) => d.message),
      })
    }
    req.validated = value
    next()
  }
}

export default validate
