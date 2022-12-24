import express from 'express'
import dotenv from 'dotenv'
import products from './products.js'

dotenv.config()
const app = express()

const PORT = process.env.PORT || 4000

app.get('/api/products', (req, res) => {
    res.json(products)
})

app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p._id === req.params.id)
    res.json(product)
})

app.listen(PORT, () => {
    console.log(`server started on PORT ${PORT}`)
})