import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';

import minusIcon from '../assets/images/minus-icon.png';
import plusIcon from '../assets/images/plus-icon.png';
import cartIcon from '../assets/images/Add to cart.png';

const allAvailableProducts = [
    { id: 1, name: 'Dairy Milk', rate: 100, tax: 20 },
    { id: 2, name: 'Millet Noodles', rate: 30, tax: 10 },
    { id: 3, name: 'Wheat Flour', rate: 100, tax: 20 },
    { id: 4, name: 'Maida', rate: 30, tax: 10 },
    { id: 5, name: 'Chili Powder', rate: 100, tax: 20 },
    { id: 6, name: 'Biryani Masala', rate: 30, tax: 10 },
];

const ProductsPage = () => {
    const {
        goToHomePage,
        addProductToSelection,
        removeProductFromSelection,
        selectedProducts
    } = useAppContext(); 

    const [products, setProducts] = useState(() => {
        return allAvailableProducts.map(product => {
            const selected = selectedProducts.find(p => p.id === product.id);
            return { ...product, quantity: selected ? selected.quantity : 0 };
        });
    });

    useEffect(() => {
        setProducts(prevProducts =>
            prevProducts.map(product => {
                const selected = selectedProducts.find(p => p.id === product.id);
                return { ...product, quantity: selected ? selected.quantity : 0 };
            })
        );
    }, [selectedProducts]);

    const handleQuantityChange = (id, delta) => {
        setProducts(prevProducts => {
            const updatedProducts = prevProducts.map(product => {
                if (product.id === id) {
                    const newQuantity = Math.max(0, product.quantity + delta);
                    const updatedProduct = { ...product, quantity: newQuantity };

                    if (newQuantity > 0) {
                        addProductToSelection(updatedProduct);
                    } else {
                        removeProductFromSelection(product.id);
                    }
                    return updatedProduct;
                }
                return product;
            });
            return updatedProducts;
        });
    };

    const calculateAmount = (quantity, rate, tax) => {
        if (quantity === 0) {
            return rate + tax;
        }
        return quantity * (rate + tax);
    };

    const handleAddToCart = (product) => {
        if (product.quantity > 0) {
            addProductToSelection(product);
            alert(`${product.name} added to cart.`);
        } else {
            const productToAdd = { ...product, quantity: 1 };
            addProductToSelection(productToAdd);
            alert(`${product.name} added to cart with quantity 1.`);
        }
    };

    return (
        <div className="products-page-wrapper">
            <h2 className="section-header">Products</h2>

            <div className="products-list-table">
                <div className="products-list-table-header">
                    <div>ITEM DETAILS</div>
                    <div>QUANTITY</div>
                    <div>RATE</div>
                    <div>TAX</div>
                    <div>AMOUNT</div>
                    <div></div>
                </div>

                {products.length === 0 ? (
                    <div className="no-items-message">No items available.</div>
                ) : (
                    products.map(product => (
                        <div className="products-list-table-row" key={product.id}>
                            <div className="item-name">{product.name}</div>
                            <div className="quantity-control">
                                <button onClick={() => handleQuantityChange(product.id, -1)}>
                                    <img src={minusIcon} alt="Decrease" />
                                </button>
                                <span>{product.quantity}</span>
                                <button onClick={() => handleQuantityChange(product.id, 1)}>
                                    <img src={plusIcon} alt="Increase" />
                                </button>
                            </div>
                            <div className="rate">{product.rate}</div>
                            <div className="tax">{product.tax}</div>
                            <div className="amount">
                                {calculateAmount(product.quantity, product.rate, product.tax)}
                            </div>
                            <div className="add-to-cart-icon">
                                <img
                                    src={cartIcon}
                                    alt="Add to Cart"
                                    onClick={() => handleAddToCart(product)}
                                    style={{ cursor: 'pointer' }}
                                />
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="next-button-container">
                <button className="next-button" onClick={goToHomePage}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default ProductsPage;
