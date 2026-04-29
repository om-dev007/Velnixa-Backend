import { NextFunction, Request, Response } from "express";
import { userModel } from "../models/user.model";
import jwt from 'jsonwebtoken';
import { IResponse } from "../types/type";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized access, token is missing"
        } as IResponse)
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

        const user = await userModel.findById((decoded as any).id);

        (req as any).id = (decoded as any).id;
        (req as any).role = (decoded as any).role;
        (req as any).user = user
        
        return next()

    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized access, token is invalid"
        } as IResponse)
    }
}