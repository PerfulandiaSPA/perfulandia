import { useCart } from '../../context/CartContext';
import '../../Cart.css'; // Asegúrate de tener este CSS creado

function CartDrawer({ isOpen, closeDrawer }) {
  const { cart, removeFromCart } = useCart();

  return (
    <div
      className={`cart-drawer ${isOpen ? 'open' : ''}`}
      aria-hidden={!isOpen}
    >
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
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M17 18a2 2 0 0 1 2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2c0-1.11.89-2 2-2M1 2h3.27l.94 2H20a1 1 0 0 1 1 1c0 .17-.05.34-.12.5l-3.58 6.47c-.34.61-1 1.03-1.75 1.03H8.1l-.9 1.63-.03.12a.25.25 0 0 0 .25.25H19v2H7a2 2 0 0 1-2-2c0-.35.09-.68.24-.96l1.36-2.45L3 4H1V2m6 16a2 2 0 0 1 2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2c0-1.11.89-2 2-2m9-7 2.78-5H6.14l2.36 5H16Z"
              ></path>
            </svg>
            <p>Su carrito está vacío</p>
          </div>
        ) : (
          <div>
            {cart.map((product, index) => (
              <div key={index} className="cart-item">
                <img src={product.imageUrl} alt={product.name} width="50" />
                <p>{product.name}</p>
                <p>{product.price} CLP</p>
                <button onClick={() => removeFromCart(product.id)}>
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Subtotal */}
      <div className="cart-drawer__subtotal">
        <p>
          Subtotal:{' '}
          {cart.reduce((total, product) => total + product.price, 0)} CLP
        </p>
        <button className="checkout-btn">Ir a pagar</button>
      </div>
    </div>
  );
}

export default CartDrawer;

