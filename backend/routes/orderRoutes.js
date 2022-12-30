import express  from 'express'
const router = express.Router()
import protect from '../middleware/authMiddleware.js'
import {addOrderItems, getOrderById} from'../controllers/orderController.js'


//desc create order
//route /api/orders
//access private
router.route('/').post(protect, addOrderItems)

//desc get order by id
//route /api/orders/:id
//access private
router.route('/:id').get(protect, getOrderById)

export default router