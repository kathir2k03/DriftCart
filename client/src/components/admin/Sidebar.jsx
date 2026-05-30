import { Fragment, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaTachometerAlt, FaBoxOpen, FaShoppingBasket,
         FaPlus, FaClipboardList, FaUsers, FaStar, FaBars, FaChevronDown } from "react-icons/fa";

function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);
    const [productOpen, setProductOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const isActive = (path) => location.pathname === path;

    const handleProductClick = () => {
        if (collapsed) setCollapsed(false);
        setProductOpen(prev => !prev);
    };

    return (
        <Fragment>
            {/* Mobile overlay */}
            {mobileOpen && (
                <div
                    className="sidebar-overlay"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Mobile toggle button */}
            <button
                className="sidebar-mobile-toggle"
                onClick={() => setMobileOpen(prev => !prev)}
                aria-label="Toggle menu"
            >
                <FaBars />
            </button>

            <div className={`sidebar-wrapper ${mobileOpen ? 'mobile-open' : ''}`}>
                <nav id="sidebar" className={collapsed ? 'collapsed' : ''}>

                    <div className="sidebar-header">
                        <span className="sidebar-logo">Admin Panel</span>
                        <button
                            className="sidebar-toggle-btn"
                            onClick={() => setCollapsed(prev => !prev)}
                            aria-label="Collapse sidebar"
                        >
                            <FaBars />
                        </button>
                    </div>

                    <ul className="list-unstyled components">

                        <li className={isActive('/admin/dashboard') ? 'active' : ''}>
                            <Link to="/admin/dashboard" onClick={() => setMobileOpen(false)}>
                                <FaTachometerAlt className="sidebar-icon" />
                                <span className="sidebar-label">Dashboard</span>
                            </Link>
                        </li>

                        <li>
                            <div
                                className="sidebar-dropdown-toggle"
                                onClick={handleProductClick}
                            >
                                <FaBoxOpen className="sidebar-icon" />
                                <span className="sidebar-label">Product</span>
                                <FaChevronDown
                                    className={`sidebar-chevron ${productOpen ? 'open' : ''}`}
                                />
                            </div>
                            <ul className={`sidebar-submenu ${productOpen && !collapsed ? 'open' : ''}`}>
                                <li>
                                    <Link to="/admin/products" onClick={() => setMobileOpen(false)}>
                                        <FaShoppingBasket className="sidebar-icon" />
                                        <span className="sidebar-label">All</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/admin/products/create" onClick={() => setMobileOpen(false)}>
                                        <FaPlus className="sidebar-icon" />
                                        <span className="sidebar-label">Create</span>
                                    </Link>
                                </li>
                            </ul>
                        </li>

                        <li className={isActive('/admin/orders') ? 'active' : ''}>
                            <Link to="/admin/orders" onClick={() => setMobileOpen(false)}>
                                <FaClipboardList className="sidebar-icon" />
                                <span className="sidebar-label">Orders</span>
                            </Link>
                        </li>

                        <li className={isActive('/admin/users') ? 'active' : ''}>
                            <Link to="/admin/users" onClick={() => setMobileOpen(false)}>
                                <FaUsers className="sidebar-icon" />
                                <span className="sidebar-label">Users</span>
                            </Link>
                        </li>

                        <li className={isActive('/admin/reviews') ? 'active' : ''}>
                            <Link to="/admin/reviews" onClick={() => setMobileOpen(false)}>
                                <FaStar className="sidebar-icon" />
                                <span className="sidebar-label">Reviews</span>
                            </Link>
                        </li>

                    </ul>
                </nav>
            </div>
        </Fragment>
    );
}

export default Sidebar;