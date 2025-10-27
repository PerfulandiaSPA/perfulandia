import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Navbar, Container, Offcanvas, Nav } from 'react-bootstrap';
import '../Navbarvertical.css';
import '../Navbar.css';

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
        <Navbar expand={false} className="bg-body-tertiary mb-3">
            <Container fluid>
                <Navbar.Toggle onClick={() => setShow(true)} />
                <Navbar.Offcanvas
                    show={show}
                    onHide={() => setShow(false)}
                    placement="start"  // 👈 se abre desde la izquierda
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title className="titulo-perfume">Perfulandia</Offcanvas.Title>

                    </Offcanvas.Header>

                    <Offcanvas.Body>
                        <Nav className="flex-column gap-2">




                            {/* --- PERFUMES con submenu --- */}
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
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
}
