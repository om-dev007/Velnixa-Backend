import { NextFunction, Response, Request } from "express";
import { userModel } from "../models/user.model.ts";
import jwt from "jsonwebtoken";

export const productMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
    
    if(!token) {
        return res.status(409).json({
            message: "Token missing you cann't create product"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

        const user: any = await userModel.findById((decoded as any).id);
        
        if(user.role !== "ADMIN") {
            return res.status(409).json({
                message: "You don't have access to create a product"
            })
        }

        next()

    } catch (err) {
        return res.status(500).json({
            message: "Internal server error"
        })   
    }

}