import Joi from "joi"
import { AppError } from "../../utils/error.js"

// Validation Schema
export const signUpSchema = Joi.object({
    username: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
})
// Validation Schema


export const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false })
    if (error) {
        throw new AppError(
            error.details.map((err) => err.message),
            400
        )
    }
    next()
}