import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import OrderImage from '../assets/images/completed.png';

const OrderSuccess = () => {
    const { state } = useLocation();
    const { billNo } = state || {};

    const { customerDetails, selectedProducts } = useAppContext();
    const { name, contactNo } = customerDetails || {};

    const today = new Date();
    const date = today.toISOString().split('T')[0];

    const navigate = useNavigate();

    const handleDownloadInvoice = () => {
        navigate('/invoice', {
            state: {
                billNo,
                date,
                customerDetails,
                selectedProducts
            }
        });
    };

    return (
        <div className="order-success-container">
            <img src={OrderImage} alt="Order Completed" className="order-success-image" />
            <h2 className="order-success-heading">Your Order Completed</h2>
            <p className="order-success-subtext">Thank you. Your order has been received</p>

            <div className="order-success-details">
                <div>
                    <strong>Order ID</strong><br />{billNo}
                </div>
                <div>
                    <strong>Name</strong><br />{name}
                </div>
                <div>
                    <strong>Phone Number</strong><br />{contactNo}
                </div>
                <div>
                    <button className="order-success-button" onClick={handleDownloadInvoice}>
                        Download Invoice
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;
