import {cartModel} from "../models/cart.model.js"
import { productModel } from "../models/product.model.js";

export const addToCartController = async (req, res) => {
  try {

    const userId = req.user._id;
    const { productId, quantity } = req.body;

    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found"
      });
    }

    let cart = await cartModel.findOne({ userId });

    if (!cart) {

      cart = await cartModel.create({
        userId,
        items: [
          {
            productId: product._id,
            quantity: quantity,
            price: product.price
          }
        ],
        totalPrice: product.price * quantity
      });

      return res.status(201).send({
        success: true,
        message: "Cart created and product added",
        cart
      });
    }

    const itemIndex = cart.items.findIndex(
      item => item.productId.toString() === productId
    );

    if (itemIndex > -1) {

      cart.items[itemIndex].quantity += quantity;

    } else {

      cart.items.push({
        productId: product._id,
        quantity,
        price: product.price
      });

    }

    let total = 0;

    cart.items.forEach(item => {
      total += item.price * item.quantity;
    });

    cart.totalPrice = total;

    await cart.save();

    res.status(200).send({
      success: true,
      message: "Product added to cart",
      cart
    });

  } catch (error) {

    console.log(error);

    res.status(500).send({
      success: false,
      message: "Error in add to cart",
      error
    });
  }
};