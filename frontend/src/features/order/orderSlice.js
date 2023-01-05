import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import orderService from './orderService'

const initialState = {
    order: {
        user:{},
        orderItems:[],
        shippingAddress:{},
    },
    paymentUrl: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const createOrder = createAsyncThunk('order/create', async (order, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await orderService.createOrder(order, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const getOrderDetails = createAsyncThunk('order/get', async (orderId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await orderService.getOrder(orderId, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const payOrder = createAsyncThunk('order/pay', async (order, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await orderService.payOrder(order, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false 
            state.message = ''
            state.paymentUrl = null
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(createOrder.pending, (state) => {
            state.isLoading = true
        })
        .addCase(createOrder.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.order = action.payload
        })
        .addCase(createOrder.rejected, (state,  action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(getOrderDetails.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getOrderDetails.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.order = action.payload
        })
        .addCase(getOrderDetails.rejected, (state,  action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(payOrder.pending, (state) => {
            state.isLoading = true
        })
        .addCase(payOrder.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.paymentUrl = action.payload
            localStorage.removeItem('cartItems')
            localStorage.removeItem('paymentMethod')
        })
        .addCase(payOrder.rejected, (state,  action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
    }
})

export const {reset} = orderSlice.actions
export default orderSlice.reducer