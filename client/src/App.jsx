import './App.css'
import Home from './components/Home'
import Footer from './components/layouts/Footer'
import Header from './components/layouts/Header'
import ErrorPage from './components/layouts/ErrorPage'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from 'react-router-dom'

import { HelmetProvider } from 'react-helmet-async'
import { ToastContainer } from 'react-toastify'
import ProductDetail from './components/product/ProductDetail'
import ProductSearch from './components/product/ProductSearch'
import Login from './components/user/Login'
import Register from './components/user/Register'
import { useEffect, useMemo, useState } from 'react'
import store from './store'
import { loadUser } from './actions/userActions'
import Profile from './components/user/Profile'
import ProtectedRoute from './components/route/ProtectedRoute'
import UpdateProfile from './components/user/UpdateProfile'
import ChangePassword from './components/user/ChangePassword'
import ForgotPassword from './components/user/ForgotPassword'
import NewPassword from './components/user/NewPassword'
import Cart from './components/cart/Cart'
import Shipping from './components/cart/Shipping'
import ConfirmOrder from './components/cart/ConfirmOrder'
import Payment from './components/cart/Payment'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
import OrderSuccess from './components/cart/OrderSuccess'
import UserOrders from './components/order/UserOrders'
import OrderDetail from './components/order/OrderDetail'


function Layout() {
  return (
    <>
      <Header />

      <div className="container container-fluid">
        <ToastContainer theme='dark' />

        <Outlet />
      </div>

      <Footer />
    </>
  )
}

function App() {

  const [stripeApiKey, setStripeApiKey] = useState(null)
  const [stripePromise, setStripePromise] = useState(null);
  useEffect(() => {
    store.dispatch(loadUser());

    async function getStripeKey() {
      try {
        const { data } = await axios.get('/api/v1/stripeapi');

        setStripeApiKey(data.stripeApiKey);
        setStripePromise(loadStripe(data.stripeApiKey));
      } catch (err) {
        console.log(err);
      }
    }

    getStripeKey();
  }, []);

  const route = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/login',
          element: <Login />
        },
        {
          path: '/register',
          element: <Register />
        },
        {
          path: '/forgot-password',
          element: <ForgotPassword />
        },
        {
          path: '/forgot-password/:token',
          element: <NewPassword />
        },
        {
          path: '/myprofile',
          element: <ProtectedRoute><Profile /></ProtectedRoute>
        },
        {
          path: '/myprofile/update',
          element: <ProtectedRoute><UpdateProfile /></ProtectedRoute>
        },
        {
          path: "/myprofile/resetpassword",
          element: <ProtectedRoute><ChangePassword /></ProtectedRoute>
        },
        {
          path: '/product-detail/:id',
          element: <ProductDetail />
        },
        {
          path: '/search/:keyword',
          element: <ProductSearch />
        },
        {
          path: '/cart',
          element: <Cart />
        },
        {
          path: '/shipping',
          element: <ProtectedRoute><Shipping /></ProtectedRoute>
        },
        {
          path: '/order/confirm',
          element: <ProtectedRoute><ConfirmOrder /></ProtectedRoute>
        },
        {
          path: '/payment',
          element: (
            <ProtectedRoute>
              {stripePromise ? (
                <Elements stripe={stripePromise}>
                  <Payment />
                </Elements>
              ) : (
                <p>Loading payment...</p>
              )}
            </ProtectedRoute>
          )
        },
        {
          path: '/order/success',
          element: <ProtectedRoute><OrderSuccess /></ProtectedRoute>
        },
        {
          path: '/orders',
          element: <ProtectedRoute><UserOrders /></ProtectedRoute>
        },
        {
          path: '/order/:id',
          element: <ProtectedRoute><OrderDetail /></ProtectedRoute>
        },
        {
          path: '*',
          element: <ErrorPage />
        }
      ]
    }
  ])

  return (
    <div className='App'>
      <HelmetProvider>
        <RouterProvider router={route} />
      </HelmetProvider>
    </div>
  )
}

export default App