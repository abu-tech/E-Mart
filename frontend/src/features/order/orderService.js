import axios from 'axios'
const API_URL = '/api/orders'

export const createOrder = async (order, token) => {
    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }

    const res = await axios.post(API_URL, order, config)

    return res.data
}

export const getOrder = async (orderId, token) => {
    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }

    const res = await axios.get(API_URL + `/${orderId}`, config)

    return res.data
}

export const payOrder = async (order, token) => {
    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }

    const res = await axios.post(API_URL + `/${order._id}/pay`, order, config)

    return res.data
}

const orderService = {
    createOrder,
    getOrder,
    payOrder
}

export default orderService