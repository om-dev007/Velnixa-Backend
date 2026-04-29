import { productModel } from "../models/product.model.ts";
import { Request, Response } from "express";

export const createProductController = async (req: Request, res: Response) => {
    const {name, description, price, category, image, rating, section} = req.body;

    if(!name || !description || !price || !category || !image || !rating) {
        return res.status(400).json({
            message: "All fields are required"
        })
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
            messsage: "Internal server error"
        })
    }

    return res.status(201).json({
        message: "Product created successfully",
        product: product
    })
}