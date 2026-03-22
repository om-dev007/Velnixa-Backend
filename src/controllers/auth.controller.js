import jwt from "jsonwebtoken";
import { userModel } from "../models/user.model.js";
import bcrypt from "bcryptjs"

export const registerUserController = async (req, res) => {
    const { name, email, password, role } = req.body;

    /**
     *  - POST /register
     *  -Input validation
     */
    if (!name || !email || !password) {
        return res.status(400).json({
            message: "Please enter the all input fields"
        })
    }

    const user = await userModel.findOne({ email })

    if (user) {
        return res.status(409).json({
            message: "User already exist"
        })
    }

    const hashPass = await bcrypt.hash(password, 10);

    const createUser = await userModel.create({
        name: name,
        email: email,
        password: hashPass,
        role: role
    })

    return res.status(201).json({
        message: "User registered successfully",
        createUser
    })
}

export const logInUserController = async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({
        $or: [{ email: email }]
    }).select("+password");

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        })
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
        return res.status(401).json({
            message: "Wrong password"
        })
    }

    const token = jwt.sign({
        id: user._id,
        email: user.email,
        role: user.role
    }, process.env.JWT_SECRET, { expiresIn: "3d" })

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,       // 🔥 required for https
        sameSite: "None"    // 🔥 required for cross-site
    });

    return res.status(200).json({
        message: "User logged in successfully",
        user: user
    })
}

export const logOutUserController = async (req, res) => {

    res.cookie("token", "", {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        expires: new Date(0)
    });

    res.status(200).json({
        success: true,
        message: "Logged out successfully"
    });

};