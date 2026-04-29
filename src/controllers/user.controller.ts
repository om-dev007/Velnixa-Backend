import { userModel } from "../models/user.model";
import { Request, Response } from "express";
import { IResponse } from "../types/type";

export const getUserController = async (req: Request, res: Response) => {

    const id = (req as any).id;
    const role = (req as any).role

    const user = await userModel.findById(id);
    
    if(!user) {
        return res.status(404).json({
            success: false,
            message: "No user found"
        }as IResponse)
    }

    return res.status(200).json({
        success: true,
        message: "User fetched successfully",
        data: user
    }as IResponse)
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
        success: true,
        message: "User profile updated",
        data: user
    } as IResponse)
}

export const deleteUserController = async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
        await userModel.findByIdAndDelete(id)
        return res.status(200).json({
            success: true,
            message: "User deleted successfully"
        } as IResponse)
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        } as IResponse)
    }
}