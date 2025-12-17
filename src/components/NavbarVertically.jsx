import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Offcanvas, Nav } from 'react-bootstrap';
// Si no tienes react-icons instalada, puedes usar SVGs normales o instalarla con: npm install react-icons
// import { FaChevronDown } from 'react-icons/fa'; 
import '../Navbarvertical.css';

export default function NavBarVertical() {
  const [show, setShow] = useState(false);
  const [subOpen, setSubOpen] = useState(false);
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const cat = params.get('cat') || 'all';

  const handleNavigate = (url) => {
    navigate(url);
    setShow(false);
  };

  return (
    <>
      {/* Botón flotante elegante */}
      <button className="menu-toggle-btn" onClick={() => setShow(true)}>
        <span className="burger-line"></span>
        <span className="burger-line"></span>
        <span className="burger-line"></span>
      </button>

      <Offcanvas show={show} onHide={() => setShow(false)} placement="start" className="custom-offcanvas">
        <Offcanvas.Header closeButton closeVariant="white">
          <Offcanvas.Title className="titulo-perfume-nav">PERFULANDIA</Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>
          <Nav className="flex-column nav-container">

            {/* ITEM PRINCIPAL CON SUBMENU */}
            <div
              className={`nav-item-group ${subOpen ? 'active' : ''}`}
              onMouseEnter={() => setSubOpen(true)}
              onMouseLeave={() => setSubOpen(false)}
            >
              <div className="nav-main-link">
                <Link
                  to="/perfumes?cat=all"
                  onClick={() => handleNavigate('/perfumes?cat=all')}
                  className="link-text"
                >
                  Perfumes
                </Link>
                {/* Flechita animada (SVG simple si no usas react-icons) */}
                <span className={`arrow-icon ${subOpen ? 'rotate' : ''}`}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>

              {/* CONTENEDOR DEL SUBMENU (Siempre renderizado, oculto por CSS) */}
              <div className={`submenu-wrapper ${subOpen ? 'open' : ''}`}>
                <div className="submenu-inner">
                  <Link
                    to="/perfumes?cat=Hombre"
                    className={`submenu-link ${cat === 'Hombre' ? 'active-link' : ''}`}
                    onClick={() => handleNavigate('/perfumes?cat=Hombre')}
                  >
                    Hombre
                  </Link>
                  <Link
                    to="/perfumes?cat=Mujer"
                    className={`submenu-link ${cat === 'Mujer' ? 'active-link' : ''}`}
                    onClick={() => handleNavigate('/perfumes?cat=Mujer')}
                  >
                    Mujer
                  </Link>
                </div>
              </div>
            </div>

            {/* AQUÍ PUEDES AGREGAR MÁS LINKS SIMPLES */}
            {/* <Link to="/contacto" className="simple-link">Contacto</Link> */}

          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}