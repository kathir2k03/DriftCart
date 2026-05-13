import { Fragment, useEffect, useState } from "react"
import MetaData from "../layouts/MetaData"
import { useDispatch, useSelector } from "react-redux"
import { updateProfile } from "../../actions/userActions"
import { toast } from "react-toastify"
import { clearAuthError, clearUpdateProfile } from "../../slices/authSlice"


const UpdateProfile = () => {

    const {error, user, isUpdated} = useSelector(state => state.authState)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [avatar, setAvatar] = useState("")
    const [avatarPreview, setAvatarPreview] = useState("./images/default_avatar.webp")
    const dispatch = useDispatch()

    function onchangeAvatar(e) {
        if(e.target.name === "avatar"){
            const reader = new FileReader() // this filereader work is take our choosed data

            reader.onload = () => { // after url set it will call one event so that is onload
                if(reader.readyState === 2) { // it have 2 state to read the url 
                    setAvatarPreview(reader.result) // and we will get the url in redaer.result
                    setAvatar(e.target.files[0])
                }
            }
            reader.readAsDataURL(e.target.files[0]) // it will take as URL with Binary code
        }
    }

    function submitHandler(e) {
        e.preventDefault()

        const myForm = new FormData() // creating class

        myForm.append("name", name) // appending the datas
        myForm.append("email", email)
        if(avatar){
        myForm.append("avatar", avatar)
        }   

        dispatch(updateProfile(myForm))        
    }

    useEffect(() => {
        if(user) {
            setName(user.name)
            setEmail(user.email)
            if(user.avatar){
                setAvatarPreview(user.avatar)
            }  
        }
        if(isUpdated){
            toast.success('Profile Updated Successfully',{
            onOpen : () => dispatch(clearUpdateProfile())
            })
        }
        if (error) {
         toast.error(error)
         dispatch(clearAuthError())
        }        
    }, [user, isUpdated, error, dispatch])
    return(
        <Fragment>
            <MetaData title={"Update Profile"}></MetaData>
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" encType='multipart/form-data' onSubmit={submitHandler}>
                        <h1 className="mt-2 mb-5">Update Profile</h1>

                        <div className="form-group">
                            <label htmlFor="email_field">Name</label>
                            <input 
								type="name" 
								id="name_field" 
								className="form-control"
                                name='name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                name='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='avatar_upload'>Avatar</label>
                            <div className='d-flex align-items-center'>
                                <div>
                                    <figure className='avatar mr-3 item-rtl'>
                                        <img
                                            src={avatarPreview}
                                            className='rounded-circle'
                                            alt='Avatar Preview'
                                        />
                                    </figure>
                                </div>
                                <div className='custom-file'>
                                    <input
                                        type='file'
                                        name='avatar'
                                        className='custom-file-input'
                                        id='customFile'
                                        onChange={onchangeAvatar}
                                    />
                                    <label className='custom-file-label' htmlFor='customFile'>
                                        Choose Avatar
                                </label>
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="btn update-btn btn-block mt-4 mb-3" >Update</button>
                    </form>
                </div>
            </div>
        </Fragment>
    )

}
export default UpdateProfile