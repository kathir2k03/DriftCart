import { Fragment, useEffect, useState } from "react";
import MetaData from "../layouts/MetaData";
import Sidebar from "./Sidebar";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
    getUser,
    updateUser
} from "../../actions/userActions";

import {
    clearError,
    clearUserUpdated
} from "../../slices/UserSlice";

import { toast } from "react-toastify";

const UpdateUser = () => {

    const { id:userId } = useParams()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')

    const {
        loading,
        error,
        user,
        isUserUpdated
    } = useSelector(state => state.userState)

    function submitHandler(e) {

        e.preventDefault()

        const formData = {
            name,
            email,
            role
        }

        dispatch(updateUser(userId, formData))
    }

    useEffect(() => {

        if (isUserUpdated) {

            toast.success("User Updated Successfully", {

                onOpen: () => dispatch(clearUserUpdated())

            })

            navigate('/admin/users')
        }

        if (error) {

            toast.error(error, {

                onOpen: () => dispatch(clearError())

            })
        }

        dispatch(getUser(userId))

    }, [dispatch, error, isUserUpdated, navigate, userId])

    useEffect(() => {

        if (user?._id) {

            setName(user?.name)
            setEmail(user?.email)
            setRole(user?.role)
        }

    }, [user])

    return (

        <Fragment>

            <MetaData title={"Update User"} />

            <div className="row">

                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">

                    <div className="wrapper my-5">

                        <form
                            className="shadow-lg"
                            onSubmit={submitHandler}
                        >

                            <h1 className="mb-4">
                                Update User
                            </h1>

                            {/* NAME */}
                            <div className="form-group">

                                <label htmlFor="name_field">
                                    Name
                                </label>

                                <input
                                    type="text"
                                    id="name_field"
                                    className="form-control"
                                    value={name}
                                    onChange={(e) =>
                                        setName(e.target.value)
                                    }
                                />

                            </div>

                            {/* EMAIL */}
                            <div className="form-group">

                                <label htmlFor="email_field">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    id="email_field"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                />

                            </div>

                            {/* ROLE */}
                            <div className="form-group">

                                <label htmlFor="role_field">
                                    Role
                                </label>

                                <select
                                    id="role_field"
                                    className="form-control"
                                    value={role}
                                    onChange={(e) =>
                                        setRole(e.target.value)
                                    }
                                >

                                    <option value="">
                                        Select
                                    </option>

                                    <option value="user">
                                        User
                                    </option>

                                    <option value="admin">
                                        Admin
                                    </option>

                                </select>

                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="btn btn-block py-3"
                                id="login_button"
                            >
                                UPDATE
                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </Fragment>

    )
}

export default UpdateUser