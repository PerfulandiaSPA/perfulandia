import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Offcanvas, Nav } from 'react-bootstrap';
import '../Navbarvertical.css';

export default function NavBarVertical() {
  const [show, setShow] = useState(false);
  const [subOpen, setSubOpen] = useState(false);
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const cat = params.get('cat') || 'all';

  const handleNavigate = (url) => {
    navigate(url);
    setShow(false); // cierra el panel
  };

  return (
    <div className="navbar-vertical">
      {/* Botón hamburguesa simple */}
      <button className="menu-toggle" onClick={() => setShow(true)}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path
            d="M3 6h18M3 12h18M3 18h18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* Menú lateral (Offcanvas) */}
      <Offcanvas show={show} onHide={() => setShow(false)} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="titulo-perfume">PERFULANDIA</Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>
          <Nav className="flex-column gap-2">
            {/* PERFUMES con submenu */}
            <div
              className="submenu-container"
              onMouseEnter={() => setSubOpen(true)}
              onMouseLeave={() => setSubOpen(false)}
            >
              <Nav.Link
                as={Link}
                to="/perfumes?cat=all"
                onClick={() => handleNavigate('/perfumes?cat=all')}
                className="submenu-title"
              >
                Perfumes
              </Nav.Link>

              {subOpen && (
                <div className="submenu-items">
                  <Nav.Link
                    as={Link}
                    to="/perfumes?cat=Hombre"
                    active={cat === 'Hombre'}
                    onClick={() => handleNavigate('/perfumes?cat=Hombre')}
                  >
                    Hombre
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/perfumes?cat=Mujer"
                    active={cat === 'Mujer'}
                    onClick={() => handleNavigate('/perfumes?cat=Mujer')}
                  >
                    Mujer
                  </Nav.Link>
                </div>
              )}
            </div>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}
