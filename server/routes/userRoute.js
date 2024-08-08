import express from "express"
import { registerController, LoginController } from "../controllers/userController.js"

const router = express()


// register

router.post('/register', registerController)
// login

router.post('/login', LoginController)
export default router