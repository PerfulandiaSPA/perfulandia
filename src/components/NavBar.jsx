import { Link } from 'react-router-dom';  // Usamos Link para la navegación
import { useCart } from '../context/CartContext';  // Usamos el hook useCart
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useState } from 'react';
import CartDrawer from './cart/CartDrawer';  // Corregir la importación aquí

function NavBar() {
  const { cart } = useCart();  // Usamos el contexto del carrito
  const cartItemCount = cart.length;  // Contamos los productos en el carrito
  const [isOpen, setIsOpen] = useState(false);  // Estado para controlar la apertura del carrito

  // Función para abrir y cerrar el carrito
  const toggleCartDrawer = () => setIsOpen(!isOpen);

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img src="/resources/images/P1.png" alt="Logo" style={{ width: '200px' }} />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">

              <Nav.Link as={Link} to="/login">Login</Nav.Link>


              {/* Botón del carrito */}
              <div className="cart-btn-container">
                <button className="cart-btn" onClick={toggleCartDrawer}>
                  <span className="cart-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M17 18a2 2 0 0 1 2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2c0-1.11.89-2 2-2M1 2h3.27l.94 2H20a1 1 0 0 1 1 1c0 .17-.05.34-.12.5l-3.58 6.47c-.34.61-1 1.03-1.75 1.03H8.1l-.9 1.63-.03.12a.25.25 0 0 0 .25.25H19v2H7a2 2 0 0 1-2-2c0-.35.09-.68.24-.96l1.36-2.45L3 4H1V2m6 16a2 2 0 0 1 2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2c0-1.11.89-2 2-2m9-7 2.78-5H6.14l2.36 5H16Z"></path>
                    </svg>
                  </span>
                  <span className="cart-count">{cartItemCount}</span>  {/* Muestra la cantidad de artículos */}
                </button>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Aquí pasamos el estado isOpen al CartDrawer para que se muestre u oculte */}
      <CartDrawer isOpen={isOpen} closeDrawer={toggleCartDrawer} />
    </>
  );
}

export default NavBar;
