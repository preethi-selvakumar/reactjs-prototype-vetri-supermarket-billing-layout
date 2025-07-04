import React from 'react';

import editIcon from '../assets/images/edit.png';
import deleteIcon from '../assets/images/delete.png';

const CustomerDetails = ({ customer, onCustomerChange, errors }) => {
    return (
        <div className="customer-details-card">
            <div className="customer-info-grid">
                <div className="customer-info-item">
                    <strong>CUSTOMER NAME:</strong>
                    <input
                        type="text"
                        name="name"
                        value={customer.name || ''} 
                        onChange={onCustomerChange}
                        className={errors.name ? 'error' : ''}
                        placeholder="Enter customer name"
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                </div>
                <div className="customer-info-item">
                    <strong>CONTACT NO:</strong>
                    <input
                        type="text"
                        name="contactNo"
                        value={customer.contactNo || ''} 
                        onChange={onCustomerChange}
                        className={errors.contactNo ? 'error' : ''}
                        placeholder="Enter contact number"
                    />
                    <img src={editIcon} alt="Edit Contact No" className="action-icon" />
                    {errors.contactNo && <span className="error-message">{errors.contactNo}</span>}
                </div>
                <div className="customer-info-item">
                    <strong>ADDRESS:</strong>
                    <input
                        type="text"
                        name="address"
                        value={customer.address || ''} 
                        onChange={onCustomerChange}
                        className={errors.address ? 'error' : ''}
                        placeholder="Enter address"
                    />
                    {errors.address && <span className="error-message">{errors.address}</span>}
                </div>
                <div className="customer-info-item">
                    <strong>DATE:</strong>
                    <input
                        type="text"
                        name="date"
                        value={customer.date || ''} 
                        onChange={onCustomerChange}
                        className={errors.date ? 'error' : ''}
                        placeholder="MM/DD/YYYY"
                    />
                    <img src={deleteIcon} alt="Delete Date" className="action-icon" />
                    {errors.date && <span className="error-message">{errors.date}</span>}
                </div>
            </div>
        </div>
    );
};

export default CustomerDetails;