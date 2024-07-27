import { userModel } from './../../database/models/user.model.js';
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { AppError, catchAsyncError } from '../../utils/error.js';
import { transporter } from '../../utils/email.js';


const signIn = catchAsyncError(async (req, res) => {
    const user = await userModel.findOne({ email: req.body.email })
    // .then((user) => {
    //     if (bcrypt.compareSync(req.body.password, user.password)) {
    //         const token = jwt.sign({ id: user._id, email: user.email }, "secret")
    //         res.status(200).json({ message: "Login Success", token: token });
    //     } else {
    //         throw new AppError("Wrong Credentials", 401)   // XXXXXXXXX
    //     }
    // })
    // .catch((error) => {
    //     // throw new AppError("User not found", 500)
    //     throw new AppError(error, 500)
    // })

    if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
            const token = jwt.sign({ id: user._id, email: user.email }, "secret")
            res.status(200).json({ message: "Login Success", token: token });
        } else {
            throw new AppError("Wrong Credentials", 401)   // XXXXXXXXX
        }
    } else {
        throw new AppError("User not found", 500)
    }
})


const signUp = catchAsyncError(async (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 4);
    req.body.password = hashedPassword;
    await userModel.create(req.body)
        .then(async (user) => {
            res.status(201).json({ message: "User Created", user: user });

            const token = jwt.sign({ email: req.body.email }, "secret2")
            await transporter.sendMail({
                to: req.body.email,
                subject: "Your OTP to confirm your email",
                html: `<a href="http://localhost:3000/users/verify/${token}">Click here to verify your email by OTP</a>`
            })
        })
        .catch((error) => {
            throw new AppError("Error while creating user", 500)
        })
})


const verifyEmail = async (req, res) => {
    const token = req.params.token;
    jwt.verify(token, "secret2", async (err, user) => {
        if (err) {
            return res.status(403).send({ message: "Invalid token" })
            // throw new AppError("Invalid token", 403)
        }
        await userModel.findOneAndUpdate({ email: user.email }, { otp: "verified" })
            .then(response => {
                res.status(200).send({ message: "Email verified" })
            })
            .catch(error => {
                res.status(400).send({ message: "Error verifying email" })
                // throw new AppError("Invalid Error verifying email", 400)
            })
    })

}

export { signIn, signUp, verifyEmail }