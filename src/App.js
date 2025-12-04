import React from 'react';
import AppRoutes from './app/AppRoutes';
import NavBar from './components/NavBar';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <div className='App'>
      {/* CartProvider Engloba todas las pantallas lo que quiere decir que es una funcion Global */}

      <AuthProvider>
        <CartProvider>


          <NavBar />
          <AppRoutes />
        </CartProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
