import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useState } from 'react';
import CartDrawer from './cart/CartDrawer';
import NavbarVertically from './NavbarVertically'; // 👈 nombre corregido
import '../Navbar.css';

function NavBar() {
  const { cart } = useCart();
  const cartItemCount = cart.length;
  const [isOpen, setIsOpen] = useState(false);

  const toggleCartDrawer = () => setIsOpen(!isOpen);

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary main-navbar">
        <Container fluid className="d-flex align-items-center justify-content-between">
          
          {/* 🔹 IZQUIERDA: Hamburguesa + Logo */}
          <div className="d-flex align-items-center gap-3">
            <NavbarVertically /> {/* botón hamburguesa */}
            <Navbar.Brand as={Link} to="/">
              <img
                src="/resources/images/P1.png"
                alt="Logo"
                style={{ width: '200px', height: 'auto' }}
              />
            </Navbar.Brand>
          </div>

          {/* 🔹 DERECHA: Login + Carrito */}
          <div className="d-flex align-items-center gap-4 me-4">
            <Nav.Link as={Link} to="/login" className="fs-5 fw-semibold">
              Login
            </Nav.Link>

            <div className="cart-btn-container position-relative">
              <button className="cart-btn" onClick={toggleCartDrawer}>
                <span className="cart-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M17 18a2 2 0 0 1 2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2c0-1.11.89-2 2-2M1 2h3.27l.94 2H20a1 1 0 0 1 1 1c0 .17-.05.34-.12.5l-3.58 6.47c-.34.61-1 1.03-1.75 1.03H8.1l-.9 1.63-.03.12a.25.25 0 0 0 .25.25H19v2H7a2 2 0 0 1-2-2c0-.35.09-.68.24-.96l1.36-2.45L3 4H1V2m6 16a2 2 0 0 1 2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2c0-1.11.89-2 2-2m9-7 2.78-5H6.14l2.36 5H16Z"
                    />
                  </svg>
                </span>
                <span className="cart-count">{cartItemCount}</span>
              </button>
            </div>
          </div>
        </Container>
      </Navbar>

      {/* Drawer del carrito */}
      <CartDrawer isOpen={isOpen} closeDrawer={toggleCartDrawer} />
    </>
  );
}

export default NavBar;
