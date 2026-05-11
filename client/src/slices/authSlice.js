import {createSlice} from '@reduxjs/toolkit'

const authSlice = createSlice({
    name : 'auth',
    initialState : {
        loading : false,
        isAuthenticated : false
    },
    reducers : {
        loginRequest(state, action){
            return {  
            // ...state is getting that intiial state values thats it instead of that retype those false initial state use spread operator
            ...state,
            loading : true,
            }
        },
        loginSuccess(state, action){
            return{
                loading : false,
                isAuthenticated : true,
                user : action.payload.user
            }
        },
        loginFail(state, action){
            return{
                ...state,
                loading : false,
                error : action.payload
            }
        }
    }
})

//action creater
const { actions, reducer } = authSlice

export const { loginRequest, loginSuccess, loginFail } = actions

export default reducer