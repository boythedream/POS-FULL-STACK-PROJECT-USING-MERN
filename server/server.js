import express from 'express';
import cors from 'cors'
import colors from 'colors'
import morgan from 'morgan'
import connectDb from './config/db.js';
import dotenv from 'dotenv'
import itemRoutes from './routes/itemRoutes.js'
import userRoutes from './routes/userRoute.js'
import billRoutes from './routes/billsRoutes.js'
//rest objects 

const app = express()
dotenv.config()
//database connection
connectDb()
//middleware
app.use(cors())
app.use(express.json())

//routes
app.use("/api/v1/items", itemRoutes)
app.use("/api/v1/users", userRoutes)
app.use("/api/bills", billRoutes)
//listen the server
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`server running in ${process.env.DEV_MODE} on ${PORT}`);
})