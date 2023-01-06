import axios from 'axios'
const API_URL = '/api/orders'

export const getUserOrders = async (token) => {
    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }

    const res = await axios.get(API_URL + '/myorders', config)

    return res.data
}

const ordersService = {
    getUserOrders
}

export default ordersService