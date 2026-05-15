import { Fragment } from "react/jsx-runtime"
import MetaData from "../layouts/MetaData"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { countries } from 'countries-list'
import { useNavigate } from "react-router-dom"
import { saveShippingInfo } from "../../slices/cartSlice"
import { toast } from 'react-toastify'
import CheckoutSteps from "./CheckoutSteps"

export const validateShipping = (shippingInfo, navigate) => {

    if (
        !shippingInfo.address ||
        !shippingInfo.city ||
        !shippingInfo.state ||
        !shippingInfo.country ||
        !shippingInfo.phoneNo ||
        !shippingInfo.postalCode
    ) {
        toast.error("Please fill the shipping information")
        navigate('/shipping')
        return false
    }
    return true
}

const Shipping = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { shippingInfo } = useSelector(state => state.cartState)
    const [address, setAddress] = useState(shippingInfo.address || "")
    const [city, setCity] = useState(shippingInfo.city || "")
    const [phoneNo, setPhoneNO] = useState(shippingInfo.phoneNo || "")
    const [postalCode, setPostalCode] = useState(shippingInfo.postalCode || "")
    const [state, setSate] = useState(shippingInfo.state || "")
    const [country, setCountry] = useState(shippingInfo.country || "")

    const countryList = Object.values(countries)

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingInfo({ address, city, phoneNo, postalCode, state, country }))
        navigate('/order/confirm')
    }

    return (
        <Fragment>
            <MetaData title={"Shipping"} />
            <CheckoutSteps shipping={true} />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-4">Shipping Info</h1>
                        <div className="form-group">
                            <label htmlFor="address_field">Address</label>
                            <input
                                type="text"
                                id="address_field"
                                className="form-control"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="city_field">City</label>
                            <input
                                type="text"
                                id="city_field"
                                className="form-control"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone_field">Phone No</label>
                            <input
                                type="number"
                                id="phone_field"
                                className="form-control"
                                value={phoneNo}
                                onChange={(e) => setPhoneNO(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="postal_code_field">Postal Code</label>
                            <input
                                type="number"
                                id="postal_code_field"
                                className="form-control"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="state">State</label>
                            <input
                                type="text"
                                id="state"
                                className="form-control"
                                value={state}
                                onChange={(e) => setSate(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="country_field">Country</label>
                            <select
                                id="country_field"
                                className="form-control"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                required
                            >
                                {countryList.map((country, index) => (
                                    <option key={index} value={country?.name}>
                                        {country?.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button
                            id="shipping_btn"
                            type="submit"
                            className="btn btn-block py-3"
                        >
                            CONTINUE
                        </button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default Shipping