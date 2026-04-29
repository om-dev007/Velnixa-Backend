import { wishlistModel } from "../models/wishlist.model";
import { productModel } from "../models/product.model";
import { Request, Response } from "express";
import { IResponse } from "../types/type";

export const toggleWishlistController = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user._id;
    const { productId } = req.body;

    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found"
      }as IResponse);
    }

    let wishlist = await wishlistModel.findOne({ userId });

    if (!wishlist) {
      wishlist = await wishlistModel.create({
        userId,
        items: [{ productId }]
      });

      return res.status(201).send({
        success: true,
        message: "Product added to wishlist",
        data: wishlist
      }as IResponse);
    }

    const index = wishlist.items.findIndex(
      item => item.productId.toString() === productId
    );

    if (index > -1) {
      wishlist.items.splice(index, 1);
    } else {
      wishlist.items.push({ productId}as any);
    }

    await wishlist.save();

    res.status(200).send({
      success: true,
      message: index > -1
        ? "Product removed from wishlist"
        : "Product added to wishlist",
      data: wishlist
    }as IResponse);

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in toggle wishlist",
      error
    }as IResponse);
  }
};

export const getWishlistController = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user._id;

    const wishlist = await wishlistModel
      .findOne({ userId })
      .populate("items.productId");

    if (!wishlist || wishlist.items.length === 0) {
      return res.status(200).send({
        success: true,
        message: "Wishlist is empty",
        data: wishlist
      } as IResponse);
    }

    return res.status(200).send({
      success: true,
      message: "Fetched wishlist item successfully",
      data: wishlist
    }as IResponse);

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get wishlist",
      error
    });
  }
};

export const removeFromWishlistController = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user._id;
    const { productId } = req.params;

    const wishlist = await wishlistModel.findOne({ userId });

    if (!wishlist) {
      return res.status(404).send({
        success: false,
        message: "Wishlist not found"
      }as IResponse);
    }

    wishlist.items = wishlist.items.filter(
      item => item.productId.toString() !== productId
    ) as any;

    await wishlist.save();

    return res.status(200).send({
      success: true,
      message: "Product removed from wishlist",
      data: wishlist
    }as IResponse);

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in removing product",
      data: error
    }as IResponse);
  }
};