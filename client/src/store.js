import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/productsSlice";
import productReducer from "./slices/productSlice";
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";

const reducer = combineReducers({ // using combine reducer to sotre all reducer as reducer
    productsState : productsReducer,
    productState : productReducer,
    authState : authReducer,
    cartState : cartReducer    
});

const store = configureStore({
  reducer
});

export default store; // to use global so import to main.jsx in the <App/ >

// sync so using thunk changing as async but now we not need thunk 
// Redux Toolkit already has thunk included by default.
// So normally use the first version.