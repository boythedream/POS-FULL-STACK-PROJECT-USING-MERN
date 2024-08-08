import mongoose from "mongoose";
import dotenv from 'dotenv'
import itemModel from "./models/itemModel.js";
import items from "./utils/data.js";
import connectDb from './config/db.js'

dotenv.config()
connectDb()
// function seeder

const importData = async () => {
    try {
        await itemModel.deleteMany()
        const itemsData = await itemModel.insertMany(items)
        console.log('All items add successfully');
        // process.exit(1)
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}
importData()