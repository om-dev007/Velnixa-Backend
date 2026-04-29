import { cartModel } from "../models/cart.model.ts";
import { productModel } from "../models/product.model.ts";
import { Request, Response } from "express";
import { IResponse } from "../types/type.ts";

export const addToCartController = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user._id;
    const { productId, quantity, size } = req.body;
    const qty = Number(quantity) || 1;

    if (!productId || !size) {
      return res.status(400).json({
        success: false,
        message: "ProductId, size and quantity are required",
      }as IResponse);
    }

    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      } as IResponse);
    }

    let cart = await cartModel.findOne({ userId });

    if (!cart) {
      cart = await cartModel.create({
        userId,
        items: [
          {
            productId: product._id,
            quantity,
            price: product.price,
            size,
          },
        ],
        totalPrice: product.price * quantity,
      });

      return res.status(201).json({
        success: true,
        message: "Cart created and product added",
        data: cart,
      }as IResponse);
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId && item.size === size,
    );

    if (itemIndex > -1) {
      cart.items[itemIndex]!.quantity += qty;
    } else {
      cart.items.push({
        productId: product._id,
        quantity,
        price: product.price,
        size,
      });
    }

    cart.totalPrice = cart.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Product added to cart",
      data: cart,
    }as IResponse);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error in add to cart"
    });
  }
};

export const getCartController = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user._id;

    const cart = await cartModel
      .findOne({ userId })
      .populate("items.productId");

    if (!cart || cart.items.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Cart is empty",
      } as IResponse);
    }

    return res.status(200).json({
      success: true,
      message: "Cart fetched successfully",
      data: cart,
    } as IResponse);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error fetching cart",
      data: error,
    } as IResponse);
  }
};

export const deleteCartController = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user._id;
    const { productId, size } = req.params;

    let cart = await cartModel.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      }as IResponse);
    }

    cart.items = cart.items.filter(
      (item) =>
        !(item.productId.toString() === productId && item.size === size),
    ) as any;

    cart.totalPrice = cart.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Item removed successfully",
      data: cart,
    } as IResponse);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error deleting item",
    } as IResponse);
  }
};

export const updateQuantityController = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user._id;
    const { productId, action, size } = req.body;

    const cart = await cartModel.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      } as IResponse);
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId && item.size === size,
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      }as IResponse);
    }

    if (action === "increase") {
      cart.items[itemIndex]!.quantity += 1;
    }

    if (action === "decrease") {
      cart.items[itemIndex]!.quantity -= 1;

      if (cart.items[itemIndex]!.quantity <= 0) {
        cart.items.splice(itemIndex, 1);
      }
    }
    cart.totalPrice = cart.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Quantity updated",
      data: cart,
    }as IResponse);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error updating quantity",
      data: error,
    }as IResponse);
  }
};
