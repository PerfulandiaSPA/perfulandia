// src/app/AppRoutes.js
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Perfumes from '../pages/Perfumes';
import PerfumeDetail from '../pages/PerfumeDetail';
import Cart from '../pages/Cart';
import CheckoutPage from '../pages/Checkout';


const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/perfumes" element={<Perfumes />} />
    <Route path="/perfumes/:id" element={<PerfumeDetail />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/checkout" element={<CheckoutPage />} />
    <Route path="*" element={<h2>404 - Página no encontrada</h2>} />
  </Routes>
);

export default AppRoutes;
