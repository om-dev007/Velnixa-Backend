import { productModel } from "../models/product.model.js";

export const getProductController = async (req, res) => {
    const product = await productModel.find();

    return res.status(200).json({
        message: "Product fetched successfully",
        product,
    })
}

export const getDataProductController = async (req, res) => {
    const product = await productModel.find({section: "data"})
    return res.status(200).json({
        message: "Data Product fetched successfully",
        product,
    })
}

export const getPopularProductController = async (req, res) => {

    const product = await productModel.find({section: "popular"})

    return res.status(200).json({
        message: "Popular product fetched successfully",
        product,
    })
}

export const getMenProductController = async (req, res) => {
    const product = await productModel.find({section: "men"})

    return res.status(200).json({
        message: "Men section product fetched successfully",
        product,
    })
}

export const getWomenProductController = async (req, res) => {
    const product = await productModel.find({section: "women"})

    return res.status(200).json({
        message: "Women section product fetched successfully",
        product,
    })
}

export const getKidsProductController = async (req, res) => {
    const product = await productModel.find({section: "kids"})

    return res.status(200).json({
        message: "Kids section product fetched successfully",
        product,
    })
}

export const getProductByCategory = async (req, res) => {
    const {category} = req.query
    const product = await productModel.find({category: category});

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