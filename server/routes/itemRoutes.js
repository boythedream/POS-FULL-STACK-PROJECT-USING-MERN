import express from "express"
import { getItemController, addItemController, updateItemController, deleteItemController } from "../controllers/itemController.js"

const router = express()

//getItem 
router.get('/get-items', getItemController)

//Add-item
router.post('/add-item', addItemController)

// update - items

router.put('/update-item', updateItemController)

// delete - items

router.post('/delete-item', deleteItemController)
export default router