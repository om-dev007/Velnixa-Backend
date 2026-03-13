import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
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
            values: ["data", "collectionData", "men", "women", "kids"]
        },
        required: [true, "Section is required for which page the image goes"]
    }
})

export const productModel = mongoose.model("product", productSchema);