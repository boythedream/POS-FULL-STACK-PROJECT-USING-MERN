import express from "express"
import { addBillsController, getBillsController } from "../controllers/billsController.js"


const router = express()


//Add-bills
router.post('/add-bills', addBillsController)


//get-bills
router.get('/get-bills', getBillsController)



// router.post('/delete-item', deleteItemController)
export default router