import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name: 'cart',

    initialState: {
        items: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
        loading: false,
        shippingInfo: localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')) : {}
    },

    reducers: {

        addCartItemRequest(state) {
            state.loading = true
        },

addCartItemSuccess(state, action) {

    const item = action.payload;

    const existingItem = state.items.find(
        i => i.product === item.product
    );

    if(existingItem){

        state.items = state.items.map(i =>

            i.product === existingItem.product
                ? item
                : i
        )

    } else {

        state.items.push(item)
    }

    localStorage.setItem(
        'cartItems',
        JSON.stringify(state.items)
    )
},

increaseCartItemQty(state, action) {

    state.items = state.items.map(item => {

        if (item.product === action.payload) {

            if(item.quantity < item.stock){
                item.quantity = item.quantity + 1
            }
        }

        return item
    })

    localStorage.setItem(
        'cartItems',
        JSON.stringify(state.items)
    )
},

decreaseCartItemQty(state, action) {

    state.items = state.items.map(item => {

        if (item.product === action.payload) {

            if(item.quantity > 1){
                item.quantity = item.quantity - 1
            }
        }

        return item
    })

    localStorage.setItem(
        'cartItems',
        JSON.stringify(state.items)
    )
},
        removeItemFromCart(state, action) {
            const filterItems = state.items.filter(item => {
                return item.product !== action.payload
            })
            localStorage.setItem('cartItems', JSON.stringify(state.items))
            return {
                ...state,
                items: filterItems
            }
        },
        saveShippingInfo(state, action) {
            localStorage.setItem('shippingInfo', JSON.stringify(action.payload))
            return {
                ...state,
                shippingInfo: action.payload
            }
        }
    }
})

const { actions, reducer } = cartSlice

export const {
    addCartItemRequest,
    addCartItemSuccess,
    increaseCartItemQty,
    decreaseCartItemQty,
    removeItemFromCart,
    saveShippingInfo
} = actions

export default reducer