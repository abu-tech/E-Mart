import express  from 'express'
const router = express.Router()
import protect from '../middleware/authMiddleware.js'
import {addOrderItems, getOrderById, getUserOrders, payOrder} from'../controllers/orderController.js'


//desc create order
//route post /api/orders
//access private
router.route('/').post(protect, addOrderItems)

//desc get User Orders
//route get /api/orders/myorders
//access private
router.route('/myorders').get(protect, getUserOrders)

//desc get order by id
//route get /api/orders/:id
//access private
router.route('/:id').get(protect, getOrderById)

//desc pay order
//route put /api/orders/:id/pay
//access private
router.route('/:id/pay').post(protect, payOrder)

export default router