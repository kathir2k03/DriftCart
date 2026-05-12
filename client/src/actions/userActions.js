import { loadUserFail, loadUserRequest, loadUserSuccess, loginFail, loginRequest, loginSuccess, logoutFail, logoutSuccess, registerFail, registerRequest, registerSuccess, updateProfileFail, updateProfileRequest, updateProfileSuccess } from "../slices/authSlice"
import axios from 'axios'

export const login = (email, password) => async(dispatch) => {
    try {
        dispatch(loginRequest())
        const { data } = await axios.post(`/api/v1/login`,{email, password})
        dispatch(loginSuccess(data))
    } catch (error) {
        dispatch(loginFail(error?.response?.data?.message || error.message))
    }
}

export const register = (userData) => async(dispatch) => {
    try {
        dispatch(registerRequest())
        const config = {
            headers : {
                'Content-Type' : 'multipart/form-data'
            }
        }
        const { data } = await axios.post(`/api/v1/register`,userData, config)
        dispatch(registerSuccess(data))
    } catch (error) {
        dispatch(registerFail(error?.response?.data?.message || error.message))
    }
}

export const loadUser = () => async(dispatch) => {
    try {
        dispatch(loadUserRequest())

        const { data } = await axios.get(`/api/v1/myprofile`)
        dispatch(loadUserSuccess(data))
    } catch (error) {
        dispatch(loadUserFail(error?.response?.data?.message || error.message))
    }
}

export const logout = () => async(dispatch) => {
    try {
        await axios.get(`/api/v1/logout`)
        dispatch(logoutSuccess())
    } catch (error) {
        dispatch(logoutFail(error?.response?.data?.message || error.message))
    }
}

export const updateProfile = (userData) => async(dispatch) => {
    try {
        dispatch(updateProfileRequest())
        const config = {
            headers : {
                'Content-Type' : 'multipart/form-data'
            }
        }
        const { data } = await axios.put(`/api/v1/myprofile/update`, userData, config)
        dispatch(updateProfileSuccess(data))
    } catch (error) {
        dispatch(updateProfileFail(error?.response?.data?.message || error.message))
    }
}
