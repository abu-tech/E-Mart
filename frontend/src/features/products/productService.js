import axios from "axios"
const API_URL = '/api/products'

const getAll = async () => {
    const res = await axios.get(API_URL)

    return res.data
}

const get = async (productId) => {
    const res = await axios.get(API_URL + `/${productId}`)

    return res.data
}

const productService = {
    getAll, 
    get
}

export default productService
