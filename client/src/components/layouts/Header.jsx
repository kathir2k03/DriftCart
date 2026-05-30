import React from "react"
import Search from "./Search"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { Dropdown, Image } from 'react-bootstrap'
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
    <nav
      className="header-navbar sticky-top"
      style={{
        backgroundColor: '#030303',
        padding: '0.6rem 1rem',
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',       
        gap: '8px',
      }}
    >

      {/* LOGO — order 1 */}
      <div style={{ flexShrink: 0, order: 1 }}>
        <Link to={'/'}>
          <img className="logo-img" src="/images/logo.jpeg" alt="logo" />
        </Link>
      </div>

      {/* SEARCH — desktop middle, order 2 on desktop */}
      {!isAdminRoute && (
        <div
          className="d-none d-md-flex"
          style={{
            flex: 1,
            minWidth: 0,
            justifyContent: 'center',
            padding: '0 10px',
            order: 2
          }}
        >
          <div style={{ width: '100%', maxWidth: '500px' }}>
            <Search />
          </div>
        </div>
      )}

      {/* RIGHT SIDE — order 2 on mobile (sits next to logo), order 3 on desktop */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          flexShrink: 0,
          marginLeft: 'auto',
          order: 2        
        }}
      >
        {isAuthenticated ? (
          <Dropdown align="end">
            <Dropdown.Toggle
              variant="default"
              id="dropdown-basic"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: '#fff',
                background: 'none',
                border: 'none',
                padding: '0',
                maxWidth: '160px'
              }}
            >
              <figure className="avatar avatar-nav" style={{ margin: 0, flexShrink: 0 }}>
                <Image
                  src={user?.avatar ?? '/images/default_avatar.webp'}
                  style={{ width: '34px', height: '34px', borderRadius: '50%', objectFit: 'cover' }}
                />
              </figure>
              <span
                style={{
                  color: '#fff',
                  maxWidth: '90px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  display: 'inline-block',
                  fontSize: '14px',
                  verticalAlign: 'middle'
                }}
                title={user?.name}
              >
                {user?.name}
              </span>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {user?.role === 'admin' && (
                <Dropdown.Item onClick={() => navigate('admin/dashboard')} className="text-dark">
                  Dashboard
                </Dropdown.Item>
              )}
              <Dropdown.Item onClick={() => navigate('/myprofile')} className="text-dark">Profile</Dropdown.Item>
              <Dropdown.Item onClick={() => navigate('/orders')} className="text-dark">Orders</Dropdown.Item>
              <Dropdown.Item onClick={logoutHandler} className="text-danger">Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <Link to={'/login'} className="btn login-btn" id="login_btn">Login</Link>
        )}

        <Link to={'/cart'} style={{ display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}>
          <span id="cart" style={{ color: '#fff', fontSize: '1rem' }}>Cart</span>
          <span id="cart_count">{cartItems?.length}</span>
        </Link>
      </div>

      {/* SEARCH — mobile only, full width row below logo+name — order 3 */}
      {!isAdminRoute && (
        <div
          className="d-flex d-md-none"
          style={{
            order: 3,         
            width: '100%',    
            paddingTop: '4px'
          }}
        >
          <Search />
        </div>
      )}

    </nav>
  )
}

export default Header