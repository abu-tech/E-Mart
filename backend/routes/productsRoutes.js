import express from 'express'
const router = express.Router()
import {getAllProducts, getProduct} from '../controllers/productController.js'

//@desc get all products
//@route GET api/products
//@access public
router.route('/').get(getAllProducts)

//@desc get a product
//@route GET api/products/:id
//@access public
router.route('/:id').get(getProduct)

export default router