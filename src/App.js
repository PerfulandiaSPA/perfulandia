import React from 'react';
import AppRoutes from './app/AppRoutes';
import NavBar from './components/NavBar';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <div className='App'>
      {/* CartProvider Engloba todas las pantallas lo que quiere decir que es una funcion Global */}
      <CartProvider>


        <NavBar />
        <AppRoutes />
      </CartProvider>
    </div>
  );
}

export default App;
