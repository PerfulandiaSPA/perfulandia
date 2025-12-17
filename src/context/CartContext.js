import { createContext, useContext, useState, useMemo } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    /*
     * Documentacion ADD TO CART
     */
    function addToCart(product) {
        setCart(prev => {
            // Aseguramos que qty sea un número
            const inc = Number(product.qty ?? 1);

            // CAMBIO IMPORTANTE: Usamos .idPerfume en lugar de .id
            const i = prev.findIndex(p => p.idPerfume === product.idPerfume);

            if (i === -1) {
                // Si no existe, lo agregamos
                return [...prev, { ...product, qty: inc }];
            }

            // Si ya existe, actualizamos la cantidad
            const copy = [...prev];
            copy[i] = { ...copy[i], qty: copy[i].qty + inc };
            return copy;
        });
    }

    // CAMBIO IMPORTANTE: Usamos idPerfume para filtrar
    const removeFromCart = (idPerfume) => {
        setCart(prev => prev.filter(p => p.idPerfume !== idPerfume));
    };

    // CAMBIO IMPORTANTE: Usamos idPerfume para encontrar y actualizar
    const updateQty = (idPerfume, qty) => {
        setCart(prev => prev.map(p =>
            p.idPerfume === idPerfume
                ? { ...p, qty: Math.max(1, Number(qty) || 1) }
                : p
        ));
    };

    const clearCart = () => setCart([]);

    const totals = useMemo(() => {
        const subtotal = cart.reduce((acc, p) => acc + (Number(p.price) * p.qty), 0);
        const shipping = subtotal > 0 ? 2990 : 0;
        const tax = Math.round(subtotal * 0.19);  // IVA 19%

        // OJO: Verifica si tus precios en BD ya incluyen IVA o no.
        // Si el precio en BD es neto: subtotal + shipping + tax
        // Si el precio en BD ya es final: subtotal + shipping (y el tax es solo informativo)
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