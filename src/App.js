import React from 'react';
import AppRoutes from './app/AppRoutes';
import NavBar from './components/NavBar';
import NavbarVertically from './components/NavbarVertically';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <div className='App'>
      {/* AppProvider Engloba todas las pantallas lo que quiere decir que es una funcion Global */}
      <CartProvider>

        <NavbarVertically />
        <NavBar />
        <AppRoutes />
      </CartProvider>
    </div>
  );
}

export default App;
