import mongoose from "mongoose";

const billSchema = mongoose.Schema({
    customerName: {
        type: String,
        required: [true, "Customer name is required"]
    },
    customerContact: {
        type: Number,
        required: [true, "customer number is required"]
    },
    totalAmount: {
        type: Number,
        required: [true, "totalAmount is required"]
    },
    tax: {
        type: Number,
        required: [true, "tax is required"]
    },
    paymentMethod: {
        type: String,
        required: [true, "paymentMode is required"]
    },
    cartItems: {
        type: Array,
        require: true
    },
    date:
    {
        type:Date,
        default: Date.now()
    }
}, { timestamp: true })
const billsModel = mongoose.model("bills", billSchema)
export default billsModel