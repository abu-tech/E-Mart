import { configureStore } from '@reduxjs/toolkit'
import productReducer from '../features/products/productSlice'
import cartReducer from '../features/cart/cartSlice'
import authReducer from '../features/auth/authSlice'
import orderDetailsReducer from '../features/orderDetails/orderDetailsSlice'
import ordersReducer from '../features/orders/ordersSlice'

export const store = configureStore({
    reducer: {
      products: productReducer,
      cart: cartReducer,
      auth: authReducer,
      orderDetails: orderDetailsReducer,
      allOrders: ordersReducer
    },
  });
