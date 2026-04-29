import { userModel } from "../models/user.model.ts";
import { Request, Response } from "express";

export const getUserController = async (req: Request, res: Response) => {

    const id = (req as any).id;
    const role = (req as any).role

    const user = await userModel.findById(id);
    
    if(!user) {
        return res.status(404).json({
            message: "No user found"
        })
    }

    return res.status(200).json({
        message: "User fetched successfully",
        user: user
    })
}

export const updateUserController = async (req: Request, res: Response) => {
    const {name, email} = req.body;
    const id = req.params.id;

    const user = await userModel.findByIdAndUpdate(id, {
        $set: {
            name: name,
            email: email
        },
    }, { new: true })

    return res.status(200).json({
        message: "User profile updated",
        user
    })

}

export const deleteUserController = async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
        await userModel.findByIdAndDelete(id)
        return res.status(200).json({
            message: "User deleted successfully"
        })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}