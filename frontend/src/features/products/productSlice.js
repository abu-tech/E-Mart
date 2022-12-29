import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import productService from './productService';


const initialState = {
    products:[],
    product: { reviews:[] },
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const getAllProducts = createAsyncThunk('products/getAll', async (_, thunkAPI) => {
    try {
        return await productService.getAll()
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const getProduct = createAsyncThunk('product/get', async (productId, thunkAPI) => {
    try {
        return await productService.get(productId)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true 
                state.products = action.payload
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true 
                state.message = action.payload
            })
            .addCase(getProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getProduct.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true 
                state.product = action.payload
            })
            .addCase(getProduct.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true 
                state.message = action.payload
            })
    }
})

export default productSlice.reducer