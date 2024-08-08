import itemModel from "../models/itemModel.js";

// get all items controller
export const getItemController = async (req, res) => {
    try {
        const items = await itemModel.find();
        res.status(200).json(items);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error while fetching items", success: false });
    }
};

// add items controller
export const addItemController = async (req, res) => {
    try {
        const newItem = new itemModel(req.body);
        await newItem.save();
        res.status(200).send({ message: "Add item successfully", success: true, newItem });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error while adding item", success: false });
    }
};

// update item Controller

export const updateItemController = async (req, res) => {
    try {
        await itemModel.findOneAndUpdate({ _id: req.body.itemId }, req.body);
        res.status(200).send({ message: "Update item successfully", success: true });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error while updating item", success: false });
    }
}
// delete item
export const deleteItemController = async (req, res) => {
    try {
        const { itemId } = req.body;
        await itemModel.findOneAndDelete({ _id: itemId })
        res.status(200).send({ message: "Delete item successfully", success: true });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error while Deleting item", success: false });
    }
}