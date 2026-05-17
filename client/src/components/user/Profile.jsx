import { Fragment } from "react"
import MetaData from "../layouts/MetaData"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const Profile = () => {
    const { user } = useSelector(state => state.authState)
    return(
        <Fragment>
            <MetaData title={"Profile"}></MetaData>
        <div className="row justify-content-around mt-5 user-info">
            <div className="col-12 col-md-3">
                <figure className='avatar avatar-profile'>
                    <img className="rounded-circle img-fluid" src={user?.avatar??'./images/default_avatar.webp'} alt='' />
                </figure>
                <Link to="/myprofile/update" id="edit_profile" className="btn btn-primary btn-block my-5">
                    Edit Profile
                </Link>
            </div>
     
            <div className="col-12 col-md-5">
                 <h4>Full Name</h4>
                 <p>{user?.name}</p>
     
                 <h4>Email Address</h4>
                 <p>{user?.email}</p>

                 <h4>Joined</h4>
                 <p>{String(user?.createdAt).substring(0,10)}</p>

                 <Link to="/orders" className="btn btn-danger btn-block mt-5">
                    My Orders
                </Link>

                <Link to="/myprofile/resetpassword" className="btn btn-primary btn-block mt-3">
                    Change Password
                </Link>
            </div>
        </div>            
        </Fragment>
    )
}

export default Profile