import { createSlice } from '@reduxjs/toolkit'

const orderSlice = createSlice({
    name: 'order',

    initialState: {
        orderDetails : {},
        userOrders : [],
        loading : false
    },

    reducers: {
        createOrderRequest(state, action) {
            return{
                ...state,
                loading : true,
            }
        },
        createOrderSuccess(state, action) {
            return{
                ...state,
                loading : false,
                orderDetail : action.payload?.order
            }
        },
        createOrderfail(state, action) {
            return{
                ...state,
                loading : false,
                error : action.payload
            }
        },
        clearError(state, action){
            return{
                ...state,
                error : null
            }
        },
        userOrderRequest(state, action) {
            return{
                ...state,
                loading : true,
            }
        },
        userOrderSuccess(state, action) {
            return{
                ...state,
                loading : false,
                userOrders : action.payload
            }
        },
        userOrderfail(state, action) {
            return{
                ...state,
                loading : false,
                error : action.payload
            }
        },
        orderDetailRequest(state, action) {
            return{
                ...state,
                loading : true,
            }
        },
        orderDetailSuccess(state, action) {
            return{
                ...state,
                loading : false,
                orderDetail : action.payload.order
            }
        },
        orderDetailfail(state, action) {
            return{
                ...state,
                loading : false,
                error : action.payload
            }
        },        
    }
})

const { actions, reducer } = orderSlice

export const { createOrderRequest, createOrderSuccess, createOrderfail, clearError, userOrderRequest, userOrderSuccess, userOrderfail, orderDetailRequest, orderDetailSuccess, orderDetailfail } = actions

export default reducer