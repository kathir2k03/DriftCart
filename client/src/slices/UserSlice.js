import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',

    initialState: {
        loading: false,
        user: {},
        users: [],
        error: null,
        isUserUpdated: false,
        isUserDeleted: false,
    },

    reducers: {

        // ALL USERS
        usersRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },

        usersSuccess(state, action) {
            return {
                ...state,
                loading: false,
                users: action.payload.users
            }
        },

        usersFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },

        // SINGLE USER
        userRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },

        userSuccess(state, action) {
            return {
                ...state,
                loading: false,
                user: action.payload.user
            }
        },

        userFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },

        // DELETE USER
        deleteUserRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },

        deleteUserSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isUserDeleted: true
            }
        },

        deleteUserFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },

        // UPDATE USER
        updateUserRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },

        updateUserSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isUserUpdated: true
            }
        },

        updateUserFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },

        clearUserDeleted(state, action) {
            return {
                ...state,
                isUserDeleted: false
            }
        },

        clearUserUpdated(state, action) {
            return {
                ...state,
                isUserUpdated: false
            }
        },

        clearError(state, action) {
            return {
                ...state,
                error: null
            }
        }

    }
})

const { actions, reducer } = userSlice

export const {
    usersRequest,
    usersSuccess,
    usersFail,

    userRequest,
    userSuccess,
    userFail,

    deleteUserRequest,
    deleteUserSuccess,
    deleteUserFail,

    updateUserRequest,
    updateUserSuccess,
    updateUserFail,

    clearUserDeleted,
    clearUserUpdated,
    clearError

} = actions

export default reducer