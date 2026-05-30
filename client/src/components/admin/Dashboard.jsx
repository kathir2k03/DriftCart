import { Fragment, useEffect } from "react";
import Sidebar from "./Sidebar";
import MetaData from "../layouts/MetaData";
import { useDispatch, useSelector } from 'react-redux'
import { getAdminProducts } from "../../actions/productActions";
import { adminOrders as adminOrdersAction } from "../../actions/orderActions";
import { getUsers } from "../../actions/userActions";
import { Link } from "react-router-dom";

function Dashboard() {
  const { products = [] } = useSelector((state) => state.productsState)
  const { adminOrders = [] } = useSelector((state) => state.orderState)
  const { users = [] } = useSelector((state) => state.userState)
  const dispatch = useDispatch()

  let outOfStock = 0
  products.forEach((product) => {
    if (product.stock === 0) outOfStock++
  })

  let totalAmount = 0
  adminOrders.forEach((order) => {
    totalAmount += order.totalPrice
  })

  useEffect(() => {
    dispatch(getAdminProducts())
    dispatch(adminOrdersAction())
    dispatch(getUsers())
  }, [dispatch])

  return (
    <Fragment>
      <MetaData title={'Dashboard'} />

      <div className="admin-layout">

        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <div className="admin-content">
          <h1 className="my-4">Dashboard</h1>

          {/* Total Amount */}
          <div className="row mb-3">
            <div className="col-12">
              <div className="card text-white bg-primary o-hidden h-100">
                <div className="card-body">
                  <div className="text-center card-font-size">
                    Total Amount<br />
                    <b>₹{totalAmount}</b>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="row">

            <div className="col-xl-3 col-sm-6 col-6 mb-3">
              <div className="card text-white bg-success o-hidden h-100">
                <div className="card-body">
                  <div className="text-center card-font-size">
                    Products<br /><b>{products.length}</b>
                  </div>
                </div>
                <Link className="card-footer text-white clearfix small z-1" to="/admin/products">
                  <span className="float-left">View Details</span>
                  <span className="float-right"><i className="fa fa-angle-right" /></span>
                </Link>
              </div>
            </div>

            <div className="col-xl-3 col-sm-6 col-6 mb-3">
              <div className="card text-white bg-danger o-hidden h-100">
                <div className="card-body">
                  <div className="text-center card-font-size">
                    Orders<br /><b>{adminOrders.length}</b>
                  </div>
                </div>
                <Link className="card-footer text-white clearfix small z-1" to="/admin/orders">
                  <span className="float-left">View Details</span>
                  <span className="float-right"><i className="fa fa-angle-right" /></span>
                </Link>
              </div>
            </div>

            <div className="col-xl-3 col-sm-6 col-6 mb-3">
              <div className="card text-white bg-info o-hidden h-100">
                <div className="card-body">
                  <div className="text-center card-font-size">
                    Users<br /><b>{users.length}</b>
                  </div>
                </div>
                <Link className="card-footer text-white clearfix small z-1" to="/admin/users">
                  <span className="float-left">View Details</span>
                  <span className="float-right"><i className="fa fa-angle-right" /></span>
                </Link>
              </div>
            </div>

            <div className="col-xl-3 col-sm-6 col-6 mb-3">
              <div className="card text-white bg-warning o-hidden h-100">
                <div className="card-body">
                  <div className="text-center card-font-size">
                    Out Of Stock<br /><b>{outOfStock}</b>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Dashboard