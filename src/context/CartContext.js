// src/context/CartContext.js
import { createContext, useContext, useState, useMemo } from 'react';

const CartContext = createContext();


export function CartProvider({ children }) {
    const [cart, setCart] = useState([]); // [{id, name, price, imageUrl, qty}]

    const addToCart = (product) => {
        setCart(prev => {
            const i = prev.findIndex(p => p.id === product.id);
            if (i === -1) return [...prev, { ...product, qty: 1 }];
            const copy = [...prev];
            copy[i] = { ...copy[i], qty: copy[i].qty + 1 };
            return copy;
        });
    };

    const removeFromCart = (id) => setCart(prev => prev.filter(p => p.id !== id));

    const updateQty = (id, qty) => {
        setCart(prev => prev.map(p => p.id === id ? { ...p, qty: Math.max(1, Number(qty) || 1) } : p));
    };

    const clearCart = () => setCart([]);

    const totals = useMemo(() => {
        const subtotal = cart.reduce((acc, p) => acc + p.price * p.qty, 0);
        const shipping = subtotal > 0 ? 2990 : 0;     // ejemplo
        const tax = Math.round(subtotal * 0.19);      // IVA 19% (ejemplo)
        const total = subtotal + shipping + tax;
        const items = cart.reduce((acc, p) => acc + p.qty, 0);
        return { items, subtotal, shipping, tax, total };
    }, [cart]);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, clearCart, totals }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error('useCart must be used within a CartProvider');
    return ctx;
}
