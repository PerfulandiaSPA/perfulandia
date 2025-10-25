// src/app/AppRoutes.js
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Perfumes from '../pages/Perfumes';


const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/perfumes" element={<Perfumes />} />
  </Routes>
);

export default AppRoutes;
