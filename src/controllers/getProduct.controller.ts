import { productModel } from "../models/product.model.ts";
import { Request, Response } from "express";

export const getProductController = async (req: Request, res: Response) => {
    const product = await productModel.find();

    return res.status(200).json({
        message: "Product fetched successfully",
        product,
    })
}

export const getDataProductController = async (req: Request, res: Response) => {
    const product = await productModel.find({section: "data"})
    return res.status(200).json({
        message: "Data Product fetched successfully",
        product,
    })
}

export const getPopularProductController = async (req: Request, res: Response) => {

    const product = await productModel.find({section: "popular"})

    return res.status(200).json({
        message: "Popular product fetched successfully",
        product,
    })
}

export const getMenProductController = async (req: Request, res: Response) => {
    const product = await productModel.find({section: "men"})

    return res.status(200).json({
        message: "Men section product fetched successfully",
        product,
    })
}

export const getWomenProductController = async (req: Request, res: Response) => {
    const product = await productModel.find({section: "women"})

    return res.status(200).json({
        message: "Women section product fetched successfully",
        product,
    })
}

export const getKidsProductController = async (req: Request, res: Response) => {
    const product = await productModel.find({section: "kids"})

    return res.status(200).json({
        message: "Kids section product fetched successfully",
        product,
    })
}

export const getProductByCategory = async (req: Request, res: Response) => {
    const category = req.query.category as "MEN" | "WOMEN" | "KIDS";
    const product = await productModel.find({category});

    if(product.length <= 0) {
        return res.status(404).json({
            message: "Not found"
        })
    }

    return res.status(200).json({
        message: "Fetched all successfully",
        product,
    })
}

export const getProductById = async (req: Request, res: Response) => {

    const {id} = req.params;

    const product = await productModel.findById(id)
    
    if(!product) {
        return res.status(404).json({
            message: "Product not found",
        })
    }

    return res.status(200).json({
        message: "Product found successfully",
        product,
    })
}

export const getNewArrivalProduct = async (req: Request, res: Response) => {
    try {
        const products = await productModel.find({section: "newArrivals"})

        return res.status(200).json({
            message: "Fetched products successfully",
            products,
        })
    } catch (err) {
        return res.status(500).json({
            message: err,
            success: false,
        })
    }
}