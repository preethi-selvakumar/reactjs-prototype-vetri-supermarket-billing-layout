import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

// Child components
import CustomerDetails from './CustomerDetails.jsx';
import ProductSearch from './ProductSearch.jsx';
import ProductTable from './ProductTable.jsx';

const HomePage = () => {
    const {
        selectedProducts,
        goToProductsPage,
        removeProductFromSelection,
        saveCustomerDetails,
        customerDetails: savedCustomerDetails // Load from context
    } = useAppContext();

    const navigate = useNavigate();

    const [customerDetails, setCustomerDetails] = useState({
        name: "",
        contactNo: "",
        address: "",
        date: ""
    });

    const [customerErrors, setCustomerErrors] = useState({});
    const [searchTerm, setSearchTerm] = useState('');

    // Load saved customer details (when coming back from product page)
    useEffect(() => {
        if (savedCustomerDetails) {
            setCustomerDetails(savedCustomerDetails);
        }
    }, [savedCustomerDetails]);

    const handleCustomerChange = (e) => {
        const { name, value } = e.target;
        setCustomerDetails(prev => ({
            ...prev,
            [name]: value
        }));
        setCustomerErrors(prev => ({
            ...prev,
            [name]: ''
        }));
    };

    const validateCustomerDetails = () => {
        let errors = {};
        let isValid = true;

        if (!customerDetails.name.trim()) {
            errors.name = "Customer Name is required";
            isValid = false;
        }
        if (!customerDetails.contactNo.trim()) {
            errors.contactNo = "Contact Number is required";
            isValid = false;
        } else if (!/^\d{10}$/.test(customerDetails.contactNo)) {
            errors.contactNo = "Contact Number must be 10 digits";
            isValid = false;
        }
        if (!customerDetails.address.trim()) {
            errors.address = "Address is required";
            isValid = false;
        }
        if (!customerDetails.date.trim()) {
            errors.date = "Date is required";
            isValid = false;
        } else if (!/^\d{1,2}\/\d{1,2}\/\d{2,4}$/.test(customerDetails.date)) {
            errors.date = "Date must be MM/DD/YY or MM/DD/YYYY";
            isValid = false;
        }

        setCustomerErrors(errors);
        return isValid;
    };

    const handleNextClick = () => {
        const isCustomerValid = validateCustomerDetails();
        if (!isCustomerValid) {
            alert("Please enter valid customer details.");
            return;
        }

        if (selectedProducts.length === 0) {
            alert("Please add at least one product before proceeding.");
            return;
        }

        saveCustomerDetails(customerDetails);
        navigate('/payment-summary');
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleAddItemFromHome = () => {
        // Save customer details before leaving to Products page
        saveCustomerDetails(customerDetails);
        setSearchTerm('');
        goToProductsPage();
    };

    return (
        <div className="main-content">
            <h1 className="section-header">Customer Details</h1>
            <CustomerDetails
                customer={customerDetails}
                onCustomerChange={handleCustomerChange}
                errors={customerErrors}
                isEditing={true}
            />
            <ProductSearch
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
                onAddItem={handleAddItemFromHome}
            />
            <ProductTable
                products={selectedProducts}
                removeProductFromSelection={removeProductFromSelection}
            />
            <div className="next-button-container">
                <button className="next-button" onClick={handleNextClick}>Next</button>
            </div>
        </div>
    );
};

export default HomePage;
