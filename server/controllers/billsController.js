
import billsModel from "../models/billsModel.js";
// add bills controller
export const addBillsController = async (req, res) => {
    try {
        const newBill = new billsModel(req.body);
        await newBill.save();
        res.status(200).send({ message: " bill Created successfully", success: true, newBill });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Some thing went wrong while adding bills",
            error,

        })
    }
}

export const getBillsController = async (req, res) => {
    try {
        const bills = await billsModel.find();
        res.status(200).send({
            message: "Get All bills Successfully",
            bills
        });
    } catch (error) {
        console.error("Error fetching bills:", error.message);
        res.status(500).send({
            success: false,
            message: "Something went wrong while fetching bills",
            error: error.message, // Only sending the error message to the client
        });
    }
};
