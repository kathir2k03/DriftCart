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
          path : '/register',
          element : <Register />
        },     
        {
          path: '/product-detail/:id',
          element: <ProductDetail />
        },
        {
          path : '/search/:keyword',
          element : <ProductSearch/>
        },
        {
          path : '*',
          element : <ErrorPage/>
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