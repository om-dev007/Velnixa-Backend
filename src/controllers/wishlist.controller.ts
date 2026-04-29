import { wishlistModel } from "../models/wishlist.model.ts";
import { productModel } from "../models/product.model.ts";
import { Request, Response } from "express";

export const toggleWishlistController = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user._id;
    const { productId } = req.body;

    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found"
      });
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
        wishlist
      });
    }

    const index = wishlist.items.findIndex(
      item => item.productId.toString() === productId
    );

    if (index > -1) {
      wishlist.items.splice(index, 1);
    } else {
      wishlist.items.push({ productId });
    }

    await wishlist.save();

    res.status(200).send({
      success: true,
      message: index > -1
        ? "Product removed from wishlist"
        : "Product added to wishlist",
      wishlist
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in toggle wishlist",
      error
    });
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
        wishlist: []
      });
    }

    res.status(200).send({
      success: true,
      wishlist
    });

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
      });
    }

    wishlist.items = wishlist.items.filter(
      item => item.productId.toString() !== productId
    ) as any;

    await wishlist.save();

    res.status(200).send({
      success: true,
      message: "Product removed from wishlist",
      wishlist
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in removing product",
      error
    });
  }
};