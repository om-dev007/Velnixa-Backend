import {Schema, model} from "mongoose";

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        enum: {
            values: ["MEN", "WOMEN", "KIDS"],
            message: "Category can be either Men, Women or Kids"
        },
        required: true
    },
    image: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    section: {
        type: String,
        enum: {
            values: ["data", "collectionData", "men", "women", "kids", "newArrivals"]
        },
        required: [true, "Section is required for which page the image goes"]
    }
}, {timestamps: true})

export const productModel = model("product", productSchema);