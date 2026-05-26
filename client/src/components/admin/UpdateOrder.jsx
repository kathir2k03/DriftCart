import { Fragment, useEffect, useState } from "react";
import MetaData from "../layouts/MetaData";
import Sidebar from "./Sidebar";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { orderDetail as orderDetailAction, updateOrder } from "../../actions/orderActions";
import { clearError, clearOrderUpdated } from "../../slices/orderSlice";

import { toast } from "react-toastify";

const UpdateOrder = () => {

    const { id: orderId } = useParams()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [orderStatus, setOrderStatus] = useState("Processing")

    const {
        loading,
        error,
        orderDetail,
        isOrderUpdated
    } = useSelector(state => state.orderState)
const order = orderDetail || {}

const {
    user = {},
    orderItems = [],
    shippingInfo = {},
    totalPrice = 0,
    paymentInfo = {}
} = order 

    const isPaid = paymentInfo?.status === 'succeeded' ? true : false;
    
    useEffect(() => {

        if (isOrderUpdated) {

            toast.success("Order Updated Successfully")

            dispatch(clearOrderUpdated())

            navigate('/admin/orders')
        }

        if (error) {

            toast.error(error)

            dispatch(clearError())
        }

        dispatch(orderDetailAction(orderId))

    }, [dispatch, error, isOrderUpdated, orderId, navigate])

    useEffect(() => {

        if (orderDetail) {
            setOrderStatus(orderDetail.orderStatus)
        }

    }, [orderDetail])

    function submitHandler(e) {

        e.preventDefault()

        const orderData = {
            orderStatus
        }

        dispatch(updateOrder(orderId, orderData))
    }

    return (
        <Fragment>

            <MetaData title={"Update Order"} />

            <div className="row">

                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">

<div className=" my-5">
    
    <div className="row">

        {/* LEFT SIDE - ORDER DETAILS */}
        <div className="col-12 col-lg-8 mb-4">

            <div className="shadow-lg p-4">

                <h3 className="mb-4">Shipping Info</h3>

                <p>
                    <b>Name:</b> {user.name}
                </p>

                <p>
                    <b>Phone:</b> {shippingInfo.phoneNo}
                </p>

                <p>
                    <b>Address:</b>{" "}
                    {shippingInfo.address},{" "}
                    {shippingInfo.city},{" "}
                    {shippingInfo.state},{" "}
                    {shippingInfo.postalCode},{" "}
                    {shippingInfo.country}
                </p>

                <hr />

                {/* PAYMENT INFO */}
                <h3 className="my-4">Payment Info</h3>

                <p className={isPaid ? "text-success" : "text-danger"}>
                    <b>{isPaid ? "PAID" : "NOT PAID"}</b>
                </p>

                <p>
                    <b>Total Amount:</b> ₹{totalPrice}
                </p>

                <hr />

                {/* ORDER STATUS */}
                <h3 className="my-4">Order Status</h3>

                <p
                    className={
                        orderDetail?.orderStatus === "Delivered"
                            ? "text-success"
                            : "text-danger"
                    }
                >
                    <b>{orderDetail?.orderStatus}</b>
                </p>

                <hr />

                {/* ORDER ITEMS */}
                <h3 className="my-4">Order Items</h3>

                {
                    orderItems.map(item => (

                        <div
                            key={item._id}
                            className="row align-items-center mb-3"
                        >

                            <div className="col-3 col-md-2">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="img-fluid"
                                />
                            </div>

                            <div className="col-5 col-md-6">
                                {item.name}
                            </div>

                            <div className="col-4 col-md-4">
                                {item.quantity} x ₹{item.price}
                            </div>

                        </div>

                    ))
                }

            </div>

        </div>

        {/* RIGHT SIDE - UPDATE FORM */}
        <div className="col-12 col-lg-4">

            <div className="shadow-lg p-4">

                <h3 className="mb-4">Update Order</h3>

                <form onSubmit={submitHandler}>

                    <div className="form-group mb-3">

                        <label>Order Status</label>

                        <select
                            className="form-control"
                            value={orderStatus}
                            onChange={(e) =>
                                setOrderStatus(e.target.value)
                            }
                        >

                            <option value="">
                                Select Status
                            </option>

                            <option value="Processing">
                                Processing
                            </option>

                            <option value="Shipped">
                                Shipped
                            </option>

                            <option value="Delivered">
                                Delivered
                            </option>

                        </select>

                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary w-100 py-2"
                    >
                        UPDATE
                    </button>

                </form>

            </div>

        </div>

    </div>

</div>

                </div>

            </div>

        </Fragment>
    )
}

export default UpdateOrder