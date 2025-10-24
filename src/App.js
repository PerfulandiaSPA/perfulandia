import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppRoutes from './app/AppRoutes'; // ✅ ruta corregida
import Home from './pages/Home'; 
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <AppRoutes /> {/* Si AppRoutes incluye tu Navbar y tus rutas */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
