import './App.css'
import Home from './components/Home'
import Footer from './components/layouts/Footer'
import Header from './components/layouts/Header'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ToastContainer} from 'react-toastify'
import ProductDetail from './components/product/ProductDetail'

function App() {

  const route = createBrowserRouter([
  { path: '/', element:       <>
        
        <Home />
       
      </>},
  { path: '/product-detail/:id', element: <ProductDetail/> },
  // { path: '*', element: <Footer/> }
])

  return (
    <div className='App'>
      <HelmetProvider>
        <Header />
        <div className="container container-fluid">
          
        <ToastContainer theme='dark'/>
        <RouterProvider router={route} />
         <Footer />
        </div>
      </HelmetProvider>
    </div>
  )
}

export default App
