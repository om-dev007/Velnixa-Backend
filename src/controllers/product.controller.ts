import { productModel } from "../models/product.model";
import { Request, Response } from "express";
import { IResponse } from "../types/type";

export const createProductController = async (req: Request, res: Response) => {
    const {name, description, price, category, image, rating, section} = req.body;

    if(!name || !description || !price || !category || !image || !rating) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        }as IResponse)
    }

    const product = await productModel.create({
        name: name,
        description: description,
        price: price,
        category: category,
        image: image,
        rating: rating,
        section: section
    })

    if(!product) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        }as IResponse)
    }

    return res.status(201).json({
        success: true,
        message: "Product created successfully",
        product: product
    } as IResponse)
}