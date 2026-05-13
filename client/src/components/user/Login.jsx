import { Fragment, useEffect, useState } from "react";
import MetaData from "../layouts/MetaData";
import { login } from "../../actions/userActions"
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom"

function Login() {

    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const { loading, error, isAuthenticated } = useSelector(state => state.authState)

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    useEffect(() => {
        if(isAuthenticated){
            navigate('/')
        }

        if (error) {
            toast.error(error);
        }
    }, [error, isAuthenticated]);

    return (
        <Fragment>
            <MetaData title={"Login"} />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg pb-5" onSubmit={submitHandler}>
                        <h1 className="mb-3">Login</h1>
                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                id="email_field"
                                className="form-control"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password_field">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                id="password_field"
                                className="form-control"
                            />
                        </div>

                        <Link to="/forgot-password" className="float-right mb-4">
                            Forgot Password?
                        </Link>

                        <button id="login_button" type="submit" className="btn btn-block py-3" disabled={loading}>
                            LOGIN
                        </button>

                        <Link to="/register" className="float-right mt-3">
                            New User?
                        </Link>
                    </form>
                </div>
            </div>
        </Fragment>

    );
}

export default Login;
