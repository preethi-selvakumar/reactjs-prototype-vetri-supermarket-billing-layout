import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

import vetriLogo from '../assets/images/profile.png';

// Icons
import homeIconBlack from '../assets/images/home-black.png';
import homeIconOrange from '../assets/images/Home.png';
import productsIconBlack from '../assets/images/Vector.png';
import productsIconOrange from '../assets/images/orange-product.png';

const Sidebar = () => {
    const {
        isSidebarOpen,
        toggleSidebar,
        goToHomePage,
        goToProductsPage,
    } = useAppContext();

    const location = useLocation();
    const currentPath = location.pathname;
    const isPaymentSummaryPage = currentPath === '/payment-summary';

    return (
        <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
            <button className="close-sidebar-button" onClick={toggleSidebar}>
                <AiOutlineClose />
            </button>

            <div className="logo-container">
                <div className="logo">
                    <img src={vetriLogo} alt="Vetri Market Logo" className="vetri-logo" />
                    <span>Vetri Market</span>
                </div>
            </div>

            <nav>
                <ul>
                    <li>
                        <a
                            href="#"
                            className={(currentPath === '/' && !isPaymentSummaryPage) ? 'active' : ''}
                            onClick={(e) => {
                                e.preventDefault();
                                goToHomePage();
                            }}
                        >
                            <img
                                src={
                                    isPaymentSummaryPage
                                        ? homeIconBlack
                                        : currentPath === '/'
                                        ? homeIconOrange
                                        : homeIconBlack
                                }
                                alt="Home"
                                className="nav-icon"
                            />
                            Home
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className={(currentPath === '/products' && !isPaymentSummaryPage) ? 'active' : ''}
                            onClick={(e) => {
                                e.preventDefault();
                                goToProductsPage();
                            }}
                        >
                            <img
                                src={
                                    isPaymentSummaryPage
                                        ? productsIconBlack
                                        : currentPath === '/products'
                                        ? productsIconOrange
                                        : productsIconBlack
                                }
                                alt="Products"
                                className="nav-icon"
                            />
                            Products
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
