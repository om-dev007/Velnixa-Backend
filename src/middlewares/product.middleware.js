import { userModel } from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const productMiddleware = async (req, res, next) => {
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
    
    if(!token) {
        return res.status(409).json({
            message: "Token missing you cann't create product"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findById(decoded.id);
        
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