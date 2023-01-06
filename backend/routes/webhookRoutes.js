import express from 'express'
const router = express.Router()
import {updateOrder} from '../controllers/webhookController.js'


//desc update order (stripe webhook)
//route post /api/stripe/webhook
//access private
router.post('/webhook', express.raw({type: 'application/json'}), updateOrder)

export default router