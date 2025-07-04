import React from 'react';
import { useNavigate } from 'react-router-dom';
import thankyouImage from '../assets/images/thank you.png';
import { useAppContext } from '../context/AppContext';

const ThankYou = () => {
    const navigate = useNavigate();
    const {
        selectedProducts,
        removeProductFromSelection,
        setReceivedAmount,
        saveCustomerDetails,
    } = useAppContext();

    const handleContinue = () => {
        // Remove each product from context
        selectedProducts.forEach(product => {
            removeProductFromSelection(product.id);
        });

        // Clear amount and customer info from context
        setReceivedAmount('');
        saveCustomerDetails({
            name: '',
            contactNo: '',
            address: '',
            date: '',
        });

        // Clear all localStorage data
        localStorage.removeItem('selectedProducts');
        localStorage.removeItem('receivedAmount');
        localStorage.removeItem('customerDetails');

        // Redirect to home
        navigate('/');
    };

    return (
        <div className="thankyou-wrapper">
            <img src={thankyouImage} alt="Thank you" className="thankyou-image" />
            <h2 className="thankyou-message">Thank You For Shopping!!!</h2>
            <button className="thankyou-button" onClick={handleContinue}>
                Continue to Shopping
            </button>
        </div>
    );
};

export default ThankYou;
