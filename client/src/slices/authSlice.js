import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loading: true,
        isAuthenticated: false
    },
    reducers: {
        loginRequest(state, action) {
            return {
                // ...state is getting that intiial state values thats it instead of that retype those false initial state use spread operator
                ...state,
                loading: true,
            }
        },
        loginSuccess(state, action) {
            return {
                loading: false,
                isAuthenticated: true,
                user: action.payload.user
            }
        },
        loginFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        registerRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        registerSuccess(state, action) {
            return {
                loading: false,
                isAuthenticated: true,
                user: action.payload.user
            }
        },
        registerFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        loadUserRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        loadUserSuccess(state, action) {
            return {
                loading: false,
                isAuthenticated: true,
                user: action.payload.user
            }
        },
        loadUserFail(state, action) {
            return {
                ...state,
                loading: false
            }
        },
        logoutSuccess(state, action) {
            return {
                loading: false,
                isAuthenticated: false,
                user: null
            }
        },
        logoutFail(state, action) {
            return {
                ...state,
                error: action.payload
            }
        },
        // Edit Register Profile
        updateProfileRequest(state, action) {
            return {
                ...state,
                loading: true,
                isUpdated : false
            }
        },
        updateProfileSuccess(state, action) {
            return {
                loading: false,
                isAuthenticated: true,
                user: action.payload.user,
                isUpdated : true
            }
        },
        updateProfileFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },   
        clearUpdateProfile(state, action) {
            return{
                ...state,
                isUpdated : false
            }
        },

        // Update Password request
        updatePasswordRequest(state, action) {
            return {
                ...state,
                loading: true,
                isUpdated : false
            }
        },
        updatePasswordSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                isUpdated: true
            }
        },
        updatePasswordFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },    
        // Forgot password request
        forgotPasswordRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        forgotPasswordSuccess(state, action) {
            return {
                ...state,
                loading: false,
                message: action.payload.message
            }
        },
        forgotPasswordFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        // Reset Password
        resetPasswordRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        resetPasswordSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user : action.payload.user
            }
        },
        resetPasswordFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        clearAuthError(state, action) {
    return {
        ...state,
        error: null
    }
}                         
    }
})

//action creater
const { actions, reducer } = authSlice

export const { loginRequest, loginSuccess, loginFail, registerRequest, registerSuccess, registerFail, loadUserRequest, loadUserSuccess, loadUserFail, logoutSuccess, logoutFail, updateProfileRequest, updateProfileSuccess, updateProfileFail, updatePasswordRequest, updatePasswordSuccess, updatePasswordFail, clearUpdateProfile, forgotPasswordRequest, forgotPasswordSuccess, forgotPasswordFail, resetPasswordRequest, resetPasswordSuccess, resetPasswordFail, clearAuthError } = actions

export default reducer