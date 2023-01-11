import express  from 'express'
const router = express.Router()
import {protect, isAdmin} from '../middleware/authMiddleware.js'
import {addOrderItems, getAllOrders, getOrderById, getUserOrders, payOrder, updateOrderToDelivered} from'../controllers/orderController.js'


//desc create order
//route post /api/orders
//access private
router.route('/').post(protect, addOrderItems).get(protect, isAdmin, getAllOrders)

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

router.route('/:id/deliver').put(protect, isAdmin, updateOrderToDelivered)

export default router