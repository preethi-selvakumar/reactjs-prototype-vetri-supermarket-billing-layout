import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const [selectedProducts, setSelectedProducts] = useState(() => {
        const stored = localStorage.getItem('selectedProducts');
        return stored ? JSON.parse(stored) : [];
    });

    // Load customerDetails from localStorage
    const [customerDetails, setCustomerDetails] = useState(() => {
        const stored = localStorage.getItem('customerDetails');
        return stored ? JSON.parse(stored) : {
            name: '',
            contactNo: '',
            address: '',
            date: ''
        };
    });

    const [receivedAmount, setReceivedAmount] = useState(() => {
        const stored = localStorage.getItem('receivedAmount');
        return stored ? stored : '';
    });

    const navigate = useNavigate();

    // Persist selectedProducts to localStorage
    useEffect(() => {
        localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
    }, [selectedProducts]);

    // Persist customerDetails to localStorage
    useEffect(() => {
        localStorage.setItem('customerDetails', JSON.stringify(customerDetails));
    }, [customerDetails]);

    // Persist receivedAmount to localStorage
    useEffect(() => {
        localStorage.setItem('receivedAmount', receivedAmount);
    }, [receivedAmount]);

    // Sidebar toggle
    const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

    // Navigation
    const goToHomePage = () => {
        navigate('/');
        setIsSidebarOpen(false);
    };

    const goToProductsPage = () => {
        navigate('/products');
        setIsSidebarOpen(false);
    };

    // Add product to cart
    const addProductToSelection = (productToAdd) => {
        setSelectedProducts(prev => {
            const existingIndex = prev.findIndex(p => p.id === productToAdd.id);
            if (existingIndex > -1) {
                const updated = [...prev];
                updated[existingIndex] = {
                    ...updated[existingIndex],
                    quantity: productToAdd.quantity
                };
                return updated;
            }
            return [...prev, productToAdd];
        });
    };

    // Remove product from cart
    const removeProductFromSelection = (productId) => {
        setSelectedProducts(prev => prev.filter(p => p.id !== productId));
    };

    // Save customer details
    const saveCustomerDetails = (details) => {
        setCustomerDetails(details);
    };

    return (
        <AppContext.Provider
            value={{
                isSidebarOpen,
                toggleSidebar,

                // Navigation
                goToHomePage,
                goToProductsPage,

                // Product selection
                selectedProducts,
                addProductToSelection,
                removeProductFromSelection,

                // Customer
                customerDetails,
                saveCustomerDetails,

                // Received Amount
                receivedAmount,
                setReceivedAmount,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
