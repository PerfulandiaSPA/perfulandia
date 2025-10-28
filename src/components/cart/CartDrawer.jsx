import { useCart } from '../../context/CartContext';
import '../../Cart.css'; // Asegúrate de tener este CSS creado
import { useNavigate } from 'react-router-dom';



function CartDrawer({ isOpen, closeDrawer }) {

  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();


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
        <p>Subtotal: {cart.reduce((total, product) => total + product.price, 0)} CLP</p>
        <button
          className="btn btn-dark w-100 mt-3"
          onClick={() => {

            navigate('/cart');    // Redirige a la pantalla CartPage
          }}
        >
          Ir a pagar
        </button>

      </div>
    </div>
  );
}

export default CartDrawer;

