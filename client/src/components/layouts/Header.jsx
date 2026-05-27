import React, { useEffect } from "react"
import Search from "./Search"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { DropdownButton, Dropdown, Image } from 'react-bootstrap'
import { logout } from "../../actions/userActions"

function Header() {
  const location = useLocation()
  const isAdminRoute = location.pathname.includes('/admin')
  const { isAuthenticated, user } = useSelector(state => state.authState)
  const { items: cartItems } = useSelector(state => state.cartState)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  function logoutHandler() {
    dispatch(logout())
  }

  return (
    <nav className="navbar row align-items-center justify-content-between sticky-top header-navbar">
      <div className="col-2 md:col-3">
        <div className="navbar-brand">
          <Link to={'/'}><img className="cursor-pointer logo-img" src="/images/logo.jpeg" /></Link>
        </div>
      </div>
      <div className="col-8 col-md-4 col-lg-3 mt-2 mt-md-0 text-end order-2 order-md-3">
        {isAuthenticated ?
          <Dropdown className="d-inline">
            <Dropdown.Toggle variant="default text-white pr-5" id='dropdown-basic'>
              <figure className="avatar avatar-nav">
                <Image width="50px" src={user.avatar ?? './images/default_avatar.webp'}></Image>
              </figure>
              <span className="d-inline-block text-truncate align-middle"
                style={{ maxWidth: '100px' }}
                title={user.name}
              >
                {user.name}
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {user.role == "admin" && <Dropdown.Item onClick={() => { navigate('admin/dashboard') }} className="text-dark">Dashboard</Dropdown.Item>}
              <Dropdown.Item onClick={() => { navigate('/myprofile') }} className="text-dark">Profile</Dropdown.Item>
              <Dropdown.Item onClick={() => { navigate('/orders') }} className="text-dark">Orders</Dropdown.Item>
              <Dropdown.Item onClick={logoutHandler} className="text-danger">Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          :
          <Link to={'/login'} className="btn login-btn" id="login_btn">Login</Link>
        }

        <Link to={'/cart'}><span id="cart" className="ml-1 md:ml-3">Cart</span></Link>
        <span className="ml-1" id="cart_count">{cartItems?.length}</span>
      </div>
      {
        !isAdminRoute && (
          <div className="col-12 col-md-5 col-lg-6 mt-2 mt-md-0 d-flex justify-content-center order-3 order-md-2">
            <div className="w-100 px-2 px-md-0">
              <Search />
            </div>
          </div>
        )
      }


    </nav>
  )
}

export default Header