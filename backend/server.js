import express from 'express'
import dotenv from 'dotenv'
import products from './data/products.js'
import colors from 'colors'
import cors from 'cors'
import connectDB from './config/db.js'
import errorHandler from './middleware/errorMiddleware.js'
import productRoutes from './routes/productsRoutes.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config()
const app = express()
connectDB()

const PORT = process.env.PORT || 4000

app.use(express.json())
app.use(express.urlencoded({extended: false }))
app.use(cors({origin: true, credentials: true}))

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`server started on PORT ${PORT}`.green.bold)
})