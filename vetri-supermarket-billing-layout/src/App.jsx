import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import HomePage from './components/HomePage';
import ProductsPage from './components/ProductsPage';
import PaymentSummary from './components/PaymentSummary';
import OrderSuccess from './components/OrderSuccess';
import Invoice from './components/Invoice'; 
import ThankYou from './components/ThankYou';

const App = () => {
  return (
    <Routes>
      {/* Routes with Sidebar */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/payment-summary" element={<PaymentSummary />} />
      </Route>

      {/* Route without Sidebar */}
      <Route path="/order-success" element={<OrderSuccess />} />
      <Route path="/invoice" element={<Invoice />} />
      <Route path="/thankyou" element={<ThankYou />} />
    </Routes>
  );
};

export default App;
