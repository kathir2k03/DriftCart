import axios from "axios"
import { adminOrderfail, adminOrderRequest, adminOrderSuccess, createOrderfail, createOrderRequest, createOrderSuccess, deleteOrderfail, deleteOrderRequest, deleteOrderSuccess, orderDetailfail, orderDetailRequest, orderDetailSuccess, updateOrderfail, updateOrderRequest, updateOrderSuccess, userOrderfail, userOrderRequest, userOrderSuccess } from "../slices/orderSlice"

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

export const adminOrders = () => async(dispatch) => {
    try {
        dispatch(adminOrderRequest())
        const {data} = await axios.get('/api/v1/admin/orders')
        dispatch(adminOrderSuccess(data.orders))
    } catch (error) {
        dispatch(adminOrderfail(error?.response?.data?.message || error.message))
    }
}

export const deleteOrder = (id) => async(dispatch) => {
    try {
        dispatch(deleteOrderRequest())

        await axios.delete(`/api/v1/admin/order/${id}`)

        dispatch(deleteOrderSuccess())

    } catch (error) {

        dispatch(deleteOrderfail(error?.response?.data?.message || error.message))
    }
}

export const updateOrder = (id, orderData) => async(dispatch) => {
    try {
        dispatch(updateOrderRequest())

        const { data } = await axios.put(
            `/api/v1/admin/order/${id}`,
            orderData
        )

        dispatch(updateOrderSuccess(data))

    } catch (error) {

        dispatch(updateOrderfail(error?.response?.data?.message || error.message))
    }
}