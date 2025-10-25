import { createContext, useContext, useState } from 'react';

// Creamos el contexto
const CartContext = createContext();

// El proveedor para manejar el estado global del carrito
export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    // Función para agregar productos al carrito
    const addToCart = (product) => {
        setCart((prevCart) => [...prevCart, product]);
    };

    // Función para eliminar productos del carrito
    const removeFromCart = (id) => {
        setCart((prevCart) => prevCart.filter(product => product.id !== id));
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
}

// Hook para acceder al carrito
export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
