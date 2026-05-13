import { Fragment, useEffect, useState } from "react"
import MetaData from "../layouts/MetaData"
import { useDispatch, useSelector } from "react-redux"
import { resetPassword } from "../../actions/userActions"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { clearAuthError } from "../../slices/authSlice"


const NewPassword = () => {

    const {token} = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {loading, isAuthenticated, error} = useSelector(state => state.authState)
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    
    function submitHandler(e){
        e.preventDefault()
        const formData = new FormData()
        formData.append('password', password)
        formData.append('confirmPassword', confirmPassword)
        dispatch(resetPassword(formData, token))
    }

    useEffect(() => {

        if(isAuthenticated){
            toast.success("Password Changed Successfully")
            navigate('/')
        }
        if(error) {
            toast.error(error)
            dispatch(clearAuthError())
        }
    },[isAuthenticated, error, dispatch, navigate])

    return (
        <Fragment>
            <MetaData title={"New Password"} />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-3">New Password</h1>

                        <div className="form-group">
                            <label htmlFor="password_field">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirm_password_field">Confirm Password</label>
                            <input
                                type="password"
                                id="confirm_password_field"
                                className="form-control"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        <button
                            id="new_password_button"
                            type="submit"
                            className="btn btn-block py-3" disabled={loading}>
                            Set Password
                        </button>

                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default NewPassword