import { productModel } from "../models/product.model.ts";
import { Request, Response } from "express";
import { IResponse } from "../types/type.ts";

export const getProductController = async (req: Request, res: Response) => {
    const product = await productModel.find();

    return res.status(200).json({
        success: true,
        message: "Product fetched successfully",
        data: product,
    }as IResponse)
}

export const getDataProductController = async (req: Request, res: Response) => {
    const product = await productModel.find({section: "data"})
    return res.status(200).json({
        success: true,
        message: "Data Product fetched successfully",
        data: product,
    }as IResponse)
}

export const getPopularProductController = async (req: Request, res: Response) => {

    const product = await productModel.find({section: "popular"})

    return res.status(200).json({
        success: true,
        message: "Popular product fetched successfully",
        data: product,
    } as IResponse)
}

export const getMenProductController = async (req: Request, res: Response) => {
    const product = await productModel.find({section: "men"})

    return res.status(200).json({
        success: true,
        message: "Men section product fetched successfully",
        data: product,
    })
}

export const getWomenProductController = async (req: Request, res: Response) => {
    const product = await productModel.find({section: "women"})

    return res.status(200).json({
        success: true,
        message: "Women section product fetched successfully",
        data: product,
    } as IResponse)
}

export const getKidsProductController = async (req: Request, res: Response) => {
    const product = await productModel.find({section: "kids"})

    return res.status(200).json({
        success: true,
        message: "Kids section product fetched successfully",
        data: product,
    } as IResponse)
}

export const getProductByCategory = async (req: Request, res: Response) => {
    const category = req.query.category as "MEN" | "WOMEN" | "KIDS";
    const product = await productModel.find({category});

    if(product.length <= 0) {
        return res.status(404).json({
            success: false,
            message: "Not found"
        }as IResponse)
    }

    return res.status(200).json({
        success: true,
        message: "Fetched all successfully",
        data: product,
    }as IResponse)
}

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await productModel.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
        data: null,
      } as IResponse);
    }

    return res.status(200).json({
      success: true,
      message: "Product found successfully",
      data: product,
    } as IResponse);

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      data: null,
    } as IResponse);
  }
};

export const getNewArrivalProduct = async (req: Request, res: Response) => {
    try {
        const products = await productModel.find({section: "newArrivals"})

        return res.status(200).json({
            success: true,
            message: "Fetched products successfully",
            data: products,
        }as IResponse)
    } catch (err) {
        return res.status(500).json({
            message: err,
            success: false,
        }as IResponse)
    }
}