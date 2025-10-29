// CartDrawer.jsx
import { useCart } from '../../context/CartContext';
import '../../Cart.css';
import { useNavigate } from 'react-router-dom';

function CartDrawer({ isOpen, closeDrawer }) {
  const { cart, removeFromCart, updateQty } = useCart();
  const navigate = useNavigate();

  const subtotal = cart.reduce(
    (acc, p) => acc + p.price * (p.qty ?? 1),
    0
  );

  return (
    <div className={`cart-drawer ${isOpen ? 'open' : ''}`} aria-hidden={!isOpen}>
      <header className="cart-drawer__header">
        <h2>Su carrito</h2>
        <button onClick={closeDrawer} className="drawer__close-btn" aria-label="Cerrar">
          <span>X</span>
          <svg width="24" height="24" viewBox="0 0 24 24"><path d="M5 19 19 5M5 5l14 14"></path></svg>
        </button>
      </header>

      <div className="cart-drawer__content">
        {cart.length === 0 ? (
          <div className="cart-empty">
            <p>Su carrito está vacío</p>
          </div>
        ) : (
          <div>
            {cart.map((product) => {
              const qty = product.qty ?? 1;
              return (
                <div key={product.id} className="cart-item">
                  <img src={product.imageUrl} alt={product.name} width="50" height="50" />
                  <div className="cart-item__info">
                    <p className="cart-item__name">{product.name}</p>
                    <p className="cart-item__unit">$
                      {product.price.toLocaleString()} c/u
                    </p>

                    <div className="cart-item__qty-controls">
                      <button
                        type="button"
                        className="qty-btn"
                        onClick={() => updateQty(product.id, Math.max(1, qty - 1))}
                        aria-label="Disminuir cantidad"
                      >
                        −
                      </button>
                      <span className="qty-value">{qty}</span>
                      <button
                        type="button"
                        className="qty-btn"
                        onClick={() => updateQty(product.id, qty + 1)}
                        aria-label="Aumentar cantidad"
                      >
                        +
                      </button>
                    </div>

                    <p className="cart-item__line-total">
                      Total: ${ (product.price * qty).toLocaleString() }
                    </p>
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(product.id)}
                  >
                    Eliminar
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="cart-drawer__subtotal">
        <p>
          Subtotal: <strong>${subtotal.toLocaleString()}</strong>
        </p>
        <button
          className="btn btn-dark w-100 mt-3"
          onClick={() => {
            closeDrawer?.();
            navigate('/cart');
          }}
        >
          Ir a pagar
        </button>
      </div>
    </div>
  );
}

export default CartDrawer;


