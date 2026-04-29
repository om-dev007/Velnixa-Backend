import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name field is required to create an account"],
    },
    email: {
        type: String,
        required: [true, "Email field is required to create an account"],
        unique: [true, "Duplication is not allowed"]
    },
    password: {
        type: String,
        required: [true, "Password is required to create an account"],
        select: false
    },
    role: {
        type: String,
        role: ["USER", "ADMIN"],
        default: "USER"
    },
}, {timestamps: true})

export const userModel = mongoose.model("user", userSchema);