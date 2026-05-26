import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";

import {
    FaTachometerAlt,
    FaBoxOpen,
    FaShoppingBasket,
    FaPlus,
    FaClipboardList,
    FaUsers,
    FaStar
} from "react-icons/fa";

function Sidebar() {

    const navigate = useNavigate()

    return (
        <Fragment>

            <div className="sidebar-wrapper">

                <nav id="sidebar">

                    <ul className="list-unstyled components">

                        <li>
                            <Link to={'/admin/dashboard'}>
                                <FaTachometerAlt style={{ marginRight: '10px' }} />
                                Dashboard
                            </Link>
                        </li>

                        <li>

                            <NavDropdown
                                title={
                                    <span>
                                        <FaBoxOpen style={{ marginRight: '10px' }} />
                                        Product
                                    </span>
                                }
                            >

                                <NavDropdown.Item
                                    onClick={() => navigate('/admin/products')}
                                >
                                    <FaShoppingBasket style={{ marginRight: '10px' }} />
                                    All
                                </NavDropdown.Item>

                                <NavDropdown.Item
                                    onClick={() => navigate('/admin/products/create')}
                                >
                                    <FaPlus style={{ marginRight: '10px' }} />
                                    Create
                                </NavDropdown.Item>

                            </NavDropdown>

                        </li>

                        <li>
                            <Link to={'/admin/orders'}>
                                <FaClipboardList style={{ marginRight: '10px' }} />
                                Orders
                            </Link>
                        </li>

                        <li>
                            <Link to={'/admin/users'}>
                                <FaUsers style={{ marginRight: '10px' }} />
                                Users
                            </Link>
                        </li>

                        <li>
                            <Link to={'/admin/reviews'}>
                                <FaStar style={{ marginRight: '10px' }} />
                                Reviews
                            </Link>
                        </li>

                    </ul>

                </nav>

            </div>

        </Fragment>
    )
}

export default Sidebar