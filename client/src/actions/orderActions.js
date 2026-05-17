import axios from "axios"
import { createOrderfail, createOrderRequest, createOrderSuccess, orderDetailfail, orderDetailRequest, orderDetailSuccess, userOrderfail, userOrderRequest, userOrderSuccess } from "../slices/orderSlice"

export const createOrder = (order) => async(dispatch) => {
    try {
        dispatch(createOrderRequest())
        const {data} = await axios.post('/api/v1/order/new', order)
        dispatch(createOrderSuccess(data))
    } catch (error) {
        dispatch(createOrderfail(error?.response?.data?.message || error.message))
    }
}

export const userOrders = () => async(dispatch) => {
    try {
        dispatch(userOrderRequest())
        const {data} = await axios.get('/api/v1/myorders')
        dispatch(userOrderSuccess(data.orders))
    } catch (error) {
        dispatch(userOrderfail(error?.response?.data?.message || error.message))
    }
}

export const orderDetail = (id) => async(dispatch) => {
    try {
        dispatch(orderDetailRequest())
        const {data} = await axios.get(`/api/v1/order/${id}`)
        dispatch(orderDetailSuccess(data))
    } catch (error) {
        dispatch(orderDetailfail(error?.response?.data?.message || error.message))
    }
}