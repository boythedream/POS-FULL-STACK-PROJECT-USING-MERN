import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Mongo db connected successfully");
    } catch (error) {
        console.log("Mongo db connected faild");

    }
}

export default connectDb