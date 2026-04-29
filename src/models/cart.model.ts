import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "product",
                required: [true, "Product is required "],
            },
            quantity: {
                type: Number,
                required: [true, "Quantity is required for product"]
            },
            price: {
                type: Number,
                required: [true, "Price is required for storing that product"]
            },
            size: {
                type: String,
                enum: {
                    values: ["S", "M", "L", "XL", "XXL"],
                },
                required: [true, "Size is required for storing that product"],
            }
        }
    ],
    totalPrice: {
        type: Number
    }
}, {timestamps: true})

export const cartModel = mongoose.model("cart", cartSchema);