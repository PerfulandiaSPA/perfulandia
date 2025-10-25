import { Link } from 'react-router-dom';  // Usamos Link para la navegación
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>  {/* Usamos Link para el logo */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>  {/* Usamos Link para los enlaces */}
            <Nav.Link as={Link} to="/login">Login</Nav.Link>  {/* Enlace para login */}
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">

              <NavDropdown.Item as={Link} to="/action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
