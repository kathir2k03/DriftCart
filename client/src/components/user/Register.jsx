import { Fragment, useEffect, useState } from "react"
import MetaData from "../layouts/MetaData"
import { useDispatch, useSelector } from "react-redux"
import { register } from "../../actions/userActions"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

function Register(){

    const navigate = useNavigate()
    const [userData, setUserData] = useState({
        name : "",
        email : "",
        password : "",
    })

    const [avatar, setAvatar] = useState("")
    const [avatarPreview, setAvatarPreview] = useState("/images/default_avatar.webp")

    const dispatch = useDispatch()
    const {loading, error, isAuthenticated} = useSelector(state => state.authState)
    const onChange = (e) => {
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
        else {
        setUserData({...userData, [e.target.name] : e.target.value})    
        } 
    }

    function submitHandler(e){
        e.preventDefault()

        const myForm = new FormData() // creating class

        myForm.append("name", userData.name) // appending the datas
        myForm.append("email", userData.email)
        myForm.append("password", userData.password)
        if(avatar){
        myForm.append("avatar", avatar)
        }   

        dispatch(register(myForm))
    }

    useEffect(() => {

        if (isAuthenticated) {
            navigate('/')
        }
        if (error) {
         toast.error(error)
        }
        
    },[error, isAuthenticated, navigate])

    return(
        <Fragment>
        <MetaData title={"Register"} />
        <div className="row wrapper">
		<div className="col-10 col-lg-5">
        <form className="shadow-lg" encType='multipart/form-data' onSubmit={submitHandler}>
            <h1 className="mb-3">Register</h1>

          <div className="form-group">
            <label htmlFor="email_field">Name</label>
            <input type="name" name="name" 
            onChange={onChange} id="name_field" 
            className="form-control"
             value={userData.name} />
          </div>

            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field" name="email"
                onChange={onChange}
                className="form-control"
                value={userData.email}
              />
            </div>
  
            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password" name="password"
                onChange={onChange}
                id="password_field"
                className="form-control"
                value={userData.password}
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
                              alt='image'
                          />
                      </figure>
                  </div>
                  <div className='custom-file'>
                      <input
                          type='file'
                          name='avatar'
                          onChange={onChange}
                          className='custom-file-input'
                          id='customFile'
                      />
                      <label className='custom-file-label' htmlFor='customFile'>
                          Choose Avatar
                      </label>
                  </div>
              </div>
          </div>
  
            <button
              id="register_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading}
            >
              REGISTER
            </button>
          </form>
		  </div>
    </div>            
        </Fragment>
    )
}

export default Register