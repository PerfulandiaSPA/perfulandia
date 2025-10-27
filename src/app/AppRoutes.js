// src/app/AppRoutes.js
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Perfumes from '../pages/Perfumes';
import PerfumeDetail from '../pages/PerfumeDetail';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/perfumes" element={<Perfumes />} />
    <Route path="/perfumes/:id" element={<PerfumeDetail />} />
  </Routes>
);

export default AppRoutes;
