import mongoose from "mongoose";

const itemSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"]
    },
    price: {
        type: Number,
        required: [true, "price is required"]
    },
    category: {
        type: String,
        required: [true, "category is required"]
    },
    image: {
        type: String,
        required: [true, "Image is required"]
    }
}, { timestamp: true })
const itemModel = mongoose.model("items", itemSchema)
export default itemModel