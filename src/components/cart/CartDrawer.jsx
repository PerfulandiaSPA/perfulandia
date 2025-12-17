import { useCart } from '../../context/CartContext';
import '../../Cart.css';
import { useNavigate } from 'react-router-dom';

function CartDrawer({ isOpen, closeDrawer }) {
  const { cart, removeFromCart, updateQty, totals } = useCart(); // 👈 sumé updateQty y totals
  const navigate = useNavigate();

  return (
    <div className={`cart-drawer ${isOpen ? 'open' : ''}`} aria-hidden={!isOpen}>
      <header className="cart-drawer__header">
        <h2>Su carrito</h2>
        <button onClick={closeDrawer} className="drawer__close-btn">
          <span className="">X</span>
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path d="M5 19 19 5M5 5l14 14"></path>
          </svg>
        </button>
      </header>

      {/* Contenido del carrito */}
      <div className="cart-drawer__content">
        {cart.length === 0 ? (
          <div className="cart-empty">
            <p>Su carrito está vacío</p>
          </div>
        ) : (
          <div>
            {cart.map((product) => (
              <div key={product.idPerfume} className="cart-item">
                <img src={product.image} alt={product.productName} width="50" />
                <div className="cart-item__info">
                  <p className="cart-item__name">{product.productName}</p>
                  <p className="cart-item__price">{product.price} CLP</p>

                  {/* Contador de cantidad */}
                  <div className="cart-item__qty">
                    <button
                      type="button"
                      className="qty-btn"
                      onClick={() => updateQty(product.idPerfume, product.qty - 1)}
                    >
                      −
                    </button>

                    <input
                      className="counter"
                      type="number"
                      min="1"
                      value={product.qty}
                      onChange={(e) => updateQty(product.idPerfume, e.target.value)}
                    />

                    <button
                      type="button"
                      className="qty-btn"
                      onClick={() => updateQty(product.idPerfume, product.qty + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <button className="cart-item__remove" onClick={() => removeFromCart(product.idPerfume)}>
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Subtotal + ir a pagar */}
      <div className="cart-drawer__subtotal">
        <p>Subtotal: {totals.subtotal.toLocaleString('es-CL')} CLP</p>
        <p className="text-muted small">Envío: {totals.shipping.toLocaleString('es-CL')} CLP</p>
        <p className="text-muted small">IVA: {totals.tax.toLocaleString('es-CL')} CLP</p>
        <p className="fw-bold">Total: {totals.total.toLocaleString('es-CL')} CLP</p>
        <button
          className="btn btn-dark w-100 mt-3"
          onClick={() => {
            closeDrawer?.();
            navigate('/cart');
          }}
          disabled={cart.length === 0}
        >
          Ir a pagar
        </button>
      </div>
    </div>
  );
}

export default CartDrawer;
