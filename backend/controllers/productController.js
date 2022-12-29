import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})
    
    if(products){
        res.status(200).json(products)
    } else {
        throw new Error('Server Error')
    }
})

const getProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if(product){
        res.status(200).json(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

export {getAllProducts, getProduct}