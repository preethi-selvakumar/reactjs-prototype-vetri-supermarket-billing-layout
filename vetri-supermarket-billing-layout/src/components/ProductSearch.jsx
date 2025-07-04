// src/components/ProductSearch.jsx
import React from 'react';

import searchIcon from '../assets/images/search.png';
import barcodeIcon from '../assets/images/bar code.png';
import micIcon from '../assets/images/mic.png';
import addIcon from '../assets/images/add-icon.png';

const ProductSearch = ({ searchTerm, onSearchChange, onAddItem }) => {
    const handleKeyDown = (e) => {
        console.log('Key Down:', e.key); 
        if (e.key === 'Enter') {
            console.log('Enter key down. Attempting to call onAddItem.');
            onAddItem();
            e.preventDefault(); 
        }
    };

    return (
        <div className="search-controls-container">
            <div className="product-search-bar">
                <img src={searchIcon} alt="Search" className="search-img" />
                <input
                    type="text"
                    placeholder="Search"
                    className="search-input"
                    value={searchTerm}
                    onChange={onSearchChange}
                    onKeyDown={handleKeyDown} 
                />
                <img src={barcodeIcon} alt="Barcode Scan" className="search-img" />
                <img src={micIcon} alt="Voice Search" className="search-img" />
            </div>
            <button className="add-item-button" onClick={onAddItem}>
                <img src={addIcon} alt="Add" className="btn-icon" /> Add Item
            </button>
        </div>
    );
};

export default ProductSearch;