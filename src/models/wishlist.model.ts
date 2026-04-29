import { WishlistDocument } from './../types/type';
import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema<WishlistDocument>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: [true, "User id is required to like any product"]
    },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "product",
                required: [true, "Product id is required to create a whislist of the product"],
            },
            addedAt: {
                type: Date,
                default: Date.now,
            }
        }
    ]
}, {timestamps: true})

export const wishlistModel = mongoose.model<WishlistDocument>("wishlist", wishlistSchema);