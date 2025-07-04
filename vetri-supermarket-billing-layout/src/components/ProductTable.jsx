import React from 'react';
import { MdDelete } from 'react-icons/md'; 

const calculateAmount = (quantity, rate, tax) => {
    // If quantity is 0, display (rate + tax) as the default amount
    if (quantity === 0) {
        return rate + tax; // As per your requirement, even if quantity is 0, show base price
    }
    return quantity * (rate + tax);
};

const ProductTable = ({ products, removeProductFromSelection }) => {
    const handleDeleteClick = (productId, productName) => {
        removeProductFromSelection(productId);
        alert(`${productName} removed.`); // Product name will be shown here
    };

    return (
        <div className="products-list-table"> {/* Reusing ProductsPage's table styles */}
            <div className="products-list-table-header">
                <div>ITEM DETAILS</div>
                <div>QUANTITY</div>
                <div>RATE</div>
                <div>TAX</div>
                <div>AMOUNT</div>
                <div></div> {/* For delete icon */}
            </div>
            {products.length === 0 ? (
                <div className="no-items-message">No products added yet. Add items from the Products page.</div>
            ) : (
                products.map(product => (
                    <div className="products-list-table-row" key={product.id}>
                        <div className="item-name">{product.name}</div>
                        <div className="quantity-control">
                            {/* In HomePage, quantity control buttons are not interactive */}
                            {/* We just display the quantity */}
                            <span>{product.quantity}</span>
                        </div>
                        <div className="rate">{product.rate}</div>
                        <div className="tax">{product.tax}</div>
                        <div className="amount">{calculateAmount(product.quantity, product.rate, product.tax)}</div>
                        <div className="delete-icon-container"> {/* New div for the delete icon */}
                            <MdDelete
                                onClick={() => handleDeleteClick(product.id, product.name)}
                                style={{ cursor: 'pointer' }}
                            />
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default ProductTable;