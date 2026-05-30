import { Fragment } from "react/jsx-runtime"
import MetaData from "../layouts/MetaData"
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from "react-router-dom"
import { decreaseCartItemQty, increaseCartItemQty, removeItemFromCart } from '../../slices/cartSlice'
const Cart = () => {
    const dispatch = useDispatch()
    const { items } = useSelector(state => state.cartState)
    const navigate = useNavigate()

    const checkoutHandler = () => {
        navigate('/login?redirect=shipping')
    }

    const increaseQty = (product, quantity, stock) => {

        if (quantity >= stock) return;

        dispatch(increaseCartItemQty(product))
    }

    const decreaseQty = (product, quantity) => {

        if (quantity <= 1) return;

        dispatch(decreaseCartItemQty(product))
    }
    return (
        <Fragment>
            <MetaData title={"Cart"} />
            {items.length == 0 ? <h2 className="mt-5 text-center">Your Cart is Empty</h2> :
                <Fragment>
                    <h2 className="mt-5">Your Cart: <b>{items.length}</b></h2>
                    <div className="row d-flex justify-content-between">
                        <div className="col-12 col-lg-8">
                            {items.map((data) => (
                                <Fragment key={data.product}>
                                    <hr />
                                    <div className="cart-item">
                                        <div className="row">
                                            <div className="col-4 col-lg-3">
                                                <img src={data.image} alt={data.name} height="90" width="115" />
                                            </div>

                                            <div className="pl-4 col-5 col-lg-3">
                                                <Link to={`/product-detail/${data.product}`}>{data.name}</Link>
                                            </div>


                                            <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                <p id="card_item_price">₹{data.price}</p>
                                            </div>

                                            <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                <div className="stockCounter d-inline">

                                                    <span
                                                        className="btn btn-danger minus"
                                                        onClick={() => decreaseQty(data.product, data.quantity)}
                                                    >
                                                        -
                                                    </span>

                                                    <input
                                                        type="number"
                                                        className="form-control count d-inline"
                                                        value={data.quantity}
                                                        readOnly
                                                    />

                                                    <span
                                                        className="btn btn-primary plus"
                                                        onClick={() => increaseQty(data.product, data.quantity, data.stock)}
                                                    >
                                                        +
                                                    </span>

                                                </div>
                                            </div>

                                            <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                                                <i id="delete_cart_item" className="fa fa-trash btn btn-danger" onClick={() => dispatch(removeItemFromCart(data?.product))}></i>
                                            </div>

                                        </div>
                                    </div>
                                </Fragment>
                            ))}

                            <hr />
                        </div>

                        <div className="col-12 col-lg-3 my-4">
                            <div id="order_summary">
                                <h4>Order Summary</h4>
                                <hr />
                                <p>Subtotal:  <span className="order-summary-values">{items.reduce((acc, item) => (acc + item.quantity), 0)} (Units)</span></p>
                                <p>Est. total: <span className="order-summary-values">
                                    ₹{items.reduce((acc, item) => (
                                        acc + item.price * item.quantity
                                    ), 0)}
                                </span></p>

                                <hr />
                                <button id="checkout_btn" className="btn btn-primary btn-block" onClick={checkoutHandler}>Check out</button>
                            </div>
                        </div>
                    </div>
                </Fragment>

            }

        </Fragment>
    )
}

export default Cart