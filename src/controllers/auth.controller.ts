import jwt from "jsonwebtoken";
import { userModel } from "../models/user.model.ts";
import bcrypt from "bcryptjs"
import { Request, Response } from "express";

export const registerUserController = async (req: Request, res: Response) => {
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

export const logInUserController = async (req: Request, res: Response) => {
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
    }, process.env.JWT_SECRET as string, { expiresIn: "3d" })

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,       // 🔥 required for https
    });

    return res.status(200).json({
        message: "User logged in successfully",
        user: user
    })
}

export const logOutUserController = async (req: Request, res: Response) => {

    res.cookie("token", "", {
        httpOnly: true,
        secure: true,
        expires: new Date(0)
    });

    res.status(200).json({
        success: true,
        message: "Logged out successfully"
    });

};