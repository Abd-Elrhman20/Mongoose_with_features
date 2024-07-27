import mongoose, { Schema } from "mongoose";

const massageSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    receiverId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
})

export const massageModel = mongoose.model("Massage", massageSchema);