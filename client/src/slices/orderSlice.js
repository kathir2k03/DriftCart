import { createSlice } from '@reduxjs/toolkit'

const orderSlice = createSlice({
    name: 'order',

    initialState: {
        orderDetails: {},
        userOrders: [],
        adminOrders: [],
        loading: false,
        isOrderDeleted: false,
        isOrderUpdated: false
    },

    reducers: {
        createOrderRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        createOrderSuccess(state, action) {
            return {
                ...state,
                loading: false,
                orderDetail: action.payload?.order
            }
        },
        createOrderfail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        clearError(state, action) {
            return {
                ...state,
                error: null
            }
        },
        userOrderRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        userOrderSuccess(state, action) {
            return {
                ...state,
                loading: false,
                userOrders: action.payload
            }
        },
        userOrderfail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        orderDetailRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        orderDetailSuccess(state, action) {
            return {
                ...state,
                loading: false,
                orderDetail: action.payload.order
            }
        },
        orderDetailfail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        adminOrderRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        adminOrderSuccess(state, action) {
            return {
                ...state,
                loading: false,
                adminOrders: action.payload
            }
        },
        adminOrderfail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        deleteOrderRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        deleteOrderSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isOrderDeleted: true
            }
        },
        deleteOrderfail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        updateOrderRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        updateOrderSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isOrderUpdated: true
            }
        },
        updateOrderfail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        clearOrderDeleted(state, action) {
            return {
                ...state,
                isOrderDeleted: false,
            }
        },

        clearOrderUpdated(state, action) {
            return {
                ...state,
                isOrderUpdated: false,
            }
        }
    }
})

const { actions, reducer } = orderSlice

export const { createOrderRequest, createOrderSuccess, createOrderfail, clearError, userOrderRequest, userOrderSuccess, userOrderfail, orderDetailRequest, orderDetailSuccess, orderDetailfail, adminOrderRequest, adminOrderSuccess, adminOrderfail, deleteOrderRequest, deleteOrderSuccess, deleteOrderfail, clearOrderDeleted, clearOrderUpdated, updateOrderRequest, updateOrderSuccess, updateOrderfail } = actions

export default reducer