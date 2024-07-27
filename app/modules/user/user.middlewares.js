import { userModel } from "../../database/models/user.model.js";
import { AppError, catchAsyncError } from "../../utils/error.js";

export const checkEmailExist = catchAsyncError(async (req, res, next) => {
    const isEmail = userModel.findOne({ email: req.body.email })
    // .then((user) => {
    //     if (user) {
    //         // res.status(400).json({ message: "Email already exist" });
    //         throw new AppError("Email already exist", 400);    // XXXXXXXXXXXXXXXXXXX
    //     }
    //     else {
    //         next();
    //     }
    // })
    // .catch((error) => {
    //     res.status(500).json({ message: "Error while checking email" });
    //     throw new AppError("Error while checking email", 500);
    // })

    if (isEmail) {
        throw new AppError("Email already exist", 400);
    } else {
        next()
    }
})