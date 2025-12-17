import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from 'react-bootstrap';
import CartDrawer from './cart/CartDrawer';
import NavbarVertically from './NavbarVertically';
import '../Navbar.css';

function NavBar() {
  const { cart } = useCart();
  const { isAuthenticated, isAdmin } = useAuth();

  // Calcular cantidad total
  const cartItemCount = cart.reduce((total, product) => total + product.qty, 0);

  const [isOpen, setIsOpen] = useState(false);
  const toggleCartDrawer = () => setIsOpen(!isOpen);

  return (
    <>
      {/* sticky="top" hace que la barra se quede fija al hacer scroll */}
      <Navbar expand="lg" sticky="top" className="main-navbar">
        <Container fluid className="px-4 d-flex align-items-center justify-content-between">

          {/* 🔹 IZQUIERDA: Hamburguesa + Logo */}
          <div className="d-flex align-items-center gap-3">
            {/* El botón hamburguesa del otro componente */}
            <NavbarVertically />

            <Navbar.Brand as={Link} to="/" className="p-0 m-0">
              <img
                src="/resources/images/P1.png"
                alt="Perfulandia Logo"
                className="navbar-logo"
                style={{ width: '180px', height: 'auto' }} // Ajusté un poco el tamaño para que sea más sutil
              />
            </Navbar.Brand>
          </div>

          {/* 🔹 DERECHA: Login + Admin + Carrito */}
          <div className="d-flex align-items-center">

            {/* Lógica de Autenticación */}
            {isAuthenticated ? (
              <Nav.Link as={Link} to="/profile" className="nav-link-custom">
                Mi Cuenta
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/login" className="nav-link-custom">
                Iniciar Sesión
              </Nav.Link>
            )}

            {/* Botón Admin */}
            {isAdmin && (
              <Button
                as={Link}
                to="/admin/perfumes"
                className="btn-admin"
              >
                Panel Admin
              </Button>
            )}

            {/* Botón Carrito */}
            <div className="cart-btn-container ms-2">
              <button
                className="cart-btn"
                onClick={toggleCartDrawer}
                aria-label="Ver carrito"
              >
                <span className="cart-icon-wrapper">
                  {/* SVG más limpio */}
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                  </svg>
                </span>

                {/* Solo mostramos el contador si hay items */}
                {cartItemCount > 0 && (
                  <span className="cart-count animate__animated animate__bounceIn">
                    {cartItemCount}
                  </span>
                )}
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