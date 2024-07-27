import { Router } from "express";
import { signIn, signUp, verifyEmail } from "./user.controllers.js";
import { checkEmailExist } from './user.middlewares.js';
import { validate } from "./validate.middleware.js";
import { signUpSchema } from "./validate.middleware.js";

const userRouter = Router()

userRouter.post("/login", signIn)
userRouter.post("/register", [validate(signUpSchema), checkEmailExist], signUp)
userRouter.get('/verify/:token', verifyEmail)


export default userRouter