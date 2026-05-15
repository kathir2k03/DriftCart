import { Fragment } from "react"
import MetaData from "../layouts/MetaData"
import { Link } from "react-router-dom"

const CheckoutSteps = ({shipping, confirmOrder, payment}) => {

    return(
        <Fragment>
    <div className="checkout-progress d-flex justify-content-center mt-5">
        {shipping ? 
        <Link to={'/shipping'}>
        <div className="triangle2-activate"></div>
        <div className="step activate-step">Shipping Info</div>
        <div className="triangle-activate"></div>
        </Link>
        :
        <Link to={'/shipping'}>
        <div className="triangle2-incomplete"></div>
        <div className="step incomplete">Shipping Info</div>
        <div className="triangle-incomplete"></div>
        </Link>        
    }


        {confirmOrder ? 
        <Link to={'/order/confirm'}>
        <div className="triangle2-activate"></div>
        <div className="step activate-step">Confirm Order</div>
        <div className="triangle-activate"></div>
        </Link>
        :
        <Link to={'/order/confirm'}>
        <div className="triangle2-incomplete"></div>
        <div className="step incomplete">Confirm Order</div>
        <div className="triangle-incomplete"></div>
        </Link>        
    }

        {payment ? 
        <Link to={'/payment'}>
        <div className="triangle2-activate"></div>
        <div className="step activate-step">Payment</div>
        <div className="triangle-activate"></div>
        </Link>
        :
        <Link to={'/payment'}>
        <div className="triangle2-incomplete"></div>
        <div className="step incomplete">Payment</div>
        <div className="triangle-incomplete"></div>
        </Link>        
    }
      </div>            
        </Fragment>
    )
}

export default CheckoutSteps