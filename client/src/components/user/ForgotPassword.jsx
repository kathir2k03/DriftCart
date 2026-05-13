import { Fragment, useEffect, useState } from "react"
import MetaData from "../layouts/MetaData"
import { useDispatch, useSelector } from "react-redux"
import { forgotPassword } from "../../actions/userActions"
import { toast } from "react-toastify"
import { clearAuthError } from "../../slices/authSlice"

const ForgotPassword = () => {

    const dispatch = useDispatch()
    const [email, setEmail] = useState("")
    const {loading, error, user, message} = useSelector(state => state.authState)

    function submitHandler(e) {
        e.preventDefault()
        const formData = new FormData()
        formData.append('email', email)
        dispatch(forgotPassword(formData))
    }

    useEffect(() => {
        if(message){
            toast.success(message)
        }
        setEmail('')
        if(error) {
            toast.error(error)
            dispatch(clearAuthError())
        }
    }, [message, error, dispatch])

    return(
        <Fragment>
            <MetaData title={"Forgot Password"}/>
		<div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form onSubmit={submitHandler} className="shadow-lg">
                        <h1 className="mb-3">Forgot Password</h1>
                        <div className="form-group">
                            <label htmlFor="email_field">Enter Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <button
                            id="forgot_password_button"
                            type="submit"
                            className="btn btn-block py-3">
                            Send Email
                    </button>

                    </form>
                </div>
            </div>            
        </Fragment>
    )
}

export default ForgotPassword